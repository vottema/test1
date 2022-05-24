import { CHECK_RATES } from "../actionTypes/ratesApiAT";

const initialState = { rates: [] };

export const ratesApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_RATES:
      return { rates: action.payload };

    default:
      return state;
  }
};
