import axios from "axios";
import { API_URL } from "@env";

// Melakukan registrasi user baru
export const register = async (email, password, name) => {
  const response = await axios.post(`${API_URL}/auth/regis`, { email, password, name });
  return response.data;
};

// Login user untuk mendapatkan token dan data user
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

// Melengkapi data profil awal user setelah register/login
export const completeProfile = async (profileData, token) => {
  const response = await axios.post(`${API_URL}/auth/complete-data`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Mengupdate data profil user dari EditProfileScreen
export const updateProfile = async (updatedData, token) => {
  const response = await axios.patch(`${API_URL}/auth/update-profile`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Menambahkan konsumsi makanan/minuman ke riwayat user
export const addConsumption = async ({ source, source_id, portion_size = 1, userTimeZone = "Asia/Jakarta", token }) => {
  const response = await axios.post(
    `${API_URL}/user/consumption`,
    { source, source_id, portion_size, userTimeZone },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Menambahkan konsumsi berdasarkan scan barcode
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

// Menghapus akun user secara permanen
export const deleteUser = async (token) => {
  const response = await axios.delete(`${API_URL}/user/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};