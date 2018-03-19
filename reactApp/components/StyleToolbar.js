// packages
import React from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';


// styles
import styles from '../assets/styles';
import INLINE_STYLES from '../assets/inlineStyles';
import BLOCK_TYPES from '../assets/blockTypes';

// imported components
import StyleButton from './StyleButton';
import ColorButton from './ColorButton';


class StyleToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shareOpen: false,
    }
  }

  render() {
    return (
      <div>
        <Dialog
            title="Share this ID to share this Doc"
            actions={
              <RaisedButton
                label="Close"
                primary={true}
                onClick={() => this.setState({shareOpen: false})}
              />
            }
            modal={false}
            open={this.state.shareOpen}
            onRequestClose={() => this.setState({shareOpen: false})}
          >
          {this.props.id}
        </Dialog>

        <Toolbar>
          <ToolbarGroup>
            {INLINE_STYLES.map(type =>
              <StyleButton
                key={type.style}
                style={type.style}
                icon={type.icon}
                onToggle={(e, style) => this.props.onToggleInlineStyle(e, style)}
                active={this.props.editorState.getCurrentInlineStyle().has(type.style)}
              />
            )}
            <ColorButton
              onToggle={(e, style) => this.props.onToggleInlineStyle(e, style)}
            />
            {BLOCK_TYPES.map(type =>
              <StyleButton
                key={type.style}
                style={type.style}
                icon={type.icon}
                onToggle={(e, style) => this.props.onToggleBlockType(e, style)}
                active={this.props.editorState.getCurrentInlineStyle().has(type.style)}
              />
            )}
          </ToolbarGroup>
          <ToolbarGroup>
            <div
              style={{display: 'flex', flexDirection: 'row'}}
            >
              <FlatButton
                onClick={() => this.props.onClickSave()}
                label={'Save'}
                style={{margin: 1}}
                backgroundColor={'white'}
              />
              <FlatButton
                onClick={() => this.setState({shareOpen: true})}
                label={'Share'}
                style={{margin: 1}}
                backgroundColor={'white'}
              />
              <Link
                to='/'
                style={{margin: 1, width: 88,}}
                >
                <FlatButton
                  fullWidth={true}
                  onClick={() => this.props.onBackToDocs()}
                  label={'Back'}
                  backgroundColor={'white'}
                />
              </Link>
            </div>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
};

export default StyleToolbar;
