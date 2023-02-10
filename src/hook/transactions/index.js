import { useQuery } from "react-query";
import client from "../../access/baseService";
import { CATCH } from "../../config/CatchQuery";

export function useTransactions() {
  return useQuery([CATCH.transaction], () =>
    client.get(`/transactions`).then((res) => res)
  );
}
