import {
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
} from '../actions/types';

const users = (state = [], action) => {
  switch (action.type) {
    case POST_USER_SUCCESS:
      return [...state, action.payload];
    case POST_USER_FAILURE:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

export default users;
