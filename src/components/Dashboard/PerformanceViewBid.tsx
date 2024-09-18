import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function PerformanceViewBid() {
  return (
    <Stack direction="column" spacing="10px">
      <Text fontWeight="700">Performance Views & Bids</Text>
      <InputGroup w="300px">
        <InputLeftElement pointerEvents="none">
          <Icon icon="bx:search" />
        </InputLeftElement>
        <Input placeholder="Search.." />
      </InputGroup>
      <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Dealers</Th>
                <Th>BD</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Bids</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Dealer A</Td>
                <Td>BD A</Td>
                <Td isNumeric>20 (20%)</Td>
                <Td isNumeric>20 (20%)</Td>
              </Tr>
              <Tr>
                <Td>Dealer A</Td>
                <Td>BD A</Td>
                <Td isNumeric>20 (20%)</Td>
                <Td isNumeric>20 (20%)</Td>
              </Tr>
              <Tr>
                <Td>Dealer A</Td>
                <Td>BD A</Td>
                <Td isNumeric>20 (20%)</Td>
                <Td isNumeric>20 (20%)</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
