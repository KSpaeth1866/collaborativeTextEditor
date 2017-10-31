// packages
import React from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

// css styles
import styles from '../assets/styles'

// imported components
import Draft from './Draft';
import DocsList from './DocsList';
import Login from './Login';
import Register from './Register';

// dispatch actions
import {
  login,
  logout,
} from '../actions/index';

// class component
class Page extends React.Component {
  render() {
    return (
      <div style={styles.pageContainer}>
        {
          this.props.loggedIn
          ?
          <DocsList />
          :
          <HashRouter>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/register' component={Register} />
            </Switch>
          </HashRouter>
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: () => dispatch(login()),
    onLogout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
