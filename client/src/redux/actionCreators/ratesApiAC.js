import { CHECK_RATES } from "../actionTypes/ratesApiAT";
export const checkRatesAC = (payload) => {
  return {
    type: CHECK_RATES,
    payload,
  };
};
