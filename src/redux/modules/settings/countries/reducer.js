import * as actionTypes from "./constants";

const initialState = [];

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.ADD_COUNTRIES: {
      return actions.payload;
    }
    default:
      return state;
  }
}
