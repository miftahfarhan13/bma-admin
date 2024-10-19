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

export default function TablePerformanceViewBid({
  data,
  keyword,
  isUseFilter,
}: {
  data: any;
  keyword?: string;
  isUseFilter: boolean;
}) {
  const filteredData = data?.data?.filter(
    (fil: any) =>
      fil?.name?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
      fil?.businesses[0]?.name?.toLowerCase()?.includes(keyword?.toLowerCase())
  );
  const unfilteredData = data?.data;
  const datas = isUseFilter ? filteredData : unfilteredData;
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
                  {datas?.map((dealer: any) => (
                    <ModalDetailPerformanceViewBid
                      dealer={dealer}
                      data={data}
                      key={dealer?.id}
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
