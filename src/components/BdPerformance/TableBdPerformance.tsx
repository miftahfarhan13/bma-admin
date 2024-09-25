import {
  Avatar,
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
              <Th>Dealers Created</Th>
              <Th>Participation(# of Dealer)</Th>
              <Th>Won (# of Dealer)</Th>
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
                <Td>{bd?.dealers_count}</Td>
                <Td>
                  <Link href={`/bd-performance/dealer-participation/${bd?.id}`}>
                    <Stack direction="row" alignItems="center" spacing="5px">
                      <Text>{bd?.dealers_bids_count}</Text>
                      <Icon icon="ion:eye-outline" />
                    </Stack>
                  </Link>
                </Td>
                <Td>
                  <Link href={`/bd-performance/dealer-win/${bd?.id}`}>
                    <Stack direction="row" alignItems="center" spacing="5px">
                      <Text>{bd?.dealers_won_cars_count}</Text>
                      <Icon icon="ion:eye-outline" />
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
