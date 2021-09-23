import * as actionTypes from "./constants";
import apiService from "@services/apiService";

export const getCities = () => {
  return async (dispatch) => {
    try {
      const { data } = await apiService.get("/api/cities");
      dispatch(addCities(data));
    } finally { }
  };
}

export const postCity = (city) => {
  return async (dispatch) => {
    try {
      const { data } = await apiService.post("/api/cities", city);
      dispatch(addCity(data));
    } finally { }
  }
}

export const putCity = (id, city) => {
  return async (dispatch) => {
    try {
      const { data } = await apiService.put(id, city);
      dispatch(updateCity(data));
    } finally { }
  }
}

export const deleteCity = (city) => {
  return async (dispatch) => {
    try {
      await apiService.delete(city);
      dispatch(removeCity({ city }));
    } finally { }
  }
}

export const addCities = (payload) => {
  return {
    type: actionTypes.ADD_CITIES,
    payload
  };
}

export const addCity = (payload) => {
  return {
    type: actionTypes.ADD_CITY,
    payload
  };
}

export const updateCity = (payload) => {
  return {
    type: actionTypes.UPDATE_CITY,
    payload
  };
}

export const removeCity = (payload) => {
  return {
    type: actionTypes.REMOVE_CITY,
    payload
  };
}
