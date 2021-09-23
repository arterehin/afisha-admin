import apiService from "@services/apiService";
import axios from "axios";
import { actions } from "./ui";

const {
  getEditPlaceAttributesRequest,
  getEditPlaceAttributesSuccess,
  getEditPlaceAttributesError
} = actions;

let cancel;

export function getEditPlaceAttributes(place) {
  return async (dispatch) => {
    try {
      dispatch(getEditPlaceAttributesRequest());

      cancel && cancel();

      const response = await apiService.get("api/place_attributes", {
        cancelToken: new axios.CancelToken((c) => cancel = c),
        params: {
          place,
          "groups[]": "place_attribute:translations"
        }
      });

      dispatch(getEditPlaceAttributesSuccess(response));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(getEditPlaceAttributesError(error));
        throw error;
      }
    }
  };
}
