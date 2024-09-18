import {
  Center,
  Image,
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
import { formatter } from "@/utils/number";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import { getBidsForWinnerByCarId } from "@/networks/car";
import { GetServerSideProps } from "next";
import useGetCarById from "@/utils/hooks/car/useGetCarById";
import ModalAssignWinner from "@/components/Bidding/ModalAssignWinner";
import CarDetailCard from "@/components/Car/CarDetailCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default function AssignWinner({ id }: { id: string }) {
  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

  const { data: car, refetch } = useGetCarById({ id });

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchBidsByCarId = (page: string, show: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBidsForWinnerByCarId(id, "true", token, page, show, keyword)
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
      fetchBidsByCarId("1", show);
      firstRun.current = true;
    }
  }, []);

  // DeBounce Function
  useDebounce(
    () => {
      if (firstRun.current) {
        fetchBidsByCarId("1", show);
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
    fetchBidsByCarId((page + 1).toString(), show);
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchBidsByCarId("1", limit);
  };
  // --
  return (
    <>
      <AdminLayout name="Bidding Information" pageName="Bidding Information">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <CarDetailCard car={car} />
          <Stack direction="column" spacing="10px">
            <Text fontWeight="700" fontSize="18px">
              Winner Bidding
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
                    <Th>Nama Dealer</Th>
                    <Th>Nominal Bidding</Th>
                    <Th>Assign Winner</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data?.map((bid: any, index: number) => (
                    <Tr key={bid?.id}>
                      <Td>{index + 1}</Td>
                      <Td>{bid?.user?.name}</Td>
                      <Td fontWeight="700">
                        Rp {formatter.format(bid?.highest_bid)}
                      </Td>
                      <Td>
                        {bid?.user?.id === car?.winner_id ? (
                          <>
                            <Center
                              borderRadius="99px"
                              bgColor="bma.green"
                              color="black"
                              width="200px"
                              fontWeight="bold"
                              py="5px"
                            >
                              Winner
                            </Center>
                          </>
                        ) : (
                          <>
                            <ModalAssignWinner
                              userId={bid?.user?.id}
                              carId={car?.id}
                              onSuccess={() => {
                                fetchBidsByCarId(
                                  (pageIndex + 1).toString(),
                                  show
                                );
                                refetch();
                              }}
                            />
                          </>
                        )}
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
