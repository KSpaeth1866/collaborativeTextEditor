// packages
import React from 'react';

// css styles
import styles from '../assets/styles'

class DocsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }

  render() {
    return (
      <div>
        Welcome to Docslist
      </div>
    );
  }
}

export default DocsList;
