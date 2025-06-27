import { recipeApi } from "../../services/recipeService";

export const fetchRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_RECIPES_REQUEST" });

    const data = await recipeApi.getAllRecipes();

    dispatch({
      type: "FETCH_RECIPES_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "FETCH_RECIPES_FAILURE",
      payload: error.response?.data?.message || "Failed to fetch recipes",
    });
    throw error;
  }
};

export const generateRecipe = (recipeData, token) => async (dispatch) => {
  try {
    dispatch({ type: "GENERATE_RECIPE_REQUEST" });

    const response = await recipeApi.generateRecipe(recipeData, token);

    dispatch({
      type: "GENERATE_RECIPE_SUCCESS",
      payload: response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "GENERATE_RECIPE_FAILURE",
      payload: error.response?.data?.message || "Failed to generate recipe",
    });
    throw error;
  }
};

export const fetchNutrition = (payload, token) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_NUTRITION_REQUEST" });

    const data = await recipeApi.fetchNutritionService(payload, token);

    dispatch({
      type: "FETCH_NUTRITION_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_NUTRITION_FAILURE",
      payload: error.response?.data?.error || "Terjadi kesalahan saat mengambil data nutrisi",
    });
  }
};
