// action types
import * as types from '../actions/types';

const initialState = {
  user: null,
  loggedIn: false,
}

const loggedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        user: action.user,
        loggedIn: true,
      };
    case types.LOGOUT:
      return {
        user: null,
        loggedIn: false,
      };
    case types.REFRESH:
      return {
        user: action.user,
        loggedIn: true,
      };
    default:
      return state;
  }
};

export default loggedInReducer;
