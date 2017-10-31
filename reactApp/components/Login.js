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

class Login extends React.Component {
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
          Sign in
        </div>
        <div
          style={styles.authSubHeader}>
          to continue to Docs
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
        <br />
        <br />
        <RaisedButton
          style={styles.styleButton}
          primary={true}
          // onClick={() => this.props.onLogout()}
          label={'Login'}
          fullWidth={true}
        />
        <br />
        <br />
        <br />
        <Link to={'/register'}>
          <RaisedButton
            style={styles.styleButton}
            primary={true}
            label={'Go to Registration'}
            fullWidth={true}
          />
        </Link>
      </Paper>
    );
  }
}

export default Login;
