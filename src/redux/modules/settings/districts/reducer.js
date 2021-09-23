import * as actionTypes from "./constants";

const initialState = {
  loading: {
    state: false,
    city: '',
  },
  locales: {},
  data: {}
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case actionTypes.LOADING_START: {
      return {
        ...state,
        loading: {
          state: true,
          city: actions.payload
        }
      };
    }
    case actionTypes.LOADING_END: {
      return {
        ...state,
        loading: {
          state: false,
          city: ''
        }
      };
    }
    case actionTypes.ADD_DISTRICTS: {
      const { city, data, locale } = actions.payload;

      return {
        ...state,
        locales: {
          ...state.locales,
          [city]: locale
        },
        data: {
          ...state.data,
          [city]: data
        }
      };
    }
    case actionTypes.ADD_DISTRICT: {
      const { city } = actions.payload;

      return {
        ...state,
        data: {
          ...state.data,
          [city]: [
            ...state.data[city],
            actions.payload
          ]
        }
      };
    }
    case actionTypes.UPDATE_DISTRICT: {
      const { "@id": id, city } = actions.payload;

      const currentCity = Object.keys(state.data).find((key) => {
        return state.data[key].find((item) => item["@id"] === id);
      });

      const filteredData = Object.assign({}, {
        ...state.data,
        [currentCity]: state.data[currentCity].filter((item) => item["@id"] !== id)
      });

      return {
        ...state,
        data: {
          ...filteredData,
          [city]: [
            ...(filteredData[city] ? filteredData[city] : []),
            actions.payload
          ]
        }
      };
    }
    case actionTypes.REMOVE_DISTRICT: {
      const { city, district } = actions.payload;

      return {
        ...state,
        data: {
          ...state.data,
          [city]: state.data[city].filter((item) => item["@id"] !== district)
        }
      };
    }
    case actionTypes.REMOVE_DISTRICTS: {
      const city = actions.payload;

      return {
        ...state,
        locales: {
          ...Object.keys(state.locales)
            .filter((key) => key !== city)
            .reduce((acc, key) => {
              acc[key] = state.locales[key]
              return acc;
            }, {})
        },
        data: {
          ...Object.keys(state.data)
            .filter((key) => key !== city)
            .reduce((acc, key) => {
              acc[key] = state.data[key]
              return acc;
            }, {})
        }
      };
    }
    default:
      return state;
  }
}
