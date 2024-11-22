import {
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import { getCarsWithBids } from "@/networks/car";
import ButtonExportBidding from "@/components/Bidding/ButtonExportBidding";
import TableBiddingInformation from "@/components/Bidding/TableBiddingInformation";
import SelectDateRange from "../AppComponents/SelectDateRange";
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";

export default function BiddingInformationHistorical({
  status,
}: {
  status?: string;
}) {
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";

  const [dateRanges, setDateRanges] = useState(["", ""]);
  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

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
    getCarsWithBids({
      isPaginate: "true",
      token,
      page,
      show,
      search: keyword,
      startDate,
      endDate,
      status: status || "",
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

  // DeBounce Function
  useDebounce(
    () => {
      if (firstRun.current) {
        fetchBids("1", show, dateRanges[0], dateRanges[1]);
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
          <SelectDateRange
            dateRanges={dateRanges}
            onChangeDateRanges={(value) => {
              setDateRanges(value);
              fetchBids((pageIndex + 1).toString(), show, value[0], value[1]);
            }}
          />
          {isAdmin && (
            <ButtonExportBidding
              startDate={dateRanges[0]}
              endDate={dateRanges[1]}
            />
          )}
        </Stack>
      </Stack>

      <Stack direction="column" spacing="20px">
        <TableBiddingInformation status={status} data={data?.data} />

        <AdminPaginationFooter
          pageIndex={pageIndex}
          maxPage={maxPage}
          onChangePage={changePage}
          numberDisplayed={show}
          setNumberDisplayed={changeLimit}
        />
      </Stack>
    </>
  );
}
