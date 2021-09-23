import { types as actionTypes } from "../ui";

const initialState = [];

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.GET_EDITPLACEATTRIBUTES_SUCCESS: {
      return actions.payload.data;
    }

    case actionTypes.POST_EDITPLACEATTRIBUTES_SUCCESS: {
      return [
        ...state,
        actions.payload.data
      ];
    }

    case actionTypes.PUT_EDITPLACEATTRIBUTES_SUCCESS: {
      const { "@id": id } = actions.payload.data;

      return state.map((item) => {
        return item["@id"] === id ? actions.payload.data : item;
      });
    }

    case actionTypes.DELETE_EDITPLACEATTRIBUTES_SUCCESS: {
      const { "@id": id } = actions.payload.data;

      return state.filter((item) => item["@id"] !== id);
    }

    default:
      return state;
  }
};