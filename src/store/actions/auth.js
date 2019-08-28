import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyC1n6rd7ODd1ubwf8A56bliz1Po1d2nWzA';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
}

export const authFail = err => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (exTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, exTime * 1000);
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
        const exp = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expDate', exp);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        // console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = dispatch => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expDate = new Date(localStorage.getItem('expDate'));
      if (expDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000))
      }
    }

  }
}