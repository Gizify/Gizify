import axios from "axios";
import { API_URL } from "@env";

export const register = async (email, password, name) => {
  const response = await axios.post(`${API_URL}/auth/regis`, { email, password, name });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const completeProfile = async (profileData, token) => {
  const response = await axios.post(`${API_URL}/auth/complete-profile`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
