import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getPlacesRequest,
  getPlacesSuccess,
  getPlacesError,
  postPlacesRequest,
  postPlacesSuccess,
  postPlacesError,
  putPlacesRequest,
  putPlacesSuccess,
  putPlacesError,
  deletePlacesRequest,
  deletePlacesSuccess,
  deletePlacesError,
} = actions;

export function getPlaces(params = {}) {
  return async (dispatch) => {
    try {
      const { itemsPerPage, order } = params;

      dispatch(getPlacesRequest());

      let apiUrl = "api/places?groups[]=place:translations";

      if (order) {
        Object.keys(order).forEach((field) => {
          apiUrl += `&order[${field}]=${order[field]}`;
        });
      }
      if (!isNaN(itemsPerPage)) {
        apiUrl += "&itemsPerPage=" + itemsPerPage;
      }

      const response = await apiService.get(apiUrl);
      dispatch(getPlacesSuccess(response));
    } catch (error) {
      dispatch(getPlacesError(error));
      throw error;
    }
  };
}

export function postPlace(place) {
  return async (dispatch) => {
    try {
      dispatch(postPlacesRequest());
      const { data } = await apiService.post("api/places", place);
      dispatch(
        postPlacesSuccess({
          data,
          messages: [
            {
              message: "add.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(postPlacesError(error));
      throw error;
    }
  };
}

export function putPlace(place) {
  return async (dispatch) => {
    const { "@id": id } = place;
    try {
      dispatch(putPlacesRequest());
      const { data } = await apiService.put(id, place);
      dispatch(
        putPlacesSuccess({
          data,
          messages: [
            {
              message: "edit.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(putPlacesError(error));
      throw error;
    }
  };
}

export function deletePlace(place) {
  return async (dispatch) => {
    const { "@id": id } = place;
    try {
      dispatch(deletePlacesRequest());
      await apiService.delete(id, place);
      dispatch(
        deletePlacesSuccess({
          data: place,
          messages: [
            {
              message: "delete.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(deletePlacesError(error));
      throw error;
    }
  };
}
