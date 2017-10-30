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
            onToggle={(style) => this.props.onToggle(style)}
            style={type.style}
          />
        )}
      </div>
    );
  }
};

export default BlockStyleControls;
