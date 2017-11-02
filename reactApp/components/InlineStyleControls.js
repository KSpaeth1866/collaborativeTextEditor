// packages
import React from 'react';

// css styles
import styles from '../assets/styles'

// imported components
import StyleButton from './StyleButton';


var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', icon: 'format_bold'},
  {label: 'Italic', style: 'ITALIC', icon: 'format_italic'},
  {label: 'Underline', style: 'UNDERLINE', icon: 'format_underline'},
  {label: 'Monospace', style: 'CODE', icon: 'code'},
];

class InlineStyleControls extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={this.props.editorState.getCurrentInlineStyle().has(type.style)}
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

export default InlineStyleControls;
