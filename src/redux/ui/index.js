const initialState = {
  get: {
    loading: false,
    error: [],
    success: []
  },
  post: {
    loading: false,
    error: [],
    success: []
  },
  put: {
    loading: false,
    error: [],
    success: []
  },
  delete: {
    loading: false,
    error: [],
    success: []
  }
};

const types = ["request", "success", "error"];

function createType({ method, module, type }) {
  return {
    key: `${method}_${module}_${type}`.toUpperCase(),
    value: `${module}/${method}-${module}-${type}`
  }
}

function createTypes(module) {
  return Object.keys(initialState).reduce((obj, method) => {
    return {
      ...obj,
      ...types.reduce((obj, type) => {
        const { key, value } = createType({
          method,
          module,
          type
        });

        return {
          ...obj,
          [key]: value
        };
      }, {})
    }
  }, {});
}

function createActions(types) {
  return Object.keys(types).reduce((obj, type) => {
    const name = types[type].replace(/^.*\//, "");
    const key = name.replace(/-([a-z])/g, (g) => {
      return g[1].toUpperCase();
    });

    return {
      ...obj,
      [key]: (payload) => {
        return {
          type: types[type],
          payload
        }
      }
    }
  }, {});
}

export default function createReducer(module) {
  const actionTypes = createTypes(module);
  const actions = createActions(actionTypes);

  function reducer(state = initialState, actions) {
    const [method] = actions.type.replace(/^(.*)\//, "").split("-");

    switch (actions.type) {
      case createType({ method, module, type: "request" }).value: {
        return {
          ...state,
          [method]: {
            loading: true,
            error: [],
            success: []
          }
        };
      }
      case createType({ method, module, type: "success" }).value: {
        const messages = actions.payload.messages || [];

        return {
          ...state,
          [method]: {
            ...state[method],
            loading: false,
            success: [...messages]
          }
        };
      }
      case createType({ method, module, type: "error" }).value: {
        const messages = actions.payload.messages || [];

        return {
          ...state,
          [method]: {
            ...state[method],
            loading: false,
            error: [...messages]
          }
        };
      }
      default:
        return state;
    }
  };

  return {
    types: actionTypes,
    actions,
    reducer
  };
}