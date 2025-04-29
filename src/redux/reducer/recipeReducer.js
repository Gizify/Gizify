const initialState = {
  loading: false,
  recipes: [],
  aiRecipe: null,
  error: null,
  aiLoading: false,
  aiError: null,
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
    case "GENERATE_RECIPE_REQUEST":
      return { ...state, aiLoading: true, error: null };

    case "GENERATE_RECIPE_SUCCESS":
      return {
        ...state,
        aiLoading: false,
        aiRecipe: action.payload,
        aiError: null,
      };

    case "GENERATE_RECIPE_FAILURE":
      return {
        ...state,
        aiLoading: false,
        aiError: action.payload,
      };
    case "FETCH_RECIPES_FAILURE":
      return {
        ...state,
        aiLoading: false,
        aiError: action.payload,
      };
    default:
      return state;
  }
};
