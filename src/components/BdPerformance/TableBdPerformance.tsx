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
  startDate,
  endDate,
  isRange,
  date,
}: {
  data: any;
  startDate: string;
  endDate: string;
  isRange: boolean;
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
                <Center>
                  Participation <br /> Login(# of Dealer)
                </Center>
              </Th>
              <Th>
                <Center>Participation View(# of Dealer)</Center>
              </Th>
              <Th>
                <Center>Participation Bid(# of Dealer)</Center>
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
                  <Link
                    href={
                      isRange
                        ? `/bd-performance/dealers/${bd?.id}?start_date=${startDate}&end_date=${endDate}`
                        : `/bd-performance/dealers/${bd?.id}?date=${date}`
                    }
                  >
                    <Stack direction="column" alignItems="center" w="100%">
                      <Text>{bd?.dealers_count}</Text>
                    </Stack>
                  </Link>
                </Td>
                <Td>
                  <Link
                    href={
                      isRange
                        ? `/bd-performance/dealer-login/${bd?.id}?start_date=${startDate}&end_date=${endDate}`
                        : `/bd-performance/dealer-login/${bd?.id}?date=${date}`
                    }
                  >
                    <Stack direction="column" alignItems="center" w="100%">
                      <Text>{bd?.dealers_login_count || 0}</Text>
                    </Stack>
                  </Link>
                </Td>
                <Td>
                  <Link
                    href={
                      isRange
                        ? `/bd-performance/dealer-view/${bd?.id}?start_date=${startDate}&end_date=${endDate}`
                        : `/bd-performance/dealer-view/${bd?.id}?date=${date}`
                    }
                  >
                    <Stack direction="column" alignItems="center" w="100%">
                      <Text>{bd?.dealers_latest_seen_cars || 0}</Text>
                    </Stack>
                  </Link>
                </Td>
                <Td>
                  <Link
                    href={
                      isRange
                        ? `/bd-performance/dealer-participation/${bd?.id}?start_date=${startDate}&end_date=${endDate}`
                        : `/bd-performance/dealer-participation/${bd?.id}?date=${date}`
                    }
                  >
                    <Stack direction="column" alignItems="center" w="100%">
                      <Text>{bd?.dealers_bids_count}</Text>
                    </Stack>
                  </Link>
                </Td>
                <Td>
                  <Link
                    href={
                      isRange
                        ? `/bd-performance/dealer-win/${bd?.id}?start_date=${startDate}&end_date=${endDate}`
                        : `/bd-performance/dealer-win/${bd?.id}?date=${date}`
                    }
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
