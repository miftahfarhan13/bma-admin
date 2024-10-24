import {
  Avatar,
  Box,
  Center,
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
import { useEffect, useRef, useState } from "react";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import { getBdDealerCreated } from "@/networks/user";
import { GetServerSideProps } from "next";
import AccountCard from "@/components/Account/AccountCard";
import SelectDateRange from "@/components/AppComponents/SelectDateRange";
import ButtonExportDealersCreated from "@/components/BdPerformance/ButtonExportDealersCreated";
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
      start_date: context.query.start_date,
      end_date: context.query.end_date,
    },
  };
};

export default function BdDealers({
  id,
  start_date,
  end_date,
}: {
  id: string;
  start_date: string;
  end_date: string;
}) {
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";

  const [dateRanges, setDateRanges] = useState([start_date, end_date]);
  const [show, setShow] = useState("10");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchDealerCreated = (
    page: string,
    show: string,
    startDate: string,
    endDate: string
  ) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBdDealerCreated({
      id,
      isPaginate: "true",
      token,
      page,
      show,
      date: "",
      startDate,
      endDate,
      isRange: true,
    })
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!firstRun.current) {
      fetchDealerCreated("1", show, dateRanges[0], dateRanges[1]);
      firstRun.current = true;
    }
  }, []);

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
    fetchDealerCreated(
      (page + 1).toString(),
      show,
      dateRanges[0],
      dateRanges[1]
    );
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchDealerCreated("1", limit, dateRanges[0], dateRanges[1]);
  };
  // --

  return (
    <>
      <AdminLayout name="BD Performance" pageName="Dealers Created">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <AccountCard id={id} />

          <Stack
            direction={["column", "column", "row", "row"]}
            alignItems="center"
            spacing="10px"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing="10px" alignSelf="end">
              <SelectDateRange
                dateRanges={dateRanges}
                onChangeDateRanges={(value) => {
                  setDateRanges(value);
                  fetchDealerCreated(
                    (pageIndex + 1).toString(),
                    show,
                    value[0],
                    value[1]
                  );
                }}
              />
              {isAdmin && (
                <ButtonExportDealersCreated
                  id={id}
                  startDate={dateRanges[0]}
                  endDate={dateRanges[1]}
                />
              )}
            </Stack>
            <Box>{isLoading && <Spinner />}</Box>
          </Stack>

          <Stack direction="column" spacing="20px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    {/* <Th>
                      <Center>Total View</Center>
                    </Th> */}
                    <Th>
                      <Center>Total Bid</Center>
                    </Th>
                    <Th>
                      <Center>Total Win</Center>
                    </Th>
                    <Th>
                      <Center>Total Win and Car Sold</Center>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data?.map((bd: any) => (
                    <Tr key={bd?.id}>
                      <Td>{bd?.id}</Td>
                      <Td>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing="5px"
                        >
                          <Avatar name={bd?.name} size="sm" />
                          <Text>{bd?.name}</Text>
                        </Stack>
                      </Td>
                      {/* <Td>
                        <Center>{bd?.latest_seen_cars_count}</Center>
                      </Td> */}
                      <Td>
                        <Center>{bd?.bids_count}</Center>
                      </Td>
                      <Td>
                        <Center>{bd?.won_cars_count}</Center>
                      </Td>
                      <Td>
                        <Center>{bd?.won_cars_terjual_count}</Center>
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
