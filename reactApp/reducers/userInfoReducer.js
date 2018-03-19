// action types
import * as types from '../actions/types';

const initialState = {
  user: null,
  loggedIn: false,
  title: 'Welcome to Docs',
}

const loggedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        user: action.user,
        loggedIn: true,
        title: 'Welcome to your docs, ' + action.user.username,
      };
    case types.LOGOUT:
      return {
        user: null,
        loggedIn: false,
        title: 'Welcome to Docs',
      };
    case types.REFRESH:
      return {
        user: action.user,
        loggedIn: true,
        title: 'Welcome to your docs, ' + action.user.username,
      };
    default:
      return state;
  }
};

export default loggedInReducer;
