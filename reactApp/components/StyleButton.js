// packages
import React from 'react';

// css styles
import styles from '../assets/styles'

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    let className = 'styleButton';
    if (this.props.active) {
      className += ' activeButton';
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

export default StyleButton;
