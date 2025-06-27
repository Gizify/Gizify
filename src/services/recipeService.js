import axios from "axios";
import { API_URL } from "@env";

export const recipeApi = {
  async getAllRecipes() {
    const response = await axios.get(`${API_URL}/recipe`);
    return response.data;
  },

  async generateRecipe(recipeData, token) {
    const response = await axios.post(`${API_URL}/user/generate`, recipeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async fetchNutritionService(payload, token) {
    const res = await axios.post(`${API_URL}/user/analyst`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
