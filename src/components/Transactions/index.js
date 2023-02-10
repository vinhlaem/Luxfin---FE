import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import LoadingSpinner from "../common/LoadingSpinner";
import ModalItem from "../common/ModalItem";
import AddTransaction from "./AddTransaction";
import TableTransactions from "./TableTransactions";

export default function Transactions() {
  const { isLoading } = useContext(AppContext);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Flex justifyContent="center">
      <Box>
        <Text textAlign="center">Transactions</Text>
        {isLoading ? <LoadingSpinner /> : <TableTransactions />}

        <Button onClick={() => onToggle()}>Add more Transactions</Button>
        <ModalItem
          onClose={onClose}
          isOpen={isOpen}
          maxW={{ base: "287px", sm: "574px" }}
        >
          <AddTransaction onclose={onClose} />
        </ModalItem>
      </Box>
    </Flex>
  );
}
