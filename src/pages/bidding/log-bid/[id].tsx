import {
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
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
import AdminLayout from "@/components/AppLayout/AdminLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import moment from "moment";
import { formatter } from "@/utils/number";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import { getBidsByCarId } from "@/networks/car";
import { GetServerSideProps } from "next";
import CarDetailCard from "@/components/Car/CarDetailCard";
import useGetCarById from "@/utils/hooks/car/useGetCarById";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default function LogBid({ id }: { id: string }) {
  const { data: car } = useGetCarById({ id });

  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const feetchBidsByCarId = (page: string, show: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBidsByCarId(id, "true", token, page, show, keyword)
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
      feetchBidsByCarId("1", show);
      firstRun.current = true;
    }
  }, []);

  // DeBounce Function
  useDebounce(
    () => {
      if (firstRun.current) {
        feetchBidsByCarId("1", show);
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
    feetchBidsByCarId((page + 1).toString(), show);
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    feetchBidsByCarId("1", limit);
  };
  // --
  return (
    <>
      <AdminLayout name="Bidding Information" pageName="Bidding Information">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <CarDetailCard car={car} />

          <Stack direction="column" spacing="10px">
            <Text fontWeight="700" fontSize="18px">
              Log Bid
            </Text>
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
            </Stack>
          </Stack>

          <Stack direction="column" spacing="20px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Tipe Mobil</Th>
                    <Th>Plat Nomer</Th>
                    <Th>Tanggal Lelang</Th>
                    <Th>Dealer</Th>
                    <Th>Nominal Bidding</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data?.map((car: any, index: number) => (
                    <Tr key={car?.id}>
                      <Td>{index + 1}</Td>
                      <Td>{car?.car?.car_name}</Td>
                      <Td>{car?.car?.license_plate}</Td>
                      <Td>
                        {moment(new Date(car?.created_at)).format(
                          "DD MMMM YYYY, HH:mm:ss"
                        )}
                      </Td>
                      <Td>{car?.user?.name}</Td>

                      <Td fontWeight="700">
                        Rp {formatter.format(car?.amount)}
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
