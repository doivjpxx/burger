import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyC1n6rd7ODd1ubwf8A56bliz1Po1d2nWzA';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFail = err => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }
    axios
      .post(url, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  }
}