import useGetMostBidedCar from "@/utils/hooks/dashboard/useGetMostBidedCar";
import useGetMostViewedCar from "@/utils/hooks/dashboard/useGetMostViewedCar";
import {
  Box,
  Input,
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
import Link from "next/link";
import React, { useState } from "react";

export default function TopPerformanceCar() {
  const [date, setDate] = useState("");

  const { data: mostViewedCar, refetch: refetchMostViewedCar } =
    useGetMostViewedCar({ date });
  const { data: mostBidedCar, refetch: refetchMostBidedCar } =
    useGetMostBidedCar({ date });
  return (
    <Stack direction="column" spacing="10px">
      <Stack
        direction="row"
        alignItems="center"
        spacing="10px"
        justifyContent="space-between"
      >
        <Text fontWeight="700">Top Performance Car</Text>
        <Input
          w="fit-content"
          value={date}
          onChange={(event) => {
            setDate(event?.target?.value);
            refetchMostViewedCar(event?.target?.value);
            refetchMostBidedCar(event?.target?.value);
          }}
          type="date"
        />
      </Stack>
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
                  <Tr key={viewed?.rank}>
                    <Td>{viewed?.rank}</Td>
                    <Td>{viewed?.car_name}</Td>
                    <Td isNumeric>
                      <Link href={`/bidding/log-view/${viewed?.id}`}>
                        {viewed?.count}
                      </Link>
                    </Td>
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
                  <Tr key={bided?.rank}>
                    <Td>{bided?.rank}</Td>
                    <Td>{bided?.car_name}</Td>
                    <Td isNumeric>
                      <Link href={`/bidding/log-bid/${bided?.id}`}>
                        {bided?.count}
                      </Link>
                    </Td>
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
