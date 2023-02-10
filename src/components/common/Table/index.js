import React from "react";
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { useTable } from "react-table";
import { v4 as uuidv4 } from "uuid";

export default function ReactTable({
  columns = [],
  data = [],
  isRedirect = false,
  h,
  padding,

  isConvert,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    });

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table {...getTableProps()} variant="unstyled">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr h={h} key={uuidv4()} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => {
                  return (
                    <Th
                      key={i}
                      padding="16px 10px"
                      isNumeric={column.isNumeric}
                      textTransform="unset"
                      fontSize="16px"
                      className="table-th"
                      background="inherit"
                      bg="#9dc6f1"
                      title=""
                    >
                      <Flex
                        alignItems="center"
                        justifyContent={isConvert ? "center" : "unset"}
                      >
                        <Text
                          fontSize={13}
                          fontWeight={500}
                          mr={column.render("Header") === "#" ? "10px" : "0px"}
                        >
                          {column.render("Header")}
                        </Text>
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody zIndex={0} {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);

              return (
                <Tr
                  key={uuidv4()}
                  {...row.getRowProps()}
                  h={h}
                  bg={index % 2 === 0 ? "white" : "#9dc6f1"}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <Td
                        key={i}
                        justifyContent="center"
                        padding={padding || "17px 10px"}
                        {...cell.getCellProps()}
                        cursor={isRedirect ? "pointer" : "unset"}
                        background="inherit"
                      >
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
