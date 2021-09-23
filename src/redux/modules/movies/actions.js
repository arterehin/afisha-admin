import apiService from "@services/apiService";
import axios from "axios";
import { actions } from "./ui";

const {
  getMoviesRequest,
  getMoviesSuccess,
  getMoviesError,
  postMoviesRequest,
  postMoviesSuccess,
  postMoviesError,
  putMoviesRequest,
  putMoviesSuccess,
  putMoviesError,
  deleteMoviesRequest,
  deleteMoviesSuccess,
  deleteMoviesError,
} = actions;

let cancel;

export function getMovies(params = {}) {
  return async (dispatch) => {
    try {
      const { itemsPerPage, order } = params;

      dispatch(getMoviesRequest());

      cancel && cancel();

      let apiUrl = "api/movies?groups[]=movie:translations";

      if (order) {
        Object.keys(order).forEach((field) => {
          apiUrl += `&order[${field}]=${order[field]}`;
        });
      }
      if (!isNaN(itemsPerPage)) {
        apiUrl += "&itemsPerPage=" + itemsPerPage;
      }

      const response = await apiService.get(apiUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        params: {},
      });

      dispatch(getMoviesSuccess(response));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(getMoviesError(error));
        throw error;
      }
    }
  };
}

export function postMovie(movie) {
  return async (dispatch) => {
    try {
      dispatch(postMoviesRequest());
      const { data } = await apiService.post("api/movies", movie);
      dispatch(
        postMoviesSuccess({
          data,
          messages: [
            {
              message: "add.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(postMoviesError(error));
      throw error;
    }
  };
}

export function updateMovie(movie) {
  return async (dispatch) => {
    const { "@id": id } = movie;
    try {
      dispatch(putMoviesRequest());
      const { data } = await apiService.put(id, movie);
      dispatch(
        putMoviesSuccess({
          data,
          messages: [
            {
              message: "edit.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(putMoviesError(error));
      throw error;
    }
  };
}

export function deleteMovie(movie) {
  return async (dispatch) => {
    const { "@id": id } = movie;
    try {
      dispatch(deleteMoviesRequest());
      await apiService.delete(id, movie);
      dispatch(
        deleteMoviesSuccess({
          data: movie,
          messages: [
            {
              message: "delete.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(deleteMoviesError(error));
      throw error;
    }
  };
}
