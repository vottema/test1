import { INIT_BASKET, UPDATE_BASKET } from "../actionTypes/basketAT";
const initialState = { items: [], checkItems: [] };

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BASKET:
      return { ...state, items: action.payload.allItems, checkItems: action.payload.data };
    case UPDATE_BASKET:
      return {...state, items: [...state.items, action.payload]}
    default:
      return state;
  }
};
