// packages
import React from 'react';

// css styles
import styles from '../assets/styles'

// imported components
import StyleButton from './StyleButton';

var COLORS = [
  {label: 'Red', style: 'red'},
  {label: 'Orange', style: 'orange'},
  {label: 'Yellow', style: 'yellow'},
  {label: 'Green', style: 'green'},
  {label: 'Blue', style: 'blue'},
  {label: 'Indigo', style: 'indigo'},
  {label: 'Violet', style: 'violet'},
];

class ColorControls extends React.Component {
  constructor(props) {
    super(props);
    this.currentStyle = this.props.editorState.getCurrentInlineStyle();
  }
  render() {
    this.currentStyle = this.props.editorState.getCurrentInlineStyle();
    return (
      <div style={styles.controls}>
        {COLORS.map(type =>
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

export default ColorControls
