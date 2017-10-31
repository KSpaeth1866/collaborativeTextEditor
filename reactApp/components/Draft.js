// packages
import React from 'react';
import { connect } from 'react-redux';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import { Map } from 'immutable';
import Paper from 'material-ui/Paper';

// css styles
import styles from '../assets/styles'
import colorStyleMap from '../assets/colors'

// imported components
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import ColorControls from './ColorControls';

// class component
class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
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

  focus() {
    this.editor.focus();
  }

  onChange(editorState) {
    this.setState({
      editorState,
    })
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
    return (
      <div className={'RichEditor-root'}>
        <Paper
          style={styles.header}
          zDepth={2}
        >
          Draft
        </Paper>
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
        <Paper
          style={styles.editor}
          zDepth={2}
          onClick={() => this.focus()}>
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
      </div>
      );
    }
  };

  const mapStateToProps = (state) => {
    return {
      editorState: state.editorState,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      // onCloseModal: (day, time) => dispatch(closeModal(day, time)),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Draft);
