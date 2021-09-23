import * as actionTypes from "./constants";

const initialState = {
  isOpen: true,
  isSticky: false
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.VISIBILITY_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
}
