import { Box, Button, Input, Spinner, Stack } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import { getBdPerformances } from "@/networks/user";
import TableBdPerformance from "./TableBdPerformance";

export default function BdPerformanceHistorical() {
  const [date, setDate] = useState("");
  const [show, setShow] = useState("10");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchBids = (page: string, show: string, date: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBdPerformances("true", token, page, show, date)
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
      <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
        <Stack
          direction={["column", "column", "row", "row"]}
          alignItems="center"
          spacing="10px"
          justifyContent="space-between"
        >
          <Box>{isLoading && <Spinner />}</Box>
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

            <Button
              leftIcon={<Icon icon="bx:download" />}
              variant="green-solid-medium"
              width="100%"
            >
              Export Data
            </Button>
          </Stack>
        </Stack>

        <Stack direction="column" spacing="20px">
          <TableBdPerformance data={data?.data} />

          <AdminPaginationFooter
            pageIndex={pageIndex}
            maxPage={maxPage}
            onChangePage={changePage}
            numberDisplayed={show}
            setNumberDisplayed={changeLimit}
          />
        </Stack>
      </Stack>
    </>
  );
}
