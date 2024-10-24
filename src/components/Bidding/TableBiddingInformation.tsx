import {
  Box,
  Center,
  IconButton,
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
import moment from "moment";
import { formatter } from "@/utils/number";
import Link from "next/link";
import ChipBidStatus from "@/components/AppComponents/ChipBidStatus";
import { useState } from "react";

export default function TableBiddingInformation({ data }: { data: any }) {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedBiddingInformation = [...(data || [])].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Merek Mobil</Th>
              <Th>Tipe Mobil</Th>
              <Th>Harga Open</Th>
              <Th>Harga Max Bid</Th>
              <Th>Harga Terbentuk</Th>
              <Th>Beli Sekarang</Th>
              <Th>Plat Nomer</Th>
              <Th>Tanggal Lelang</Th>
              <Th>Log Bidding</Th>
              <Th>Log View</Th>
              <Th>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Text>Status Lelang</Text>
                  <Box
                    cursor="pointer"
                    onClick={() => handleSort("bidding_status")}
                  >
                    <Icon icon="bx:sort" />
                  </Box>
                </Stack>
              </Th>
              <Th>Leading Dealer</Th>
              <Th>Status Mobil</Th>
              <Th>Assign Winner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedBiddingInformation?.map((car: any, index: number) => (
              <Tr key={car?.id}>
                <Td>{index + 1}</Td>
                <Td>{car?.brand?.brand_name}</Td>
                <Td>{car?.car_name}</Td>
                <Td fontWeight="700">Rp {formatter.format(car?.price)}</Td>
                <Td fontWeight="700">
                  Rp {formatter.format(car?.max_bid_lock?.amount || 0)}
                </Td>
                <Td fontWeight="700">
                  Rp {formatter.format(car?.created_price)}
                </Td>
                <Td>
                  <Center>
                    {car?.is_buy_now === 1 ? (
                      <Icon icon="bx:check-circle" color="#5ED256" />
                    ) : (
                      <Icon icon="bx:x-circle" color="#ED1C29" />
                    )}
                  </Center>
                </Td>
                <Td>{car?.license_plate}</Td>
                <Td>
                  {moment(new Date(car?.session_time_start)).format(
                    "DD MMMM YYYY, HH:mm"
                  )}
                </Td>
                <Td>
                  <Center>
                    <Link href={`/bidding/log-bid/${car?.id}`} target="_blank">
                      <IconButton
                        _hover={{}}
                        variant="ghost"
                        icon={
                          <Icon
                            icon="streamline:justice-hammer"
                            fontSize="22px"
                          />
                        }
                        aria-label=""
                      />
                    </Link>
                  </Center>
                </Td>
                <Td>
                  <Center>
                    <Link href={`/bidding/log-view/${car?.id}`} target="_blank">
                      <IconButton
                        _hover={{}}
                        variant="ghost"
                        icon={<Icon icon="ion:eye-outline" fontSize="22px" />}
                        aria-label=""
                      />
                    </Link>
                  </Center>
                </Td>
                <Td>
                  <ChipBidStatus status={car?.bidding_status} />
                </Td>
                <Td>{car?.bid?.length > 0 ? car?.bid[0]?.user?.name : "-"}</Td>
                <Td>{car?.status}</Td>
                <Td>
                  <Center>
                    {car?.bidding_status === "Menang" && (
                      <Link href={`/bidding/assign-winner/${car?.id}`}>
                        <IconButton
                          _hover={{}}
                          bgColor="#65DE78"
                          color="white"
                          icon={<Icon icon="bx:edit" />}
                          aria-label=""
                        />
                      </Link>
                    )}
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
