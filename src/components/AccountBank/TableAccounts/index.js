import { Box, Text } from "@chakra-ui/react";

import { useContext, useMemo } from "react";
import { AppContext } from "../../../context/AppContext";
import TotalMoney from "../../../util/TotalMoney";
import ReactTable from "../../common/Table";

const TableAccounts = () => {
  const { listAccount, ConversionUnit } = useContext(AppContext);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "",
        sticky: "left",
        width: 40,

        Cell: ({
          cell: {
            row: { index },
          },
        }) => <Text>{(index + 1).toString()}</Text>,
      },
      {
        Header: "Source",
        accessor: "source",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <Text fontSize={14} fontWeight={500}>
            {original.source}
          </Text>
        ),
      },
      {
        Header: "Account",
        accessor: "account",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <Text fontSize={14} fontWeight={500}>
            {original.account}
          </Text>
        ),
      },
      {
        Header: "Balance VND",
        accessor: "balancevnd",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <Text fontSize={14} fontWeight={500}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(original.balanceVND)}
          </Text>
        ),
      },
      {
        Header: "Balance USD",
        accessor: "balanceusd",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <Text fontSize={14} fontWeight={500}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(original.balanceUSD)}
          </Text>
        ),
      },
      {
        Header: "Total",
        accessor: "total",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <Text fontSize={14} fontWeight={500}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              ConversionUnit * original.balanceUSD + original.balanceVND
            )}
          </Text>
        ),
      },
    ],
    [ConversionUnit]
  );

  return (
    <Box>
      <ReactTable columns={columns} data={listAccount?.data} />
      <Text textAlign="end" mr="10px">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(TotalMoney(listAccount))}
      </Text>
    </Box>
  );
};
export default TableAccounts;
