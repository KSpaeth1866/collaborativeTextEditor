// packages
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// imported components
import Page from './components/Page';

const store = createStore(rootReducer);

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Page />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
