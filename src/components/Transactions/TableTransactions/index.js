import { Box, Text } from "@chakra-ui/react";
import moment from "moment";

import { useContext, useMemo } from "react";
import { AppContext } from "../../../context/AppContext";

import IncreaseItem from "../../common/IncreaseItem";
import ReactTable from "../../common/Table";

const TableTransactions = () => {
  const { listTransactions, listAccount } = useContext(AppContext);

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
            {
              listAccount?.data.find(
                (element) => element.id === original.accountId
              )?.source
            }
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
            {/* {original.accountId} */}
            {
              listAccount?.data.find(
                (element) => element.id === original.accountId
              )?.account
            }
          </Text>
        ),
      },
      {
        Header: "Amount VND",
        accessor: "amountVND",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <IncreaseItem
            isIncrease={original.type === "in"}
            percent={original.amountVND}
            currency="VND"
            type="vi-VN"
          />
        ),
      },
      {
        Header: "amount USD",
        accessor: "amountUSD",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <IncreaseItem
            isIncrease={original.type === "in"}
            percent={original.amountUSD}
            currency="USD"
            type="en-us"
          />
        ),
      },
      {
        Header: "Reason",
        accessor: "reason",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <Text fontSize={14} fontWeight={500}>
            {original.reason}
          </Text>
        ),
      },
      {
        Header: "Type",
        accessor: "type",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <Text fontSize={14} fontWeight={500}>
            {original.type}
          </Text>
        ),
      },
      {
        Header: "Date",
        accessor: "date",

        Cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <Text fontSize={14} fontWeight={500}>
            {moment(original.createdAt).format("MMMM D YYYY, hh:mm A")}
          </Text>
        ),
      },
    ],
    [listAccount?.data]
  );

  return (
    <Box>
      <ReactTable columns={columns} data={listTransactions?.data} />
    </Box>
  );
};
export default TableTransactions;
