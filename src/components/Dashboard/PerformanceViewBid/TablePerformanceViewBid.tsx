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
import ModalDetailPerformanceViewBid from "./ModalDetailPerformanceViewBid";

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
                    <ModalDetailPerformanceViewBid
                      dealer={dealer}
                      data={data}
                    />
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
