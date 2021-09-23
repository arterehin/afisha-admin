import * as actionTypes from "./constants";
import apiService from "@services/apiService";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await apiService.get("/api/countries");
      dispatch(addCountries(data));
    } finally { }
  };
}

export const addCountries = (payload) => {
  return {
    type: actionTypes.ADD_COUNTRIES,
    payload
  };
}