import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getDistrictsRequest,
  getDistrictsSuccess,
  getDistrictsError
} = actions;

export function getDistricts() {
  return async (dispatch) => {
    try {
      dispatch(getDistrictsRequest());
      const response = await apiService.get("api/districts?groups[]=district:translations");
      dispatch(getDistrictsSuccess(response));
    } catch (error) {
      dispatch(getDistrictsError(error));
      throw error;
    }
  };
}