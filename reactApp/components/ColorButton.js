// packages
import React from 'react';
import { GithubPicker } from 'react-color';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import FontIcon from 'material-ui/FontIcon';

// css styles
import styles from '../assets/styles'

// imported components
import StyleButton from './StyleButton';

class ColorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPickerOpen: false,
    }
  }

  openColorPicker(e) {
    this.setState({
      colorPickerOpen: true,
      colorPickerButton: e.target,
    })
  }

  closeColorPicker() {
    this.setState({
      colorPickerOpen: false,
    })
  }

  render() {
    return (
      <FlatButton
        style={{margin: 1, minWidth: 36,}}
        icon={
          <FontIcon
            className="material-icons"
            style={styles.buttonIcon}
            >
              format_paint
            </FontIcon>
          }
        onMouseDown={(e) => this.openColorPicker(e)}
        backgroundColor={'white'}
        >
        <Popover
          open={this.state.colorPickerOpen}
          anchorEl={this.state.colorPickerButton}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.closeColorPicker()}
          >
          <GithubPicker
            onChangeComplete={(color) => this.props.onToggle(null, color.hex)}
          />
        </Popover>
      </FlatButton>
    );
  }
};

export default ColorButton
