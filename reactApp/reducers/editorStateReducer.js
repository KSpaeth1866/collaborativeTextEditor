// packages
import {
  EditorState,
} from 'draft-js';

// action types
import * as types from '../actions/types';

const generateState = () => {
  return EditorState.createEmpty();
}

const initialState = generateState();

const editorStateReducer = (state = initialState, action) => {
  // let newState = copyState(state);
  switch (action.type) {
    case types.TYPING:
      return action.state;
    default:
      return state;
  }
};

export default editorStateReducer;
