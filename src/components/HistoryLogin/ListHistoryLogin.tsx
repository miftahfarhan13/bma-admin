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
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";
import { loginHistories } from "@/networks/historyLogin";
import SelectDateRange from "../AppComponents/SelectDateRange";

export default function ListHistoryLogin() {
  const [dateRanges, setDateRanges] = useState(["", ""]);
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";
  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchLoginHistories = (
    page: string,
    show: string,
    startDate: string,
    endDate: string
  ) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    loginHistories("true", token, page, show, keyword, startDate, endDate)
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
      fetchLoginHistories("1", show, dateRanges[0], dateRanges[1]);
      firstRun.current = true;
    }
  }, []);

  // DeBounce Function
  useDebounce(
    () => {
      if (firstRun.current) {
        fetchLoginHistories("1", show, dateRanges[0], dateRanges[1]);
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
    fetchLoginHistories(
      (page + 1).toString(),
      show,
      dateRanges[0],
      dateRanges[1]
    );
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchLoginHistories("1", limit, dateRanges[0], dateRanges[1]);
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
              fetchLoginHistories(
                (pageIndex + 1).toString(),
                show,
                value[0],
                value[1]
              );
            }}
          />
        </Stack>

        <Stack direction="column" spacing="20px">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nama</Th>
                  <Th>Email</Th>
                  <Th>Nomor Telepon</Th>
                  <Th>Tanggal Login</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.map((user: any, index: number) => (
                  <Tr key={index}>
                    <Td>{user?.user_id}</Td>
                    <Td>
                      <Stack direction="row" alignItems="center" spacing="5px">
                        <Avatar name={user?.user?.name} size="sm" />
                        <Text>{user?.user?.name}</Text>
                      </Stack>
                    </Td>
                    <Td>{user?.user?.email}</Td>
                    <Td>{user?.user?.phone_number}</Td>
                    <Td>{user?.login_at}</Td>
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
    </>
  );
}
