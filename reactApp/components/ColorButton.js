// packages
import React from 'react';
import { GithubPicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
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
      <div style={styles.controls}>
        <RaisedButton
          style={styles.toolbarButton}
          icon={<FontIcon className="material-icons">format_paint</FontIcon>}
          onMouseDown={(e) => this.openColorPicker(e)}
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
        </RaisedButton>
      </div>
    );
  }
};

export default ColorButton
