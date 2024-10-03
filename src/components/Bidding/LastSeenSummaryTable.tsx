import useGetLastSeenSummaryByCarId from "@/utils/hooks/car/useGetLastSeenSummaryByCarId";
import {
  Box,
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

export default function LastSeenSummaryTable({ carId }: { carId: string }) {
  const { data } = useGetLastSeenSummaryByCarId({ carId });

  return (
    <Stack direction="column" spacing="10px">
      <Text fontWeight="700" fontSize="18px">
        Summary Views
      </Text>
      <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Dealer</Th>
                <Th>BD</Th>
                <Th>Total View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((car: any, index: number) => (
                <Tr key={car?.id}>
                  <Td>{index + 1}</Td>
                  <Td>{car?.name}</Td>
                  <Td>{car?.business_name}</Td>
                  <Td>{car?.total_seen}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
