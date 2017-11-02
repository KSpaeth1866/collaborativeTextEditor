// packages
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

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
        primary={this.props.active ? true : false}
        onMouseDown={(e) => this.props.onToggle(this.props.style)}
        icon={
          this.props.icon ?
          <FontIcon className="material-icons">{this.props.icon}</FontIcon>
          :
          null
        }
        label={
          this.props.icon ?
          null
          :
          this.props.label
        }
      />
    );
  }
}

export default StyleButton;
