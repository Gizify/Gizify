import * as authApi from "../../services/authService";
import { setItem } from "../../utils/asyncStorage";

export const registerUser = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });
    const { token, message, user } = await authApi.register(email, password, name);

    await setItem("authToken", token);
    await setItem("userData", JSON.stringify(user));

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: { token, message, user },
    });
  } catch (error) {
    console.log(error);
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
    const { token, user, message } = await authApi.login(email, password);

    await setItem("authToken", token);
    await setItem("userData", JSON.stringify(user));

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { token, user, message },
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
    const { token } = getState().auth;

    const { user, message } = await authApi.completeProfile(profileData, token);

    const oldUserData = await getItem("userData");
    const parsedOldUser = oldUserData ? JSON.parse(oldUserData) : {};

    const mergedUser = { ...parsedOldUser, ...user };

    await setItem("userData", JSON.stringify(mergedUser));

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
  await removeItem("authToken");
  await removeItem("userData");
  dispatch({ type: "LOGOUT" });
};
