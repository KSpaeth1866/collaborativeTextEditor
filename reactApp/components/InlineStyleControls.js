// packages
import React from 'react';

// css styles
import styles from '../assets/styles'

// imported components
import StyleButton from './StyleButton';


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
    this.currentStyle = this.props.editorState.getCurrentInlineStyle();
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

export default InlineStyleControls;
