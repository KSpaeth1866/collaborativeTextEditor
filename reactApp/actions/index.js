import * as types from './types';

export function typing(state) {
  return {
    type: types.TYPING,
    state,
  };
}

export function login() {
  return {
    type: types.LOGIN,
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  };
}
