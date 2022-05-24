import { initBasketAC } from "../actionCreators/basketAC";
export const fetchInitBasket = (payload) => {
  return (dispatch) => {
    fetch("/api/basket", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(initBasketAC(data));
      })
      .catch((err) => console.log(err.message));
  };
};

export const fetchDelItems = (payload) => {
  return (dispatch) => {
    fetch("/api/basket/del", {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.log(err.message));
  };
};

export const fetchBuyItems = (payload) => {
  return () => {
    fetch("/api/basket/buy", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 201) {
          const div = document.querySelector(".payMess");

          div.insertAdjacentHTML(
            "afterend",
            '<div class="alert alert-success mess" role="alert"><center>Успешно</center></div>'
          );
          setTimeout(() => {
            const delDiv = document.querySelector(".mess");
            delDiv.remove();
            window.location.href = "http://localhost:3000";
          }, 1000);
        }
      })
      .catch((err) => console.log(err.message));
  };
};

