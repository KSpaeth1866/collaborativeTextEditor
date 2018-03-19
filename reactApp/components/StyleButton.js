// packages
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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
      <FlatButton
        backgroundColor={'white'}
        primary={this.props.active ? true : false}
        style={{margin: 1, minWidth: 36,}}
        onMouseDown={(e) => this.props.onToggle(e, this.props.style)}
        icon={
          this.props.icon ?
          <FontIcon
            className="material-icons"
            style={styles.buttonIcon}
            >
              {this.props.icon}
            </FontIcon>
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
