import * as actionTypes from "./constants";

const initialState = {};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.SET_USER: {
      return {...actions.payload};
    }
    case actionTypes.SET_LOCALE: {
      return {
        ...state,
        locale: actions.payload
      };
    }
    default:
      return state;
  }
}
