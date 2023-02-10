import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";
import LoadingSpinner from "../common/LoadingSpinner";
import ModalItem from "../common/ModalItem";

import AddAccount from "./AddAccount";
import TableAccounts from "./TableAccounts";

export default function AccountBank() {
  const { isLoading } = useContext(AppContext);
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Flex justifyContent="center">
      <Box>
        <Text textAlign="center">AccountBank</Text>
        {isLoading ? <LoadingSpinner /> : <TableAccounts />}

        <Button onClick={() => onToggle()}>Add more Account</Button>
        <ModalItem
          onClose={onClose}
          isOpen={isOpen}
          maxW={{ base: "287px", sm: "574px" }}
        >
          <AddAccount onclose={onClose} />
        </ModalItem>
      </Box>
    </Flex>
  );
}
