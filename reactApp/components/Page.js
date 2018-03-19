// packages
import React from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

// css styles
import styles from '../assets/styles'

// imported components
import Draft from './Draft';
import DocsList from './DocsList';
import Login from './Login';
import Register from './Register';

// class component
class Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        style={styles.pageContainer}
        >
        <HashRouter>
          <Switch>
            <Route exact path='/' component={
              this.props.userInfo.loggedIn
              ?
              DocsList
              :
              Login
            }
            />
            <Route path='/register' component={Register} />
            <Route path='/document/:id' component={Draft} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(Page);
