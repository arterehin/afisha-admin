import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getCelebritiesRequest,
  getCelebritiesSuccess,
  getCelebritiesError,
  postCelebritiesRequest,
  postCelebritiesSuccess,
  postCelebritiesError,
  putCelebritiesRequest,
  putCelebritiesSuccess,
  putCelebritiesError,
  deleteCelebritiesRequest,
  deleteCelebritiesSuccess,
  deleteCelebritiesError
} = actions;

export function getCelebrities() {
  return async (dispatch) => {
    try {
      dispatch(getCelebritiesRequest());
      const response = await apiService.get("api/celebrities?page=1");
      dispatch(getCelebritiesSuccess(response));
    } catch (error) {
      dispatch(getCelebritiesError(error));
      throw error;
    }
  };
}

export function postCelebrities(celebritie) {
  return async (dispatch) => {
    try {
      dispatch(postCelebritiesRequest());
      const { data } = await apiService.post("api/celebrities", celebritie);
      dispatch(postCelebritiesSuccess({
        data,
        messages: [{
          message: "add.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(postCelebritiesError(error));
      throw error;
    }
  };
}

export function putCelebrities(celebritie) {
  return async (dispatch) => {
    const { "@id": id } = celebritie;
    try {
      dispatch(putCelebritiesRequest());
      const { data } = await apiService.put(id, celebritie);
      dispatch(putCelebritiesSuccess({
        data,
        messages: [{
          message: "edit.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(putCelebritiesError(error));
      throw error;
    }
  };
}

export function deleteCelebrities(celebritie) {
  return async (dispatch) => {
    const { "@id": id } = celebritie;
    try {
      dispatch(deleteCelebritiesRequest());
      await apiService.delete(id, celebritie);
      dispatch(deleteCelebritiesSuccess({
        data: celebritie,
        messages: [{
          message: "delete.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(deleteCelebritiesError(error));
      throw error;
    }
  };
}