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
import Link from "next/link";

export default function TableBdPerformance({
  data,
  date,
}: {
  data: any;
  date: string;
}) {
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
            {data?.map((bd: any) => (
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
                  <Link
                    href={`/bd-performance/dealer-participation/${bd?.id}?date=${date}`}
                  >
                    <Stack direction="column" alignItems="center" w="100%">
                      <Text>{bd?.dealers_bids_count}</Text>
                    </Stack>
                  </Link>
                </Td>
                <Td>
                  <Link
                    href={`/bd-performance/dealer-win/${bd?.id}?date=${date}`}
                  >
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
