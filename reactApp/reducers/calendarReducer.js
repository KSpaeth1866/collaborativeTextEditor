import * as types from '../actions/types';

const generateState = () => {
  let result = {};
  return result;
}

const copyState = (state) => {
  let result = {};
  return result;
}

const initialState = generateState();

const calendarReducer = (state = initialState, action) => {
  let newState = copyState(state);
  switch (action.type) {
    case types.CLOSE_MODAL:
      return newState;
    default:
      return state;
  }
};

export default calendarReducer;
