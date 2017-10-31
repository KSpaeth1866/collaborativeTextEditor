// packages
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper';
import {
  Link,
} from 'react-router-dom';

// css styles
import styles from '../assets/styles'

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper
        zDepth={2}
        style={styles.container}
        >
        <div
          style={styles.authHeader}>
          Create an account
        </div>
        <TextField
          floatingLabelText="Username"
          fullWidth={true}
        />
        <TextField
          floatingLabelText="Password"
          type="password"
          fullWidth={true}
        />
        <TextField
          floatingLabelText="Confirm Password"
          type="password"
          fullWidth={true}
        />
        <br />
        <br />
        <RaisedButton
          style={styles.styleButton}
          primary={true}
          // onClick={() => this.props.onLogout()}
          label={'Register'}
          fullWidth={true}
        />
        <br />
        <br />
        <br />
        <Link to={'/login'}>
          <RaisedButton
            style={styles.styleButton}
            primary={true}
            label={'Go to Login'}
            fullWidth={true}
          />
        </Link>
      </Paper>
    );
  }
}

export default Register;
