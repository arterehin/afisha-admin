import * as actionTypes from "./constants";
import authService from "@services/authService";

export function logIn(options) {
  return (dispatch) => {
    dispatch(loadingStart());
    dispatch(clearMessage());
    authService.logIn(options)
      .catch(() => {
        dispatch(setMessage("Неверный логин или пароль"))
      })
      .finally(() => {
        dispatch(loadingEnd());
      });
  };
}

export function loadingStart() {
  return {
    type: actionTypes.LOADING_START
  };
}

export function loadingEnd() {
  return {
    type: actionTypes.LOADING_END
  };
}

export function loggedIn() {
  return {
    type: actionTypes.LOGGED_IN
  };
}

export function loggedOut() {
  return {
    type: actionTypes.LOGGED_OUT
  };
}

export function setMessage(message) {
  return {
    type: actionTypes.SET_MESSAGE,
    payload: message
  };
}

export function clearMessage() {
  return {
    type: actionTypes.CLEAR_MESSAGE
  };
}