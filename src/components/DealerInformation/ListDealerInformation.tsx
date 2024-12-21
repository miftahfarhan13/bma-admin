import {
  Badge,
  Button,
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
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import { getUsers } from "@/networks/auth";
import useDebounce from "@/utils/hooks/useDebounce";
import moment from "moment";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";
import { formatter } from "@/utils/number";
import ExportDealerInformation from "./ExportDealerInformation";

export default function ListDealerInformation() {
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";

  const currentYear = moment(new Date()).format("YYYY");

  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchUsers = (page: string, show: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getUsers("true", token, page, show, keyword, "dealer")
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
      fetchUsers("1", show);
      firstRun.current = true;
    }
  }, []);

  // DeBounce Function
  useDebounce(
    () => {
      if (firstRun.current) {
        fetchUsers("1", show);
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
    fetchUsers((page + 1).toString(), show);
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchUsers("1", limit);
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
          {isAdmin && (
            <Stack direction="row" alignItems="center" spacing="10px">
              <ExportDealerInformation />
            </Stack>
          )}
        </Stack>

        <Stack direction="column" spacing="20px">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nama Dealer</Th>
                  <Th>Nama BD</Th>
                  <Th>Provinsi Dealer</Th>
                  <Th>Kota Dealer</Th>
                  <Th>DRP Class</Th>
                  <Th>DRP Nominal</Th>
                  <Th>Akun Dibuat</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.map((user: any, index: number) => (
                  <Tr key={user?.id}>
                    <Td>{user?.id}</Td>
                    <Td>{user?.name}</Td>
                    <Td>
                      {user?.businesses?.length > 0
                        ? user?.businesses[0]?.name
                        : "-"}
                    </Td>
                    <Td>{user?.province || "-"}</Td>
                    <Td>{user?.city || "-"}</Td>
                    <Td>
                      <Badge color={user?.drp_class}>{user?.drp_class}</Badge>
                    </Td>
                    <Td>Rp {formatter.format(user?.drp_nominal || 0)}</Td>
                    <Td>
                      {moment(new Date(user?.created_at)).format(
                        "MMMM DD, YYYY"
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
    </>
  );
}
