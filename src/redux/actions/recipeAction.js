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
