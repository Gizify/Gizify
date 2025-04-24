import axios from "axios";
import { API_URL } from "@env";

export const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${API_URL}/products/scan/${barcode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
