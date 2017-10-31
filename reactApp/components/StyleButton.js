// packages
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

// css styles
import styles from '../assets/styles'

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }

  render() {
    return (
      <RaisedButton
        style={styles.styleButton}
        primary={this.props.active ? true : false}
        onMouseDown={(e) => this.props.onToggle(this.props.style)}
        label={this.props.label}
      />
    );
  }
}

export default StyleButton;
