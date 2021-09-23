import * as actionTypes from "./constants";
import apiService from "@services/apiService";

export const getDistricts = (city, locale) => {
  return async (dispatch) => {
    dispatch(loadingStart(city));
    try {
      const { data } = await apiService.get(`/api/districts?city=${city}`);
      dispatch(addDistricts({
        city,
        data,
        locale
      }));
    } catch {
    } finally {
      dispatch(loadingEnd());
    }
  };
}

export const postDistrict = (district) => {
  return async (dispatch) => {
    try {
      const { data } = await apiService.post("/api/districts", district);
      dispatch(addDistrict(data))
    } finally { }
  }
}

export const putDistrict = (id, district) => {
  return async (dispatch) => {
    try {
      const { data } = await apiService.put(id, district);
      dispatch(updateDistrict(data))
    } finally { }
  }
}

export const deleteDistrict = (city, district) => {
  return async (dispatch) => {
    try {
      await apiService.delete(district);
      dispatch(removeDistrict({
        city,
        district
      }));
    } finally { }
  }
}

export const loadingStart = (payload) => {
  return {
    type: actionTypes.LOADING_START,
    payload
  };
}

export const loadingEnd = () => {
  return {
    type: actionTypes.LOADING_END
  };
}

export const addDistricts = (payload) => {
  return {
    type: actionTypes.ADD_DISTRICTS,
    payload
  };
}

export const addDistrict = (payload) => {
  return {
    type: actionTypes.ADD_DISTRICT,
    payload
  };
}

export const updateDistrict = (payload) => {
  return {
    type: actionTypes.UPDATE_DISTRICT,
    payload
  };
}

export const removeDistrict = (payload) => {
  return {
    type: actionTypes.REMOVE_DISTRICT,
    payload
  };
}

export const removeDistricts = (payload) => {
  return {
    type: actionTypes.REMOVE_DISTRICTS,
    payload
  };
}