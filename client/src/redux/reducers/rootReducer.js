import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { basketReducer } from "./basketReducer";
import { ratesApiReducer } from "./ratesApiReducer";

export const rootReducer = combineReducers({
  productsReducer,
  basketReducer,
  ratesApiReducer,
});
