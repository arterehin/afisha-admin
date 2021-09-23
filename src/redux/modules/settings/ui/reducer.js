import * as actionTypes from "./constants";

const initialState = {
  city: {
    edit: {
      enabled: false,
      current: null
    }
  },
  district: {
    add: {
      enabled: false,
      current: null
    },
    edit: {
      enabled: false,
      current: null
    }
  }
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.ENABLE_TAB: {
      const { type, mode, current } = actions.payload;

      return {
        ...state,
        [type]: {
          ...state[type],
          [mode]: {
            enabled: true,
            current
          }
        }
      };
    }
    case actionTypes.DISABLE_TAB: {
      const { type, mode } = actions.payload;

      return {
        ...state,
        [type]: {
          ...state[type],
          [mode]: {
            enabled: false,
            current: null
          }
        }
      };
    }
    default:
      return state;
  }
}
