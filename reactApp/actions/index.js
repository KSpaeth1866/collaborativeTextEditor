import * as types from './types';

export function typing(state) {
  return {
    type: types.TYPING,
    state,
  };
}
