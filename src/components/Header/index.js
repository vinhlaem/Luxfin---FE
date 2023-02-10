import { Box, Flex, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box p="10px">
      <Flex justifyContent="center">
        <Text fontSize="20px" fontWeight={600}>
          Luxfin
        </Text>
      </Flex>
    </Box>
  );
}
