// packages
import React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
} from 'draft-js';

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
    this.logState = () => console.log(this.state.editorState.toJS());
    this.focus = () => this.editor.focus();
  }

  // _handleKeyCommand(command, editorState) {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //     this.onChange(newState);
  //     return true;
  //   }
  //   return false;
  // }

  onChange(editorState) {
    this.setState({
      editorState,
    })
  }

  _onTab(e) {
    e.preventDefault;
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
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

  render() {
    return (
      <div className={'RichEditor-root'}>
        <p
          style={styles.header}>
          Draft
        </p>
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
        <div className={'container'}>
          <div
            style={styles.editor}
            onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              customStyleMap={colorStyleMap}
              onChange={(state) => this.onChange(state)}
              onTab={(e) => this._onTab(e)}
              // handleKeyCommand={() => this._handleKeyCommand()}
              ref={(ref) => this.editor = ref}
            />
          </div>
          <input
            onClick={this.logState}
            style={styles.button}
            type="button"
            value="Log State"
          />
          </div>
        </div>
      );
    }
  };

  export default Draft;
