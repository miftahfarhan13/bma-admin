import {
  Box,
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
import React from "react";

export default function TopPerformanceCar() {
  return (
    <Stack direction="column" spacing="10px">
      <Text fontWeight="700">Top Performance Car</Text>
      <SimpleGrid columns={[1, 1, 2, 2]} gap="20px">
        <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Most View Car</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Civic TC RS 1.5 AT 2022</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Civic TC RS 1.5 AT 2022</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>Civic TC RS 1.5 AT 2022</Td>
                  <Td isNumeric>100</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Most Bided Car</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Civic TC RS 1.5 AT 2022</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Civic TC RS 1.5 AT 2022</Td>
                  <Td isNumeric>100</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>Civic TC RS 1.5 AT 2022</Td>
                  <Td isNumeric>100</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleGrid>
    </Stack>
  );
}
