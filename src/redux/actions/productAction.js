import { fetchProductByBarcode } from "../../services/productService";

export const fetchProduct = (barcode) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_PRODUCT_REQUEST" });

    const productData = await fetchProductByBarcode(barcode);

    dispatch({
      type: "FETCH_PRODUCT_SUCCESS",
      payload: productData,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "FETCH_PRODUCT_FAILURE",
      payload: error.response?.message || "Failed to fetch product",
    });
    throw error;
  }
};
