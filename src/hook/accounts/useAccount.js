import { useQuery } from "react-query";
import client from "../../access/baseService";
import { CATCH } from "../../config/CatchQuery";

export function useAccounts() {
  return useQuery([CATCH.accounts], () =>
    client.get(`/accounts`).then((res) => res)
  );
}
