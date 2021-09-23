import apiService from "@services/apiService";
import { actions } from "./ui";
import { mapFieldToData } from "@utils/forms/material/mapFieldToData";
import { mapErrorsToFields } from "@utils/forms/common/mapErrorsToFields";
import { postEventScheduleListAsync } from "../../eventSchedule/actions";

const {
  getMaterialsRequest,
  getMaterialsSuccess,
  getMaterialsError,
  postMaterialsRequest,
  postMaterialsSuccess,
  postMaterialsError,
  putMaterialsRequest,
  putMaterialsSuccess,
  putMaterialsError,
  deleteMaterialsRequest,
  deleteMaterialsSuccess,
  deleteMaterialsError
} = actions;

export function getMaterials(options = {}) {
  return async (dispatch) => {
    try {
      const { locale, params, itemsPerPage, order } = options;

      dispatch(getMaterialsRequest());

      let apiUrl = "api/materials?type[]=ARTICLE&type[]=NEWS&type[]=REVIEW";

      if (locale) {
        apiUrl += `&locale=${locale}`;
      }
      if (params) {
        Object.keys(params).forEach((field) => {
          apiUrl += `&${field}=${params[field]}`;
        });
      }
      if (order) {
        Object.keys(order).forEach((field) => {
          if (order[field]) {
            apiUrl += `&order[${field}]=${order[field]}`;
          }
        });
      }
      if (!isNaN(itemsPerPage)) {
        apiUrl += `&itemsPerPage=${itemsPerPage}`;
      }

      const response = await apiService.get(apiUrl);
      dispatch(getMaterialsSuccess(response));
    } catch (error) {
      dispatch(getMaterialsError(error));
      throw error;
    }
  };
}

export function postMaterials(materialField, setErrors) {
  return async (dispatch) => {
    const material = await mapFieldToData(materialField);
    try {
      dispatch(postMaterialsRequest());
      const { data } = await apiService.post("api/materials", material, { useURLLanguage: false});
      await postEventScheduleListAsync(material['eventSchedulesList'], data);
      dispatch(postMaterialsSuccess({
        data,
        messages: [{
          message: "add.toast.success"
        }]
      }));
      getMaterials();
    } catch (error) {
      setErrors(mapErrorsToFields(error.messages));
      dispatch(postMaterialsError(error));
      throw error;
    }
  };
}

export function putMaterials(materialField, setErrors) {
  return async (dispatch) => {
    const material = await mapFieldToData(materialField);
    const { "@id": id } = material;
    try {
      dispatch(putMaterialsRequest());
      const { data } = await apiService.put(id, material);
      await postEventScheduleListAsync(material['eventSchedulesList'], data);
      dispatch(putMaterialsSuccess({
        data,
        messages: [{
          message: "edit.toast.success"
        }]
      }));
      getMaterials();
    } catch (error) {
      setErrors(mapErrorsToFields(error.messages));
      dispatch(putMaterialsError(error));
      throw error;
    }
  };
}

export function deleteMaterials(material) {
  return async (dispatch) => {
    const { "@id": id } = material;
    try {
      dispatch(deleteMaterialsRequest());
      await apiService.delete(id, material);
      dispatch(deleteMaterialsSuccess({
        data: material,
        messages: [{
          message: "delete.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(deleteMaterialsError(error));
      throw error;
    }
  };
}
