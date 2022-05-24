import { INIT_BASKET } from "../actionTypes/basketAT";
export const initBasketAC = (payload) => {
  return {
    type: INIT_BASKET,
    payload,
  };
};

