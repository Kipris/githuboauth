import { LOGIN, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_USER_ROLES } from './types';

export const login = (data, uri) => ({
  type: LOGIN,
  payload: { data, uri },
});

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
});

export const loginFailure = (errorMessage) => ({
  type: LOGIN_FAILURE,
  payload: { errorMessage },
});

export const setUserRoles = (roles) => {
  return {
    type: SET_USER_ROLES,
    payload: { roles },
  };
};

export const logout = () => ({
  type: LOGOUT,
});
