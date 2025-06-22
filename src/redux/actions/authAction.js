import * as authApi from "../../services/authService";

// Register user
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
      payload: error.response?.data?.message || "Registration failed"
    });
    throw error;
  }
};

// Login user
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

// Lengkapi profil user setelah registrasi
export const completeUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PROFILE_UPDATE_REQUEST" });

    const { token, user: oldUserData } = getState().auth;
    const { user: updatedUser, message } = await authApi.completeProfile(profileData, token);

    const mergedUser = {
      ...oldUserData,
      ...updatedUser,
      photoOption: updatedUser.photoOption ?? oldUserData.photoOption,
      gestational_age: updatedUser.gestational_age ?? oldUserData.gestational_age,
      medical_history: updatedUser.medical_history ?? oldUserData.medical_history,
      birthdate: updatedUser.birthdate ?? oldUserData.birthdate, // make sure birthdate is merged
      activity: updatedUser.activity ?? oldUserData.activity, // match naming
    };

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

// Logout user
export const logoutUser = () => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

// Update profil user (misalnya edit setelah registrasi)
export const updateUserProfile = (updatedData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PROFILE_UPDATE_REQUEST" });

    const { token, user: oldUserData } = getState().auth;
    const { user: updatedUser, message } = await authApi.updateProfile(updatedData, token);

    const mergedUser = {
      ...oldUserData,
      ...updatedUser,
      photoOption: updatedUser.photoOption ?? oldUserData.photoOption,
      gestational_age: updatedUser.gestational_age ?? oldUserData.gestational_age,
      medical_history: updatedUser.medical_history ?? oldUserData.medical_history,
      birthdate: updatedUser.birthdate ?? oldUserData.birthdate, // make sure birthdate is merged
      activity: updatedUser.activity ?? oldUserData.activity, // match naming
    };

    dispatch({
      type: "PROFILE_UPDATE_SUCCESS",
      payload: { mergedUser, message },
    });
  } catch (error) {
    dispatch({
      type: "PROFILE_UPDATE_FAILURE",
      payload: error.response?.data?.message || "Failed to update profile",
    });
    throw error;
  }
};

// Tambah konsumsi makanan manual
export const addConsumption =
  (source, source_id, portion_size = 1, userTimeZone = "Asia/Jakarta", token) =>
    async (dispatch) => {
      try {
        dispatch({ type: "ADD_CONSUMPTION_REQUEST" });

        const response = await authApi.addConsumption({
          source,
          source_id,
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
        console.error(error);
        dispatch({
          type: "ADD_CONSUMPTION_FAILURE",
          payload: error.response?.data?.message || "Gagal menambahkan konsumsi",
        });
        throw error;
      }
    };

// Tambah konsumsi berdasarkan barcode
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

// Hapus akun user
export const deleteAccount = (token) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ACCOUNT_REQUEST" });

    const response = await authApi.deleteUser(token);

    dispatch({
      type: "DELETE_ACCOUNT_SUCCESS",
      payload: response.data.message,
    });

    dispatch({ type: "LOGOUT" });
  } catch (error) {
    dispatch({
      type: "DELETE_ACCOUNT_FAILURE",
      payload: error.response ? error.response.data : error.message,
    });
  }
};