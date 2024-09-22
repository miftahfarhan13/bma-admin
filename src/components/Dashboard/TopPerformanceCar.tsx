import useGetMostBidedCar from "@/utils/hooks/dashboard/useGetMostBidedCar";
import useGetMostViewedCar from "@/utils/hooks/dashboard/useGetMostViewedCar";
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
  const { data: mostViewedCar } = useGetMostViewedCar();
  const { data: mostBidedCar } = useGetMostBidedCar();
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
                {mostViewedCar?.map((viewed: any) => (
                  <Tr>
                    <Td>{viewed?.rank}</Td>
                    <Td>{viewed?.car_name}</Td>
                    <Td isNumeric>{viewed?.count}</Td>
                  </Tr>
                ))}
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
                {mostBidedCar?.map((bided: any) => (
                  <Tr>
                    <Td>{bided?.rank}</Td>
                    <Td>{bided?.car_name}</Td>
                    <Td isNumeric>{bided?.count}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </SimpleGrid>
    </Stack>
  );
}
