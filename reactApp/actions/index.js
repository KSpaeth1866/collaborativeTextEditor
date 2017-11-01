import * as types from './types';

export function typing(state) {
  return {
    type: types.TYPING,
    state,
  };
}

export function login(user) {
  return {
    type: types.LOGIN,
    user,
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  };
}
