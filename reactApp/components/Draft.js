// packages
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  DefaultDraftBlockRenderMap,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import io from 'socket.io-client';
// import {
//   SocketProvider,
//   socketConnect,
// } from 'socket.io-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';
import { Map } from 'immutable';


// css styles
import styles from '../assets/styles'
import colorStyleMap from '../assets/colors'

// imported components
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import ColorControls from './ColorControls';

// dispatch actions
import {
  typing,
  logout,
  refresh,
} from '../actions/index';


// class component
class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      name: '',
      collaborators: [],
      owner: '',
      ts: '',
      id: '',
      shareOpen: false,
    }
    const blockRenderMap = Map({
      'right': {
        element: 'div'
      },
      'center': {
        element: 'div'
      },
      'left': {
        element: 'div'
      }
    });
    this.extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
    this.socket = io.connect(SOCKET_URL)

    this.socket.on('updateEditorState', (data) => {
      console.log('client side on update editorState: ', data);
      let contentState = JSON.parse(data.contentState);
      contentState = convertFromRaw(contentState);
      this.setState({
        editorState: EditorState.push(this.state.editorState, contentState),
      })
    })

    this.socket.on('updateName', (data) => {
      console.log('client side on update name: ', data);
      this.setState({name: data.name})
    })
  }

  onChange(editorState) {
    this.setState({
      editorState,
    })
    let stringifiedContentState = this.createStringifiedContentStateFromEditorState(this.state.editorState)
    this.socket.emit('changeEditorState', {
      contentState: stringifiedContentState,
      docId: this.state.id,
    })
  }

  async componentWillMount() {
    let id = this.props.match.params.id;
    try {
      let doc = await axios.get(SERVER_URL + '/document/get/' + id)
      let editorState = this.createEditorStateFromStringifiedContentState(doc.data.document.contentState);

      this.setState({
        editorState,
        name: doc.data.document.name,
        collaborators: doc.data.document.collaborators,
        owner: doc.data.document.owner,
        ts: doc.data.document.ts,
        id: doc.data.document._id,
        shareOpen: false,
      })

      this.socket.emit('documentJoin', this.state.id)
    }
    catch(e) {
      console.log(e);
    }
  }

  createEditorStateFromStringifiedContentState(stringifiedContentState) {
    let contentState = JSON.parse(stringifiedContentState);
    contentState = convertFromRaw(contentState);
    let editorState = EditorState.createWithContent(contentState)
    return editorState
  }

  createStringifiedContentStateFromEditorState(editorState) {
    let contentState = editorState.getCurrentContent();
    contentState = convertToRaw(contentState);
    let stringifiedContentState = JSON.stringify(contentState)
    return stringifiedContentState
  }

  componentWillUnmount() {
    this.socket.emit('documentLeave', this.state.id)
  }

  handleOpen() {
    this.setState({shareOpen: true});
  };

  handleClose() {
    this.setState({shareOpen: false});
  };

  async onClickLogout() {
    try {
      let logout = await axios.get(SERVER_URL + '/logout')
      this.props.onLogout();
    }
    catch(e) {
      console.log(e);
    }
  }

  async onClickSave() {
    try {
      let stringifiedContentState = this.createStringifiedContentStateFromEditorState(this.state.editorState);
      let resp = await axios.post(SERVER_URL + '/document/save/' + this.props.match.params.id, {
        contentState: stringifiedContentState,
        name: this.state.name,
      })
      resp.data.success ? console.log('saved') : console.log('not saved')
    }
    catch(e) {
      console.log(e);
    }

  }

  async onBackToDocs() {
    let newUserInfo = await axios.get(SERVER_URL + '/document/list', {
      withCredentials: true,
    })
    this.props.onRefresh(newUserInfo.data.user)
  }

  focus() {
    this.editor.focus();
  }

  _onTab(e) {
    e.preventDefault;
    const maxDepth = 4;
    this.onChange(
      RichUtils.onTab(
        this.state.editorState,
        maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
    .reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color)
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.onChange(nextEditorState);
  }

  // _handleKeyCommand(command, editorState) {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //     this.onChange(newState);
  //     return true;
  //   }
  //   return false;
  // }

  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    switch (type) {
      case 'right':
          return 'right';
      case 'center':
          return 'center';
      case 'left':
          return 'left';
    }
  }

  setName(e) {
    e.preventDefault();
    this.setState({name: e.target.value})
    this.socket.emit('changeName', {
      docId: this.state.id,
      name: this.state.name,
    })
  }

  render() {
    return (
      <Paper
        className={'RichEditor-root'}
        style={styles.draftBody}
        zDepth={2}
        >
        <Dialog
          title="Share this ID to share this Doc"
          actions={
            <RaisedButton
              label="Close"
              primary={true}
              onClick={() => this.handleClose()}
            />
          }
          modal={false}
          open={this.state.shareOpen}
          onRequestClose={() => this.handleClose()}
        >
          {this.state.id}
        </Dialog>
        <TextField
          id={'this-makes-a-warning-shut-up'}
          style={styles.draftHeader}
          value={this.state.name}
          onChange={(e) => this.setName(e)}
        />
        <br />
        <div style={styles.draftButtonContainer}>
          <RaisedButton
            primary={true}
            onClick={() => this.handleOpen()}
            label={'Share'}
            style={styles.draftButton}
          />
          <div style={styles.draftSpacer}></div>
          <RaisedButton
            primary={true}
            onClick={() => this.onClickSave()}
            label={'Save'}
            style={styles.draftButton}
          />
          <div style={styles.draftSpacer}></div>
          <Link
            to='/'
            style={styles.draftButton}
            >
            <RaisedButton
              primary={true}
              fullWidth={true}
              onClick={() => this.onBackToDocs()}
              label={'Back to Docs'}
            />
          </Link>
        </div>
        <br />
        <div style={styles.controlContainer}>
          <BlockStyleControls
            editorState={this.state.editorState}
            onToggle={(style) => this._toggleBlockType(style)}
          />
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={(style) => this._toggleInlineStyle(style)}
          />
          <ColorControls
            editorState={this.state.editorState}
            onToggle={(style) => this._toggleColor(style)}
          />
        </div>
        <br />
        <Paper
          style={styles.editor}
          zDepth={1}
          onClick={() => this.focus()}
          >
          <Editor
            editorState={this.state.editorState}
            customStyleMap={colorStyleMap}
            blockStyleFn={this.myBlockStyleFn}
            blockRenderMap={this.extendedBlockRenderMap}
            onChange={(state) => this.onChange(state)}
            onTab={(e) => this._onTab(e)}
            // handleKeyCommand={() => this._handleKeyCommand()}
            ref={(ref) => this.editor = ref}
          />
        </Paper>
        <br />
        <br />
        <div style={styles.logoutContainer}>
          <div style={styles.logoutSpacer}></div>
            <Link to='/'>
              <RaisedButton
                style={styles.logoutBtn}
                primary={true}
                onClick={() => this.onClickLogout()}
                label={'Logout'}
              />
            </Link>
        </div>
      </Paper>
      );
    }
  };

  const mapStateToProps = (state) => {
    return {
      userInfo: state.userInfo,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      onLogout: () => dispatch(logout()),
      onRefresh: (user) => dispatch(refresh(user)),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Draft);
