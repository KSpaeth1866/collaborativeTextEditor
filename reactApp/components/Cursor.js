// packages
import React from 'react';

class Cursor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div
          // cursor body
          style={{
            position: 'absolute',
            backgroundColor: this.props.user.color,
            width: '1px',
            height: this.props.user.cursorLocation.height,
            top: this.props.user.cursorLocation.top,
            left: this.props.user.cursorLocation.left,
          }}
          ></div>
        <div
          // cursor head
          style={{
            position: 'absolute',
            backgroundColor: this.props.user.color,
            width: '5px',
            height: '5px',
            top: this.props.user.cursorLocation.top - 2,
            left: this.props.user.cursorLocation.left - 2,
          }}
          ></div>
        <div
          // name box
          style={{
            position: 'absolute',
            backgroundColor: '#000000',
            color: '#ffffff',
            top: this.props.user.cursorLocation.top - 7,
            left: this.props.user.cursorLocation.left + 3,
            fontSize: '8px',
            opacity: .6,
            paddingRight: '2px',
            paddingLeft: '2px',
          }}
          >
          {this.props.user.username}
        </div>
        {this.props.user.highlights.map((location, index) =>
          <div
            // highlighting
            key={index}
            style={{
              position: 'absolute',
              backgroundColor: this.props.user.color,
              width: location.width,
              height: location.height,
              top: location.top,
              left: location.left,
              opacity: .4,
            }}
            ></div>
        )}
      </div>
    );
  }
}

export default Cursor;
