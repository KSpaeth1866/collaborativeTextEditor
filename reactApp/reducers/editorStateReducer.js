// packages
import {
  EditorState,
} from 'draft-js';

// action types
import * as types from '../actions/types';

const generateState = () => {
  return EditorState.createEmpty();
}

// const copyState = (state) => {
//   let result = EditorState.createWithContent(state.getCurrentContent)
//   return result;
// }

const initialState = generateState();

const editorStateReducer = (state = initialState, action) => {
  // let newState = copyState(state);
  switch (action.type) {
    case types.CLOSE_MODAL:
      return state;
    default:
      return state;
  }
};

export default editorStateReducer;
