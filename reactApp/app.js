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

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Page />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
