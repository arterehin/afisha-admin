import { types as actionTypes } from "../ui";

const initialState = [];

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.GET_EVENT_SCHEDULE_SUCCESS: {
      return actions.payload.data;
    }

    case actionTypes.POST_EVENT_SCHEDULE_SUCCESS: {
      return [
        ...state,
        actions.payload.data
      ];
    }

    case actionTypes.PUT_EVENT_SCHEDULE_SUCCESS: {
      const { "@id": id } = actions.payload.data;

      return state.map((item) => {
        return item["@id"] === id ? actions.payload.data : item;
      });
    }

    case actionTypes.DELETE_EVENT_SCHEDULE_SUCCESS: {
      const { "@id": id } = actions.payload.data;

      return state.filter((item) => item["@id"] !== id);
    }

    default:
      return state;
  }
};