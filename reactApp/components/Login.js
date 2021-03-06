// packages
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import axios from 'axios';

// css styles
import styles from '../assets/styles'

// dispatch actions
import {
  login,
} from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  async onClickLogin() {
    try {
      let login = await axios.post(SERVER_URL + '/login', {
        username: this.state.username,
        password: this.state.password,
        withCredentials: true,
      })
      if (login.data.success) {
        this.props.onLogin(login.data.user);
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
          className='loginContainer'
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
              primary={true}
              onClick={(e) => this.onClickLogin(e)}
              label={'Login'}
              fullWidth={true}
            />
            <br />
            <br />
            <br />
            <Link to={'/register'}>
            <RaisedButton
              primary={true}
              label={'Go to Registration'}
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

export default connect(null, mapDispatchToProps)(Login);
