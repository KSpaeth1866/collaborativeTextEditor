import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
  calendar: calendarReducer,
  routing,
});

export default rootReducer;
