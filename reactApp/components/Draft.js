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
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';
import { Map } from 'immutable';

// css styles
import styles from '../assets/styles'
import customStyleMap from '../assets/customStyleMap'

// imported components
import StyleToolbar from './StyleToolbar';
import Cursor from './Cursor';

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
      otherUsers: {},
      color: '',
    }

    this.extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(new Map({
        'right': {
          element: 'div'
        },
        'center': {
          element: 'div'
        },
        'left': {
          element: 'div'
        }
      })
    );

    this.socket = io.connect(SOCKET_URL)

    this.socket.on('updateEditorState', (data) => {
      // gets new regular editor state
      let contentState = JSON.parse(data.contentState);
      contentState = convertFromRaw(contentState);
      let editorState = EditorState.push(this.state.editorState, contentState);

      // gets selections states
      let currentSelectionState = editorState.getSelection();
      let otherSelectionState = currentSelectionState.merge(data.selectionState);

      // force other selection state
      editorState = EditorState.forceSelection(editorState, otherSelectionState);
      this.setState({editorState,})

      let startKey = otherSelectionState.getStartKey();
      let endKey = otherSelectionState.getEndKey();
      let startOffset = otherSelectionState.getStartOffset();
      let endOffset = otherSelectionState.getEndOffset();

      const windowSelectionState = window.getSelection();
      if (windowSelectionState.rangeCount > 0) {
        const range = windowSelectionState.getRangeAt(0);
        const clientRects = range.getClientRects();
        const rects = clientRects[0];
        let cursorLocation = {
          top: rects.top,
          left: rects.left,
          height: rects.height,
        }
        let highlights = [];
        for (var i = 0; i < clientRects.length; i++) {
          let highlightLocation = {
            top: clientRects[i].top,
            bottom: clientRects[i].bottom,
            right: clientRects[i].right,
            left: clientRects[i].left,
            height: clientRects[i].height,
            width: clientRects[i].width,
          }
          highlights.push(highlightLocation)
        }
        let tempOtherUsers = JSON.parse(JSON.stringify(this.state.otherUsers))
        tempOtherUsers[data.color] = {
          username: data.username,
          color: data.color,
          cursorLocation,
          highlights,
        }
        this.setState({otherUsers: tempOtherUsers,})
      }

      editorState = EditorState.forceSelection(editorState, currentSelectionState);

      this.setState({
        editorState
      })

    })

    this.socket.on('updateName', (data) => {
      this.setState({name: data.name})
    })

    this.socket.on('userLeave', (data) => {
      let tempOtherUsers = JSON.parse(JSON.stringify(this.state.otherUsers))
      delete tempOtherUsers[data.color];
      this.setState({otherUsers: tempOtherUsers,})
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
        color: '#'+Math.floor(Math.random()*16777215).toString(16),
      })

      this.socket.emit('documentJoin', {
        docId: this.state.id,
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this.socket.emit('documentLeave', {
      docId: this.state.id,
      color: this.state.color,
    })
  }

  onChange(editorState) {
    this.setState({
      editorState,
    })

    let stringifiedContentState = this.createStringifiedContentStateFromEditorState(editorState)

    this.socket.emit('changeEditorState', {
      docId: this.state.id,
      contentState: stringifiedContentState,
      selectionState: editorState.getSelection(),
      color: this.state.color,
      username: 'bob',
      // username: this.props.userInfo.user.username,
    })
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

  _onTab(e) {
    e.preventDefault();
    const maxDepth = 4;
    this.onChange(
      RichUtils.onTab(
        e,
        this.state.editorState,
        maxDepth
      )
    );
  }

  _toggleBlockType(e, blockType) {
    if (e) e.preventDefault();
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  }

  _toggleInlineStyle(e, inlineStyle) {
    if (e) e.preventDefault();
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

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
      name: e.target.value,
    })
  }

  render() {
    return (
      <div
        style={styles.draftBody}
        >
        <Dialog
          title="Share this ID to share this Doc"
          actions={
            <RaisedButton
              label="Close"
              primary={true}
              onClick={() => this.setState({shareOpen: false})}
            />
          }
          modal={false}
          open={this.state.shareOpen}
          onRequestClose={() => this.setState({shareOpen: false})}
        >
          {this.state.id}
        </Dialog>
        <TextField
          id={'header'}
          style={styles.draftHeader}
          value={this.state.name}
          onChange={(e) => this.setName(e)}
        />
        <br />
        <div style={styles.draftButtonContainer}>
          <RaisedButton
            primary={true}
            onClick={() => this.setState({shareOpen: true})}
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
        <StyleToolbar
          editorState={this.state.editorState}
          onToggleBlockType={(e, style) => this._toggleBlockType(e, style)}
          onToggleInlineStyle={(e, style) => this._toggleInlineStyle(e, style)}
        />
        <br />
        <Paper
          style={styles.editor}
          zDepth={1}
          rounded={false}
          onClick={() => this.editor.focus()}
          >
          {Object.keys(this.state.otherUsers).map(user =>
            <Cursor
              key={user}
              user={this.state.otherUsers[user]}
            />
          )}
          <Editor
            editorState={this.state.editorState}
            customStyleMap={customStyleMap}
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
      </div>
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
