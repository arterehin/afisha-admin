import * as actionTypes from "./constants";

const initialState = [];

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.ADD_CITIES: {
      return actions.payload;
    }
    case actionTypes.ADD_CITY: {
      return [
        ...state,
        actions.payload
      ];
    }
    case actionTypes.UPDATE_CITY: {
      const { "@id" : id } = actions.payload;

      return state.map((item) => {
        return item["@id"] === id ? actions.payload : item;
      });
    }
    case actionTypes.REMOVE_CITY: {
      const { city } = actions.payload;

      return state.filter((item) => item["@id"] !== city);
    }
    default:
      return state;
  }
}
