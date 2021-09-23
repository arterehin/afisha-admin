import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getAddPlaceAttributesRequest,
  getAddPlaceAttributesSuccess,
  getAddPlaceAttributesError
} = actions;

let cancel;

export function getAddPlaceAttributes(place) {
  return async (dispatch) => {
    try {
      dispatch(getAddPlaceAttributesRequest());

      cancel && cancel();

      const response = await apiService.get("api/place_attributes", {
        params: {
          place
        }
      });

      dispatch(getAddPlaceAttributesSuccess(response));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(getAddPlaceAttributesError(error));
        throw error;
      }
    }
  };
}
