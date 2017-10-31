// action types
import * as types from '../actions/types';

const loggedInReducer = (state = false, action) => {
  // let newState = copyState(state);
  switch (action.type) {
    case types.LOGIN:
      return true;
    case types.LOGOUT:
      return false;
    default:
      return state;
  }
};

export default loggedInReducer;
