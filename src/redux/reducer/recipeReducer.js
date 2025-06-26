const initialState = {
  recipes: [],
  loading: false,
  error: null,
  aiRecipe: null,
  aiLoading: false,
  aiError: null,
  upLoading: false,
  upRecipe: null,
  upError: null,
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
    case "FETCH_NUTRITION_REQUEST":
      return {
        ...state,
        upLoading: true,
        upError: null,
      };
    case "FETCH_NUTRITION_SUCCESS":
      return {
        ...state,
        upLoading: false,
        upRecipe: action.payload,
      };
    case "FETCH_NUTRITION_FAILURE":
      return {
        ...state,
        upLoading: false,
        upError: action.payload,
      };
    default:
      return state;
  }
};
