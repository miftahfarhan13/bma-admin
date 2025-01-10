import {
  Avatar,
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
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import SelectDateRange from "../AppComponents/SelectDateRange";
import { bids } from "@/networks/bid";
import { formatter } from "@/utils/number";

export default function ListLogBid() {
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
    bids("true", token, page, show, keyword, startDate, endDate)
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
  console.log(dataLength1);
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

          <SelectDateRange
            dateRanges={dateRanges}
            onChangeDateRanges={(value) => {
              setDateRanges(value);
              fetchBids((pageIndex + 1).toString(), show, value[0], value[1]);
            }}
          />
        </Stack>

        <Stack direction="column" spacing="20px">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Dealer</Th>
                  <Th>Mobil</Th>
                  <Th>Plat Nomor</Th>
                  <Th>Nominal</Th>
                  <Th>Dibuat</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.map((user: any, index: number) => (
                  <Tr key={index}>
                    <Td>{user?.id}</Td>
                    <Td>
                      <Stack direction="row" alignItems="center" spacing="5px">
                        <Avatar name={user?.user_name} size="sm" />
                        <Text>{user?.user_name}</Text>
                      </Stack>
                    </Td>
                    <Td>
                      {user?.brand_name} {user?.car_name}
                    </Td>
                    <Td>{user?.license_plate}</Td>
                    <Td>Rp {formatter.format(user?.amount)}</Td>
                    <Td>{user?.created_at}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {dataLength1 > 0 ? (
            <AdminPaginationFooter
              pageIndex={pageIndex}
              maxPage={maxPage}
              onChangePage={changePage}
              numberDisplayed={show}
              setNumberDisplayed={changeLimit}
            />
          ) : null}
        </Stack>
      </Stack>
    </>
  );
}
