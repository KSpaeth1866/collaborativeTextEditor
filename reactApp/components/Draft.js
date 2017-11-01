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
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
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
  }

  // _handleKeyCommand(command, editorState) {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //     this.onChange(newState);
  //     return true;
  //   }
  //   return false;
  // }

  async componentWillMount() {
    let id = this.props.match.params.id;
    try {
      let doc = await axios.get(SERVER_URL + '/document/' + id)
      console.log(doc.data.document);
      let contentState = doc.data.document.contentState;
      console.log('contentState from db: ', contentState);
      contentState = JSON.parse(contentState);
      console.log('contentState from db after JSON parse: ', contentState);
      contentState = convertFromRaw(contentState);
      console.log('contentState from db after convert: ', contentState);
      // let editorState = EditorState.createEmpty();
      let editorState = EditorState.createWithContent(contentState)
      console.log('editorState from db: ', editorState);
      console.log('getCurrentContent of editorState from db: ', editorState.getCurrentContent);
      // console.log('getCurrentContent of editorState from db: ', editorState.getCurrentContent);

      this.setState({
        editorState,
        name: doc.data.document.name,
        collaborators: doc.data.document.collaborators,
        owner: doc.data.document.owner,
        ts: doc.data.document.ts,
      })
    }
    catch(e) {
      console.log(e);
    }
  }

  async onClickLogout() {
    console.log('logout');
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
      let contentState = this.state.editorState.getCurrentContent();
      console.log('save: getCurrentContent: ', contentState);
      contentState = convertToRaw(contentState);
      console.log('save: convertToRaw: ', contentState);
      contentState = JSON.stringify(contentState)
      console.log('save: stringify: ', contentState);
      let resp = await axios.post(SERVER_URL + '/document/save/' + this.props.match.params.id, {
        contentState,
        name: this.state.name,
      })
      console.log(resp);
      resp.data.success ? console.log('saved') : console.log('not saved')
    }
    catch(e) {
      console.log(e);
    }

  }

  onChange(editorState) {
    this.setState({
      editorState,
    })
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

  render() {
    // console.log('editorState in render: ', this.state.editorState);
    // console.log('getCurrentContent in render: ',this.state.editorState.getCurrentContent);
    return (
      <div className={'RichEditor-root'}>
        <TextField
          style={styles.header}
          value={this.state.name}
          // floatingLabelText="Doc Name"
          onChange={(e) => this.setState({name: e.target.value})}
        />
        <br />
        <Paper
          style={styles.controlContainer}
          zDepth={2}
          >
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
        </Paper>
        <br />
        <Paper
          style={styles.editor}
          zDepth={2}
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
        <RaisedButton
          primary={true}
          onClick={() => this.onClickSave()}
          label={'Save'}
        />
        <Link to='/'>
          <RaisedButton
            primary={true}
            label={'Back to Docs'}
          />
        </Link>
        <Link to='/'>
          <RaisedButton
            primary={true}
            onClick={() => this.onClickLogout()}
            label={'Logout'}
          />
        </Link>
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
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Draft);
