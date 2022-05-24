import { INIT_PRODUCTS } from "../actionTypes/productsAT";
const initialState = { products: [] };

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PRODUCTS:
      return { ...state, products: action.payload };

    default:
      return state;
  }
};
