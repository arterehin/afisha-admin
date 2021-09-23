import * as actionTypes from "./constants";
import apiService from "@services/apiService";

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await apiService.get(`/api/users/${id}`);
      dispatch(setUser(data));
      return data;
    } finally { }
  };
}

export const changeLocale = (locale) => {
  return async (dispatch, getState) => {
    const { user: { "@id": id } } = getState();

    try {
      await apiService.put(id, {
        locale 
      });
      dispatch(setLocale(locale));
    } finally { }
  };
}

export const setUser = (payload) => {
  return {
    type: actionTypes.SET_USER,
    payload
  };
}

export const setLocale = (payload) => {
  return {
    type: actionTypes.SET_LOCALE,
    payload
  };
}
