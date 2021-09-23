import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getEventScheduleRequest,
  getEventScheduleSuccess,
  getEventScheduleError,
  postEventScheduleRequest,
  postEventScheduleSuccess,
  postEventScheduleError,
  putEventScheduleRequest,
  putEventScheduleSuccess,
  putEventScheduleError,
  deleteEventScheduleRequest,
  deleteEventScheduleSuccess,
  deleteEventScheduleError
} = actions;

export function getEventSchedule() {
  return async (dispatch) => {
    try {
      dispatch(getEventScheduleRequest());
      const response = await apiService.get("api/event_schedules?page=1");
      dispatch(getEventScheduleSuccess(response));
    } catch (error) {
      dispatch(getEventScheduleError(error));
      throw error;
    }
  };
}

export const postEventScheduleListAsync =  async (eventScheduleList, material) => {
  for (let i = 0; i < eventScheduleList.length; i++) {
    eventScheduleList[i].event = material['@id'];
    await apiService.post("api/event_schedules", eventScheduleList[i]);
  }
}

export function postEventSchedule(event_schedule) {
  return async (dispatch) => {
    try {
      dispatch(postEventScheduleRequest());
      await apiService.post("api/event_schedules", event_schedule);
    } catch (error) {
      dispatch(postEventScheduleError(error));
      throw error;
    }
  };
}

export function putEventSchedule(event_schedule) {
  return async (dispatch) => {
    const { "@id": id } = event_schedule;
    try {
      dispatch(putEventScheduleRequest());
      const { data } = await apiService.put(id, event_schedule);
      dispatch(putEventScheduleSuccess({
        data,
        messages: [{
          message: "edit.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(putEventScheduleError(error));
      throw error;
    }
  };
}

export function deleteEventSchedule(event_schedule) {
  return async (dispatch) => {
    const { "@id": id } = event_schedule;
    try {
      dispatch(deleteEventScheduleRequest());
      await apiService.delete(id, event_schedule);
      dispatch(deleteEventScheduleSuccess({
        data: event_schedule,
        messages: [{
          message: "delete.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(deleteEventScheduleError(error));
      throw error;
    }
  };
}