import { checkRatesAC } from "../actionCreators/ratesApiAC";

const myHeaders = new Headers();
myHeaders.append("apikey", "xFenVrdWwWDfeRR1vKyNNO1j0oActDOI");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export const fetchCheckRates = (payload) => {
  return (dispatch) => {
    fetch(
      "https://api.apilayer.com/exchangerates_data/convert?to=rub&from=usd&amount=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        dispatch(checkRatesAC(result.result))
      )
      .catch((error) => console.log("error", error));
  };
};
