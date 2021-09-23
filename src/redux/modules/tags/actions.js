import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getTagsRequest,
  getTagsSuccess,
  getTagsError,
  postTagsRequest,
  postTagsSuccess,
  postTagsError,
  putTagsRequest,
  putTagsSuccess,
  putTagsError,
  deleteTagsRequest,
  deleteTagsSuccess,
  deleteTagsError
} = actions;

export function getTags() {
  return async (dispatch) => {
    try {
      dispatch(getTagsRequest());
      const response = await apiService.get("api/tags?page=1");
      dispatch(getTagsSuccess(response));
    } catch (error) {
      dispatch(getTagsError(error));
      throw error;
    }
  };
}

export function postTags(tag) {
  return async (dispatch) => {
    try {
      dispatch(postTagsRequest());
      const { data } = await apiService.post("api/tags", tag);
      dispatch(postTagsSuccess({
        data,
        messages: [{
          message: "add.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(postTagsError(error));
      throw error;
    }
  };
}

export function putTags(tag) {
  return async (dispatch) => {
    const { "@id": id } = tag;
    try {
      dispatch(putTagsRequest());
      const { data } = await apiService.put(id, tag);
      dispatch(putTagsSuccess({
        data,
        messages: [{
          message: "edit.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(putTagsError(error));
      throw error;
    }
  };
}

export function deleteTags(tag) {
  return async (dispatch) => {
    const { "@id": id } = tag;
    try {
      dispatch(deleteTagsRequest());
      await apiService.delete(id, tag);
      dispatch(deleteTagsSuccess({
        data: tag,
        messages: [{
          message: "delete.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(deleteTagsError(error));
      throw error;
    }
  };
}