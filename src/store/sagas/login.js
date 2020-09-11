import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from '../actions/login';
import { postUserSuccess, postUserFailure } from '../actions/users';
import { LOGIN } from '../actions/types';

function* workerLogin(action) {
  const { data, uri } = action.payload;
  yield put(loginStart());
  try {
    const response = yield call(Axios.post, uri, data);
    yield put(loginSuccess(response.data));
    // then post a user
    const url = 'http://localhost:3000/users';
    try {
      yield call(Axios.post, url, action.payload);
      yield put(postUserSuccess(action.payload));
    } catch {
      yield put(postUserFailure(`ERROR! Cannot post user at ${url}`));
    }
  } catch (error) {
    console.error(error);
    yield put(loginFailure(`ERROR! Cannot post user at ${uri}`));
  }
}

function* watchLogin() {
  yield takeEvery(LOGIN, workerLogin);
}

export default watchLogin;
