import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getEventsRequest,
  getEventsSuccess,
  getEventsError,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventError,
} = actions;

export function getEvents(options = {}) {
  return async (dispatch) => {
    try {
      const { locale, params, itemsPerPage, order } = options;

      dispatch(getEventsRequest());

      let apiUrl = "api/materials?type=EVENT";

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
          apiUrl += `&order[${field}]=${order[field]}`;
        });
      }
      if (!isNaN(itemsPerPage)) {
        apiUrl += `&itemsPerPage=${itemsPerPage}`;
      }

      const response = await apiService.get(apiUrl);
      dispatch(getEventsSuccess(response));
    } catch (error) {
      dispatch(getEventsError(error));
      throw error;
    }
  };
}

export function deleteEvent(event) {
  return async (dispatch) => {
    const { "@id": id } = event;
    try {
      dispatch(deleteEventRequest());
      await apiService.delete(id, event);
      dispatch(
        deleteEventSuccess({
          data: event,
          messages: [
            {
              message: "delete.toast.success",
            },
          ],
        }),
      );
    } catch (error) {
      dispatch(deleteEventError(error));
      throw error;
    }
  };
}
