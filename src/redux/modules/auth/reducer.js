import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  loggedIn: false,
  message: ''
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.LOADING_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.LOADING_END: {
      return {
        ...state,
        loading: false
      };
    }
    case actionTypes.LOGGED_IN: {
      return {
        ...state,
        loggedIn: true
      };
    }
    case actionTypes.LOGGED_OUT: {
      return {
        ...state,
        loggedIn: false
      };
    }
    case actionTypes.SET_MESSAGE: {
      return {
        ...state,
        message: actions.payload
      };
    }
    case actionTypes.CLEAR_MESSAGE: {
      return {
        ...state,
        message: ''
      };
    }
    default:
      return state;
  }
}
