import * as actionTypes from "./constants";

export const enableTab = (payload) => {
  return {
    type: actionTypes.ENABLE_TAB,
    payload
  };
}

export const disableTab = (payload) => {
  return {
    type: actionTypes.DISABLE_TAB,
    payload
  };
}
