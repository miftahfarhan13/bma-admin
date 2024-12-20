import { Box, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import { getBdPerformances } from "@/networks/user";
import TableBdPerformance from "./TableBdPerformance";
import ButtonExportBdPerformance from "./ButtonExportBdPerformance";
import SelectDateRange from "../AppComponents/SelectDateRange";
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";

export default function BdPerformanceHistorical() {
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";

  const [dateRanges, setDateRanges] = useState(["", ""]);
  const [show, setShow] = useState("10");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchBids = (
    page: string,
    show: string,
    startDate: string,
    endDate: string
  ) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBdPerformances({
      isPaginate: "true",
      token,
      page,
      show,
      startDate,
      endDate,
      isRange: true,
    })
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
      fetchBids("1", show, dateRanges[0], dateRanges[1]);
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
    fetchBids((page + 1).toString(), show, dateRanges[0], dateRanges[1]);
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchBids("1", limit, dateRanges[0], dateRanges[1]);
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
          {isAdmin && (
            <Stack direction="row" spacing="10px" alignSelf="end">
              <SelectDateRange
                dateRanges={dateRanges}
                onChangeDateRanges={(value) => {
                  setDateRanges(value);
                  fetchBids(
                    (pageIndex + 1).toString(),
                    show,
                    value[0],
                    value[1]
                  );
                }}
              />

              <ButtonExportBdPerformance
                startDate={dateRanges[0]}
                endDate={dateRanges[1]}
              />
            </Stack>
          )}
        </Stack>

        <Stack direction="column" spacing="20px">
          <TableBdPerformance
            data={data?.data}
            startDate={dateRanges[0]}
            endDate={dateRanges[1]}
            isRange={true}
            date=""
          />

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
