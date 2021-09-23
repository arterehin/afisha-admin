import apiService from "@services/apiService";
import axios from "axios";
import { actions } from "./ui";

const {
  getPerformancesRequest,
  getPerformancesSuccess,
  getPerformancesError,
  postPerformancesRequest,
  postPerformancesSuccess,
  postPerformancesError,
  putPerformancesRequest,
  putPerformancesSuccess,
  putPerformancesError,
  deletePerformancesRequest,
  deletePerformancesSuccess,
  deletePerformancesError,
} = actions;

let cancel;

export function getPerformances(params = {}) {
  return async (dispatch) => {
    try {
      const { itemsPerPage, order } = params;

      dispatch(getPerformancesRequest());

      cancel && cancel();

      let apiUrl = "api/performances?groups[]=performance:translations";

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

      dispatch(getPerformancesSuccess(response));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(getPerformancesError(error));
        throw error;
      }
    }
  };
}

export function postPerformance(performance) {
  return async (dispatch) => {
    try {
      dispatch(postPerformancesRequest());
      const { data } = await apiService.post("api/performances", performance);
      dispatch(
        postPerformancesSuccess({
          data,
          messages: [
            {
              message: "add.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(postPerformancesError(error));
      throw error;
    }
  };
}

export function updatePerformance(performance) {
  return async (dispatch) => {
    const { "@id": id } = performance;
    try {
      dispatch(putPerformancesRequest());
      const { data } = await apiService.put(id, performance);
      dispatch(
        putPerformancesSuccess({
          data,
          messages: [
            {
              message: "edit.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(putPerformancesError(error));
      throw error;
    }
  };
}

export function deletePerformance(performance) {
  return async (dispatch) => {
    const { "@id": id } = performance;
    try {
      dispatch(deletePerformancesRequest());
      await apiService.delete(id, performance);
      dispatch(
        deletePerformancesSuccess({
          data: performance,
          messages: [
            {
              message: "delete.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(deletePerformancesError(error));
      throw error;
    }
  };
}
