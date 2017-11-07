// packages
import React from 'react';

// css styles
import styles from '../assets/styles'

// imported components
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote', icon: 'format_indent_increase'},
  {label: 'UL', style: 'unordered-list-item', icon: 'format_list_bulleted'},
  {label: 'OL', style: 'ordered-list-item', icon: 'format_list_numbered'},
  {label: 'Align Left', style: 'left', icon: 'format_align_left'},
  {label: 'Align Center', style: 'center', icon: 'format_align_center'},
  {label: 'Align Right', style: 'right', icon: 'format_align_right'},
];

class BlockStyleControls extends React.Component{
  constructor(props) {
    super(props)

    // this.selection = this.props.editorState.getSelection();
    // this.blockType = this.props.editorState
    // .getCurrentContent()
    // .getBlockForKey(this.selection.getStartKey())
    // .getType();
  }

  render() {
    // this.blockType = this.props.editorState
    // .getCurrentContent()
    // .getBlockForKey(this.selection.getStartKey())
    // .getType();
    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === this.blockType}
            label={type.label}
            onToggle={(style) => this.props.onToggle(style)}
            style={type.style}
            icon={type.icon}
          />
        )}
      </div>
    );
  }
};

export default BlockStyleControls;
