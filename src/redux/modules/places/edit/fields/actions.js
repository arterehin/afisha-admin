import apiService from "@services/apiService";
import axios from "axios";
import { actions } from "./ui";

const {
  getEditPlaceFieldsRequest,
  getEditPlaceFieldsSuccess,
  getEditPlaceFieldsError
} = actions;

let cancel;

export function getEditPlaceFields(placeType) {
  return async (dispatch) => {
    try {
      dispatch(getEditPlaceFieldsRequest());

      cancel && cancel();

      const response = await apiService.get("api/place_type_fields", {
        cancelToken: new axios.CancelToken((c) => cancel = c),
        params: {
          placeType,
          "groups[]": "place_type_field:translations"
        }
      });

      dispatch(getEditPlaceFieldsSuccess(response));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(getEditPlaceFieldsError(error));
        throw error;
      }
    }
  };
}
