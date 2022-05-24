import { INIT_PRODUCTS, ADD_ITEM } from "../actionTypes/productsAT";

export const initProductAC = (payload) => {
  return {
    type: INIT_PRODUCTS,
    payload,
  };
};
export const addItemAC = (payload) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};
