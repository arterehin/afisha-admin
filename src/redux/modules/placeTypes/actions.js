import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getPlaceTypesRequest,
  getPlaceTypesSuccess,
  getPlaceTypesError
} = actions;

export function getPlaceTypes() {
  return async (dispatch) => {
    try {
      dispatch(getPlaceTypesRequest());
      const response = await apiService.get("api/place_types?groups[]=place_type:translations");
      dispatch(getPlaceTypesSuccess(response));
    } catch (error) {
      dispatch(getPlaceTypesError(error));
      throw error;
    }
  };
}
