import { POST_USER_SUCCESS, POST_USER_FAILURE } from './types';

export const postUserSuccess = (user) => ({
  type: POST_USER_SUCCESS,
  payload: { user },
});

export const postUserFailure = (errorMessage) => ({
  type: POST_USER_FAILURE,
  payload: { errorMessage },
});
