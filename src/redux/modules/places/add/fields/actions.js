import apiService from "@services/apiService";
import axios from "axios";
import { actions } from "./ui";

const {
  getAddPlaceFieldsRequest,
  getAddPlaceFieldsSuccess,
  getAddPlaceFieldsError
} = actions;

let cancel;

export function getAddPlaceFields(placeType) {
  return async (dispatch) => {
    try {
      dispatch(getAddPlaceFieldsRequest());

      cancel && cancel();

      const response = await apiService.get("api/place_type_fields", {
        cancelToken: new axios.CancelToken((c) => cancel = c),
        params: {
          placeType,
          "groups[]": "place_type_field:translations"
        }
      });

      dispatch(getAddPlaceFieldsSuccess(response));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(getAddPlaceFieldsError(error));
        throw error;
      }
    }
  };
}
