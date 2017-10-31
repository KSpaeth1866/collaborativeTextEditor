import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import editorStateReducer from './editorStateReducer';

const rootReducer = combineReducers({
  editorState: editorStateReducer,
  routing,
});

export default rootReducer;
