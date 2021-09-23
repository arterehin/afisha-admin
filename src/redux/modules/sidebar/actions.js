import * as actionTypes from "./constants";

export const toggleSidebar = () => {
  return {
    type: actionTypes.VISIBILITY_TOGGLE
  };
}
