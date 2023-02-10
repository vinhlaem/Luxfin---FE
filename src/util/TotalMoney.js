import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function TotalMoney(array) {
  const { ConversionUnit } = useContext(AppContext);

  const arrVND = [];
  const arrUSD = [];

  array?.data.filter(
    (data) => arrVND.push(data.balanceVND) && arrUSD.push(data.balanceUSD)
  );

  const totalVND = arrVND.reduce(function (acc, val) {
    return acc + val;
  });
  const totalUSD = arrUSD.reduce(function (acc, val) {
    return acc + val;
  });

  const result = ConversionUnit * totalUSD + totalVND;

  return result;
}
