import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import editorStateReducer from './editorStateReducer';
import userInfoReducer from './userInfoReducer';

const rootReducer = combineReducers({
  // editorState: editorStateReducer,
  userInfo: userInfoReducer,
  routing,
});

export default rootReducer;
