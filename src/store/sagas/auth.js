import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

import axios from "axios";

const API_KEY = 'AIzaSyC1n6rd7ODd1ubwf8A56bliz1Po1d2nWzA';

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.exTime * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  try {
    yield put(actions.authStart());
    const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    if (!action.isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }

    const response = yield axios.post(url, authData);
    const exp = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expDate", exp);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (e) {
    yield put(
      actions.authFail(e.response.data.error)
    )
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
    if (!token) {
      yield put(actions.logout());
    } else {
      const expDate = yield new Date(localStorage.getItem('expDate'));
      if (expDate <= new Date()) {
        yield put(actions.logout());
      } else {
        const userId = yield localStorage.getItem('userId');
        yield put(actions.authSuccess(token, userId));
        yield put(actions.checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000))
      }
    }
}
