import * as authApi from "../../services/authService";

export const registerUser = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });
    const { token, message, user, expiredAt } = await authApi.register(email, password, name);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: { token, message, user, expiredAt },
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response?.message || "Registration failed",
    });
    throw error;
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const { token, user, message, expiredAt } = await authApi.login(email, password);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { token, user, message, expiredAt },
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.message || "Login failed",
    });
    throw error;
  }
};

export const completeUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PROFILE_UPDATE_REQUEST" });

    const { token, user: oldUserData } = getState().auth;

    const { user, message } = await authApi.completeProfile(profileData, token);

    const mergedUser = { ...oldUserData, ...user };

    dispatch({
      type: "PROFILE_UPDATE_SUCCESS",
      payload: { mergedUser, message },
    });
  } catch (error) {
    dispatch({
      type: "PROFILE_UPDATE_FAILURE",
      payload: error.response?.data?.message || "Profile update failed",
    });
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

export const addConsumptionFromBarcode =
  (barcode, portion_size = 1, userTimeZone = "Asia/Jakarta", token) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ADD_CONSUMPTION_REQUEST" });

      const response = await authApi.addConsumptionFromBarcode({
        barcode,
        portion_size,
        userTimeZone,
        token,
      });

      dispatch({
        type: "ADD_CONSUMPTION_SUCCESS",
        payload: {
          todayStats: response.today_stats,
          todayMeals: response.today_meals,
          timezone: response.timezone,
        },
      });
    } catch (error) {
      console.error("Error adding consumption from barcode:", error);
      dispatch({
        type: "ADD_CONSUMPTION_FAILURE",
        payload: error.response?.data?.message || "Gagal menambahkan konsumsi",
      });
      throw error;
    }
  };
