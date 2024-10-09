import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function TableMostViewedCar({
  mostViewedCar,
}: {
  mostViewedCar: Array<any>;
}) {
  return (
    <>
      <Box p="10px" borderRadius="8px" border="1px solid #DBDBDB">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Most View Car</Th>
                <Th>Leading Dealer</Th>
                <Th isNumeric>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mostViewedCar?.map((viewed: any) => (
                <Tr key={viewed?.rank}>
                  <Td>{viewed?.rank}</Td>
                  <Td>{viewed?.car_name}</Td>
                  <Td>{viewed?.leading_dealer?.name}</Td>
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
    </>
  );
}
