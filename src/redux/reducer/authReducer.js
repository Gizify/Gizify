const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
    case "LOGIN_REQUEST":
    case "PROFILE_UPDATE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
      };

    case "PROFILE_UPDATE_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };

    case "REGISTER_FAILURE":
    case "LOGIN_FAILURE":
    case "PROFILE_UPDATE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
