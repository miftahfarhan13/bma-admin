import {
  Avatar,
  Box,
  Input,
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
import { getBdDealerWin } from "@/networks/user";
import { GetServerSideProps } from "next";
import AccountCard from "@/components/Account/AccountCard";
import { formatter } from "@/utils/number";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
      date: context.query.date,
    },
  };
};

export default function BdDealerWin({
  id,
  date,
}: {
  id: string;
  date: string;
}) {
  const [dateState, setDateState] = useState(date);

  const [show, setShow] = useState("10");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchDealerParticipation = (
    page: string,
    show: string,
    date: string
  ) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBdDealerWin(id, "true", token, page, show, date)
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
      fetchDealerParticipation("1", show, dateState);
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
    fetchDealerParticipation((page + 1).toString(), show, dateState);
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchDealerParticipation("1", limit, dateState);
  };
  // --
  return (
    <>
      <AdminLayout name="BD Performance" pageName="Won Table">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <AccountCard id={id} />

          <Stack
            direction={["column", "column", "row", "row"]}
            alignItems="center"
            spacing="10px"
          >
            <Stack>
              <Input
                value={dateState}
                onChange={(event) => {
                  setDateState(event?.target?.value);
                  fetchDealerParticipation(
                    (pageIndex + 1).toString(),
                    show,
                    event?.target?.value
                  );
                }}
                type="date"
              />
            </Stack>
            <Box>{isLoading && <Spinner />}</Box>
          </Stack>

          <Stack direction="column" spacing="20px">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID Car</Th>
                    <Th>Car</Th>
                    <Th>Bidding Start Date</Th>
                    <Th>Marketplace</Th>
                    <Th>Win Price</Th>
                    <Th>Nama Dealer</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data?.map((bd: any) => (
                    <Tr key={bd?.id}>
                      <Td>{bd?.id}</Td>
                      <Td>{bd?.car_name}</Td>
                      <Td>{bd?.session_time_start}</Td>
                      <Td>{bd?.is_active === 1 ? "Open" : "Close"}</Td>
                      <Td fontWeight="700">
                        Rp {formatter.format(bd?.highest_bid_amount)}
                      </Td>
                      <Td>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing="5px"
                        >
                          <Avatar name={bd?.winner?.name} size="sm" />
                          <Text>{bd?.winner?.name}</Text>
                        </Stack>
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
