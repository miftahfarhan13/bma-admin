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
import React from "react";

export default function TablePerformanceViewBid({ data }: { data: any }) {
  return (
    <>
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
                <Td></Td>
                <Td></Td>
                <Td isNumeric>/{data?.total_view}</Td>
                <Td isNumeric>/{data?.total_bid}</Td>
              </Tr>
              {data?.data && data?.data?.length > 0 && (
                <>
                  {data?.data?.map((dealer: any) => (
                    <Tr key={dealer?.id}>
                      <Td>{dealer?.name}</Td>
                      <Td>
                        {dealer?.businesses ? dealer?.businesses[0]?.name : ""}
                      </Td>
                      <Td isNumeric>
                        {dealer?.latest_seen_cars_sum_seen}/{data?.total_view} (
                        {Math.floor(dealer?.percentage_seen)}%)
                      </Td>
                      <Td isNumeric>
                        {dealer?.bids_count}/{data?.total_bid} (
                        {Math.floor(dealer?.percentage_bid)}%)
                      </Td>
                    </Tr>
                  ))}
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
