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
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    }
  }

  onClickRegister() {
    if (this.state.password !== this.state.confirmPassword) {
      alert('passwords must match')
      return
    }
    console.log('nice👌🏻');
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
        <div
          style={styles.authSubHeader}>
          to being using Docs
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
        <TextField
          floatingLabelText="Confirm Password"
          type="password"
          fullWidth={true}
          onChange={(e) => this.setState({confirmPassword: e.target.value})}
        />
        <br />
        <br />
        <RaisedButton
          style={styles.styleButton}
          primary={true}
          onClick={() => this.onClickRegister()}
          label={'Register'}
          fullWidth={true}
        />
        <br />
        <br />
        <br />
        <Link to={'/'}>
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
