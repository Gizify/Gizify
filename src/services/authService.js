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
  const response = await axios.post(`${API_URL}/auth/complete-data`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addConsumptionFromBarcode = async ({ barcode, portion_size = 1, userTimeZone = "Asia/Jakarta", token }) => {
  const response = await axios.post(
    `${API_URL}/user/add-consumption`,
    { barcode, portion_size, userTimeZone },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
