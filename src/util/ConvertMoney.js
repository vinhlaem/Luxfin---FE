import Axios from "axios";
export const ConvertMoney = async () => {
  const { data } = await Axios.get(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"
  );
  return data.usd.vnd;
};
