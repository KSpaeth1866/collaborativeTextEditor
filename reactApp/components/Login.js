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
    this.state = {
      username: '',
      password: '',
    }
  }

  onClickLogin(e) {
    console.log(this.state);
  }

  render() {
    return (
      <Paper
        zDepth={2}
        style={styles.container}
        >
        <form>
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
            onChange={(e) => this.setState({username: e.target.value})}
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            fullWidth={true}
            onChange={(e) => this.setState({password: e.target.value})}
          />
          <br />
          <br />
          <RaisedButton
            style={styles.styleButton}
            primary={true}
            onClick={(e) => this.onClickLogin(e)}
            label={'Login'}
            fullWidth={true}
          />
        </form>
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
