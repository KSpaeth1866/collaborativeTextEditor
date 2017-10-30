// packages
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

// css styles
import styles from '../assets/styles'

// imported components
import Draft from './Draft';
import Test1 from './Test1';
import Test2 from './Test2';

// class component
class Page extends React.Component {
  render() {
    return (
      <div className={'container'}>
        <Draft />
      </div>
    );
  }
};

export default Page;
