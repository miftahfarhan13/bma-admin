import {
  Button,
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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import moment from "moment";
import { formatter } from "@/utils/number";
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import Link from "next/link";
import { getCars } from "@/networks/car";
import ChipBidStatus from "../AppComponents/ChipBidStatus";
import ModalDeleteCar from "./ModalDeleteCar";

export default function ListCar() {
  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchCars = (page: string, show: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getCars("true", token, page, show, keyword)
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
      fetchCars("1", show);
      firstRun.current = true;
    }
  }, []);

  // DeBounce Function
  useDebounce(
    () => {
      if (firstRun.current) {
        fetchCars("1", show);
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
    fetchCars((page + 1).toString(), show);
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchCars("1", limit);
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
          <Stack direction="row" alignItems="center" spacing="10px">
            <Link href="/car/brand">
              <Button
                leftIcon={<Icon icon="bxs:tag" />}
                variant="primary-solid-medium"
                w={["100%", "100%", "fit-content", "fit-content"]}
              >
                Add Merek
              </Button>
            </Link>
            <Link href="/car/create">
              <Button
                leftIcon={<Icon icon="bxs:plus-circle" />}
                variant="primary-solid-medium"
                w={["100%", "100%", "fit-content", "fit-content"]}
              >
                Add Car
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
                  <Th>Merek Mobil</Th>
                  <Th>Tipe Mobil</Th>
                  <Th>Harga Open</Th>
                  <Th>Plat Nomer</Th>
                  <Th>Tanggal Lelang</Th>
                  <Th>Status Lelang</Th>
                  <Th>Leading Dealer</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.map((car: any) => (
                  <Tr key={car?.id}>
                    <Td>{car?.id}</Td>
                    <Td>{car?.brand?.brand_name}</Td>
                    <Td>{car?.car_name}</Td>
                    <Td>Rp {formatter.format(car?.price)}</Td>
                    <Td>{car?.license_plate}</Td>
                    <Td>
                      {moment(new Date(car?.session_time_start)).format(
                        "DD MMMM YYYY, HH:mm"
                      )}
                    </Td>
                    <Td>
                      <ChipBidStatus status={car?.bidding_status} />
                    </Td>
                    <Td>
                      {car?.bid?.length > 0 ? car?.bid[0]?.user?.name : "-"}
                    </Td>
                    <Td>
                      <Stack direction="row" alignItems="center" spacing="10px">
                        <Link href={`/car/update/${car?.id}`}>
                          <IconButton
                            _hover={{}}
                            bgColor="#65DE78"
                            color="white"
                            icon={<Icon icon="bx:edit" />}
                            aria-label=""
                          />
                        </Link>
                        <ModalDeleteCar
                          id={car?.id}
                          onSuccess={() =>
                            fetchCars(pageIndex.toString(), show)
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
