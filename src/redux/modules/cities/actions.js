import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getCitiesRequest,
  getCitiesSuccess,
  getCitiesError
} = actions;

export function getCities() {
  return async (dispatch) => {
    try {
      dispatch(getCitiesRequest());
      const response = await apiService.get("api/cities?groups[]=city:translations");
      dispatch(getCitiesSuccess(response));
    } catch (error) {
      dispatch(getCitiesError(error));
      throw error;
    }
  };
}