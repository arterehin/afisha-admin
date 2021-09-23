import apiService from "@services/apiService";
import axios from "axios";
import { actions } from "./ui";

const {
  getUsersRequest,
  getUsersSuccess,
  getUsersError,
  postUsersRequest,
  postUsersSuccess,
  postUsersError,
  putUsersRequest,
  putUsersSuccess,
  putUsersError,
  deleteUsersRequest,
  deleteUsersSuccess,
  deleteUsersError
} = actions;

let cancel;

export function getUsers(params = {}) {
  return async (dispatch) => {
    try {
      dispatch(getUsersRequest());

      cancel && cancel();

      if (typeof params === "undefined") {
        params = {};
      }

      const response = await apiService.get("api/users?groups[]=user:translations", {
        cancelToken: new axios.CancelToken((c) => cancel = c),
        params
      });

      dispatch(getUsersSuccess(response));
    } catch (error) {
      if (!axios.isCancel(error)) {
        dispatch(getUsersError(error));
        throw error;
      }
    }
  };
}

export function postUser(user) {
  return async (dispatch) => {
    try {
      dispatch(postUsersRequest());
      const { data } = await apiService.post("api/users", user);
      dispatch(postUsersSuccess({
        data,
        messages: [{
          message: "add.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(postUsersError(error));
      throw error;
    }
  };
}

export function updateUser(user) {
  return async (dispatch) => {
    const { "@id": id } = user;
    try {
      dispatch(putUsersRequest());
      const { data } = await apiService.put(id, user);
      dispatch(putUsersSuccess({
        data,
        messages: [{
          message: "edit.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(putUsersError(error));
      throw error;
    }
  };
}

export function deleteUser(user) {
  return async (dispatch) => {
    const { "@id": id } = user;
    try {
      dispatch(deleteUsersRequest());
      await apiService.delete(id, user);
      dispatch(deleteUsersSuccess({
        data: user,
        messages: [{
          message: "delete.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(deleteUsersError(error));
      throw error;
    }
  };
}