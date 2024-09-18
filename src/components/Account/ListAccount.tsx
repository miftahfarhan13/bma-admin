import {
  Button,
  Center,
  IconButton,
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
import { getUsers } from "@/networks/auth";
import useDebounce from "@/utils/hooks/useDebounce";
import moment from "moment";
import { formatter } from "@/utils/number";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import Link from "next/link";
import ModalDeleteAccount from "@/components/Account/ModalDeleteAccount";

export default function ListAccount() {
  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchUsers = (page: string, show: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getUsers("true", token, page, show, keyword)
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
        <Text
          fontSize={["18px", "18px", "24px", "24px"]}
          fontWeight="700"
          color={["white", "white", "bma.primary", "bma.primary"]}
        >
          Information Account
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
          <Stack direction="row" alignItems="center" spacing="10px">
            <Link href="/account/create?role=business">
              <Button
                leftIcon={<Icon icon="bxs:plus-circle" />}
                variant="primary-solid-medium"
                w={["100%", "100%", "fit-content", "fit-content"]}
              >
                Add BD
              </Button>
            </Link>
            <Link href="/account/create?role=dealer">
              <Button
                leftIcon={<Icon icon="bxs:plus-circle" />}
                variant="primary-solid-medium"
                w={["100%", "100%", "fit-content", "fit-content"]}
              >
                Add Dealer
              </Button>
            </Link>
          </Stack>
        </Stack>

        <Stack direction="column" spacing="20px">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nama</Th>
                  <Th>PIC</Th>
                  <Th>Role</Th>
                  <Th>Akun Aktif</Th>
                  <Th>Status Deposit</Th>
                  <Th>Nominal Deposit</Th>
                  <Th>Participation by Car</Th>
                  <Th>Total Menang</Th>
                  <Th>Akun Dibuat</Th>
                  <Th>Action</Th>
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
                    <Td>{user?.roles[0]?.name}</Td>
                    <Td>
                      <Center>
                        {user?.is_active === 1 ? (
                          <Icon icon="bx:check-circle" color="#5ED256" />
                        ) : (
                          <Icon icon="bx:x-circle" color="#ED1C29" />
                        )}
                      </Center>
                    </Td>
                    <Td>
                      <Center>
                        {user?.is_deposit === 1 ? (
                          <Icon icon="bx:check-circle" color="#5ED256" />
                        ) : (
                          <Icon icon="bx:x-circle" color="#ED1C29" />
                        )}
                      </Center>
                    </Td>
                    <Td>Rp {formatter.format(user?.deposit_nominal)}</Td>
                    <Td>{user?.bids_count}</Td>
                    <Td>{user?.won_cars_count}</Td>
                    <Td>
                      {moment(new Date(user?.created_at)).format(
                        "MMMM DD, YYYY"
                      )}
                    </Td>
                    <Td>
                      <Stack direction="row" alignItems="center" spacing="10px">
                        <Link href={`/account/update/${user?.id}`}>
                          <IconButton
                            _hover={{}}
                            bgColor="#65DE78"
                            color="white"
                            icon={<Icon icon="bx:edit" />}
                            aria-label=""
                          />
                        </Link>
                        <ModalDeleteAccount
                          id={user?.id}
                          onSuccess={() =>
                            fetchUsers(pageIndex.toString(), show)
                          }
                        />
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
    </>
  );
}
