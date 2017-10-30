import React from 'react';
import {
Editor,
EditorState,
RichUtils,
} from 'draft-js';
import styles from '../assets/styles'
import colorStyleMap from '../assets/colors'

// imported components
// import Header from './Header';

// class component
class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.logState = () => console.log(this.state.editorState.toJS());
    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
  }

  // _handleKeyCommand(command, editorState) {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //     this.onChange(newState);
  //     return true;
  //   }
  //   return false;
  // }

  _onTab(e) {
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
        <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={(style) => this._toggleBlockType(style)}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={(style) => this._toggleInlineStyle(style)}
        />
        <div className={'container'}>
          <p
            style={styles.header}>
            Draft</p>
            <div
              style={styles.editor}
              onClick={this.focus}>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                onTab={() => this._onTab()}
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
      )};
};

/*********************
copy pasta
*********************/

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span
        className={className}
        onMouseDown={(e) => this.onToggle(e)}
        >
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

class BlockStyleControls extends React.Component{
  constructor(props) {
    super(props)

    this.selection = this.props.editorState.getSelection();
    this.blockType = this.props.editorState
    .getCurrentContent()
    .getBlockForKey(this.selection.getStartKey())
    .getType();
  }

  render() {
    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === this.blockType}
            label={type.label}
            onToggle={(style) => this.callToggle(style)}
            onToggle={(style) => this.props.onToggle(style)}
            style={type.style}
          />
        )}
      </div>
    );
  }
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

class InlineStyleControls extends React.Component {
  constructor(props) {
    super(props)
    this.currentStyle = this.props.editorState.getCurrentInlineStyle();
  }
  render() {
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={this.currentStyle.has(type.style)}
            label={type.label}
            onToggle={(style) => this.props.onToggle(style)}
            style={type.style}
          />
        )}
      </div>
    );
  }
};

var COLORS = [
  {label: 'Red', style: 'red'},
  {label: 'Orange', style: 'orange'},
  {label: 'Yellow', style: 'yellow'},
  {label: 'Green', style: 'green'},
  {label: 'Blue', style: 'blue'},
  {label: 'Indigo', style: 'indigo'},
  {label: 'Violet', style: 'violet'},
];
const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div style={styles.controls}>
      {COLORS.map(type =>
        <StyleButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default Draft;
