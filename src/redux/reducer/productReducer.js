const initialState = {
  loading: false,
  product: null,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PRODUCT_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_PRODUCT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
