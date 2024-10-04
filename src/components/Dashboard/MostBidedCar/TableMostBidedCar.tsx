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

export default function TableMostBidedCar({
  mostBidedCar,
}: {
  mostBidedCar: Array<any>;
}) {
  return (
    <>
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
                    <Link href={`/bidding/log-view/${bided?.id}`}>
                      {bided?.count}
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
