import { createContext } from "react";
import { useQuery } from "react-query";
import { useAccounts } from "../hook/accounts/useAccount";
import { useTransactions } from "../hook/transactions";
import { ConvertMoney } from "../util/ConvertMoney";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { data: listAccount, refetch: refetchdata, isLoading } = useAccounts();
  const { data: listTransactions, refetch: refetchTransactions } =
    useTransactions();

  const { data: ConversionUnit } = useQuery("currency", ConvertMoney);

  const value = {
    listAccount,
    ConversionUnit,
    listTransactions,
    refetchdata,
    isLoading,
    refetchTransactions,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
