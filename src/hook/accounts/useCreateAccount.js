import { useQuery } from "react-query";
import client from "../../access/baseService";
import { CATCH } from "../../config/CatchQuery";

export function useAccounts({ values }) {
  return useQuery([CATCH.createAccount], () =>
    client
      .post(`/create-account`, {
        source: values.bankname,
        account: values.accountnumber,
        balanceVND: values.balanceVND,
        balanceUSD: values.balanceUSD,
      })
      .then((res) => res)
  );
}
