import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import editorStateReducer from './editorStateReducer';
import loggedInReducer from './loggedInReducer';

const rootReducer = combineReducers({
  editorState: editorStateReducer,
  loggedIn: loggedInReducer,
  routing,
});

export default rootReducer;
