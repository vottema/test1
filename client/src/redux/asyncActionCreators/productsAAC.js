import { updateBasketAC } from "../actionCreators/basketAC";
import { initProductAC } from "../actionCreators/productsAC";
export const fetchInitProducts = (payload) => {
  return (dispatch) => {
    fetch("/product", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(initProductAC(data));
      })
      .catch((err) => console.log(err.message));
  };
};


export const fetchAddItem = (payload) => {
  return (dispatch) => {
    fetch("/product", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(payload),
    })
  };
};
