import {
  Avatar,
  Center,
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
import Link from "next/link";

export default function TableBdPerformance({ data }: { data: any }) {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>PIC</Th>
              <Th>
                <Center>Dealers Created</Center>
              </Th>
              <Th>
                <Center>Participation(# of Dealer)</Center>
              </Th>
              <Th>
                <Center>Won (# of Dealer)</Center>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((bd: any, index: number) => (
              <Tr key={bd?.id}>
                <Td>
                  <Stack direction="row" alignItems="center" spacing="5px">
                    <Avatar name={bd?.name} size="sm" />
                    <Text>{bd?.name}</Text>
                  </Stack>
                </Td>
                <Td>
                  <Center>{bd?.dealers_count}</Center>
                </Td>
                <Td>
                  <Link href={`/bd-performance/dealer-participation/${bd?.id}`}>
                    <Stack direction="column" alignItems="center" w="100%">
                      <Text>{bd?.dealers_bids_count}</Text>
                    </Stack>
                  </Link>
                </Td>
                <Td>
                  <Link href={`/bd-performance/dealer-win/${bd?.id}`}>
                    <Stack direction="column" alignItems="center" w="100%">
                      <Text>{bd?.dealers_won_cars_count}</Text>
                    </Stack>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
