import apiService from "@services/apiService";
import axios from "axios";
import { actions } from "./ui";

const {
  getSectionsRequest,
  getSectionsSuccess,
  getSectionsError,
  postSectionsRequest,
  postSectionsSuccess,
  postSectionsError,
  putSectionsRequest,
  putSectionsSuccess,
  putSectionsError,
  deleteSectionsRequest,
  deleteSectionsSuccess,
  deleteSectionsError,
} = actions;

let cancel;

export function getSections(params = {}) {
  return async (dispatch) => {
    try {
      const { itemsPerPage, order } = params;

      dispatch(getSectionsRequest());

      cancel && cancel();

      let apiUrl = "api/sections?groups[]=section:translations";

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

      dispatch(getSectionsSuccess(response));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(getSectionsError(error));
        throw error;
      }
    }
  };
}

export function postSection(section) {
  return async (dispatch) => {
    try {
      dispatch(postSectionsRequest());
      const { data } = await apiService.post("api/sections", section);
      dispatch(
        postSectionsSuccess({
          data,
          messages: [
            {
              message: "add.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(postSectionsError(error));
      throw error;
    }
  };
}

export function updateSection(section) {
  return async (dispatch) => {
    const { "@id": id } = section;
    try {
      dispatch(putSectionsRequest());
      const { data } = await apiService.put(id, section);
      dispatch(
        putSectionsSuccess({
          data,
          messages: [
            {
              message: "edit.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(putSectionsError(error));
      throw error;
    }
  };
}

export function deleteSection(section) {
  return async (dispatch) => {
    const { "@id": id } = section;
    try {
      dispatch(deleteSectionsRequest());
      await apiService.delete(id, section);
      dispatch(
        deleteSectionsSuccess({
          data: section,
          messages: [
            {
              message: "delete.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(deleteSectionsError(error));
      throw error;
    }
  };
}
