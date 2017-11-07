// packages
import React from 'react';

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
  }

  render() {
    return (
      <div
        style={styles.toolbar}
        >
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
            // active={this.props.editorState.getCurrentInlineStyle().has(type.style)}
          />
        )}
      </div>
    );
  }
};

export default StyleToolbar;
