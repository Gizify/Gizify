const initialState = {
  loading: false,
  recipes: [],
  error: null,
};

export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RECIPES_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_RECIPES_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
    case "FETCH_RECIPES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
