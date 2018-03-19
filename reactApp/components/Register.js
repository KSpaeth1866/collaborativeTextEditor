// packages
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import {
  Link,
} from 'react-router-dom';
import axios from 'axios';

// css styles
import styles from '../assets/styles'

// dispatch actions
import {
  login,
} from '../actions/index';

// class component
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    }
  }

  async onClickRegister() {
    if (this.state.password !== this.state.confirmPassword || this.state.password.length === 0) {
      alert('passwords must match and be > 0 characters')
      return
    }

    try {
      let reg = await axios.post(SERVER_URL + '/register', {
        username: this.state.username,
        password: this.state.password,
        withCredentials: true,
      })
      if (reg.data.success) {
        let login = await axios.post(SERVER_URL + '/login', {
          username: this.state.username,
          password: this.state.password,
        })
        if (login.data.success) {
          this.props.onLogin(login.data.user);
          this.props.history.push('/');
        }
      }
    }
    catch(e) {
      console.log(e);
    }

  }

  render() {
    return (
      <div
        style={{display: 'flex', flexDirection: 'column'}}
        >
        <AppBar
          title='Welcome to Docs'
        />
        <Paper
          zDepth={2}
          style={styles.authContainer}
          className='regContainer'
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
              primary={true}
              label={'Go to Login'}
              fullWidth={true}
            />
          </Link>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => dispatch(login(user)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
