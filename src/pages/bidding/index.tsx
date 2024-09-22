import {
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import AdminLayout from "@/components/AppLayout/AdminLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import moment from "moment";
import { formatter } from "@/utils/number";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import Link from "next/link";
import { getCarsWithBids } from "@/networks/car";
import ChipBidStatus from "@/components/AppComponents/ChipBidStatus";
import ButtonExportBidding from "@/components/Bidding/ButtonExportBidding";

export default function Account() {
  const [date, setDate] = useState("");
  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchBids = (page: string, show: string, date: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getCarsWithBids("true", token, page, show, keyword, date)
      .then((response) => {
        setData(response?.data?.result);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!firstRun.current) {
      fetchBids("1", show, date);
      firstRun.current = true;
    }
  }, []);

  // DeBounce Function
  useDebounce(
    () => {
      if (firstRun.current) {
        fetchBids("1", show, date);
      }
    },
    [keyword],
    500
  );

  // Must have for pagination footer
  const dataLength1 = data?.total ?? 0;
  const [pageIndex, setPageIndex] = useState(0);
  const maxPage = Math.floor(
    (dataLength1 ?? 0) / parseInt(show, 10) +
      ((dataLength1 ?? 0) % parseInt(show, 10) === 0 ? 0 : 1)
  );
  const changePage = (page: number) => {
    if (page < 0) return;
    if (page >= maxPage) return;
    fetchBids((page + 1).toString(), show, date);
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchBids("1", limit, date);
  };
  // --
  return (
    <>
      <AdminLayout name="Bidding Information" pageName="Bidding Information">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <Stack
            direction={["column", "column", "row", "row"]}
            alignItems="center"
            spacing="10px"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing="10px">
              <InputGroup w="300px">
                <InputLeftElement pointerEvents="none">
                  <Icon icon="bx:search" />
                </InputLeftElement>
                <Input
                  placeholder="Search.."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </InputGroup>
              {isLoading && <Spinner />}
            </Stack>
            <Stack direction="row" spacing="10px" alignSelf="end">
              <Input
                value={date}
                onChange={(event) => {
                  setDate(event?.target?.value);
                  fetchBids(
                    (pageIndex + 1).toString(),
                    show,
                    event?.target?.value
                  );
                }}
                type="date"
              />

              <ButtonExportBidding />
            </Stack>
          </Stack>

          <Stack direction="column" spacing="20px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Merek Mobil</Th>
                    <Th>Tipe Mobil</Th>
                    <Th>Harga Open</Th>
                    <Th>Harga Terbentuk</Th>
                    <Th>Beli Sekarang</Th>
                    <Th>Plat Nomer</Th>
                    <Th>Tanggal Lelang</Th>
                    <Th>Log Bidding</Th>
                    <Th>Log View</Th>
                    <Th>Status Lelang</Th>
                    <Th>Leading Dealer</Th>
                    <Th>Assign Winner</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data?.map((car: any, index: number) => (
                    <Tr key={car?.id}>
                      <Td>{index + 1}</Td>
                      <Td>{car?.brand?.brand_name}</Td>
                      <Td>{car?.car_name}</Td>
                      <Td fontWeight="700">
                        Rp {formatter.format(car?.price)}
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
                          <Link href={`/bidding/log-bid/${car?.id}`}>
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
                          <Link href={`/bidding/log-view/${car?.id}`}>
                            <IconButton
                              _hover={{}}
                              variant="ghost"
                              icon={
                                <Icon icon="ion:eye-outline" fontSize="22px" />
                              }
                              aria-label=""
                            />
                          </Link>
                        </Center>
                      </Td>
                      <Td>
                        <ChipBidStatus status={car?.bidding_status} />
                      </Td>
                      <Td>
                        {car?.bid?.length > 0 ? car?.bid[0]?.user?.name : "-"}
                      </Td>
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

            <AdminPaginationFooter
              pageIndex={pageIndex}
              maxPage={maxPage}
              onChangePage={changePage}
              numberDisplayed={show}
              setNumberDisplayed={changeLimit}
            />
          </Stack>
        </Stack>
      </AdminLayout>
    </>
  );
}
