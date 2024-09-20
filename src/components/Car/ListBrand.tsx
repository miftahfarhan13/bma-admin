import {
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
import AdminPaginationFooter from "@/components/AdminPaginationFooter";
import ModalCreateUpdateBrand from "./Brand/ModalCreateUpdateBrand";
import ModalDeleteBrand from "./Brand/ModalDeleteBrand";
import { getBrands } from "@/networks/brand";

export default function ListBrand() {
  const [show, setShow] = useState("10");
  const [keyword, setKeyword] = useState("");

  const firstRun = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchBrands = (page: string, show: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBrands("true", token, page, show, keyword)
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
      fetchBrands("1", show);
      firstRun.current = true;
    }
  }, []);

  // DeBounce Function
  useDebounce(
    () => {
      if (firstRun.current) {
        fetchBrands("1", show);
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
    fetchBrands((page + 1).toString(), show);
    setPageIndex(page);
  };
  const changeLimit = (limit: string) => {
    setShow(limit);
    fetchBrands("1", limit);
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
            <ModalCreateUpdateBrand
              type="create"
              onSuccess={() => fetchBrands(pageIndex.toString(), show)}
            />
          </Stack>
        </Stack>

        <Stack direction="column" spacing="20px">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Merk Mobil</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.map((brand: any) => (
                  <Tr key={brand?.id}>
                    <Td>{brand?.id}</Td>
                    <Td>{brand?.brand_name}</Td>
                    <Td>
                      <Stack direction="row" alignItems="center" spacing="10px">
                        <ModalCreateUpdateBrand
                          id={brand?.id}
                          brand={brand?.brand_name}
                          type="update"
                          onSuccess={() =>
                            fetchBrands(pageIndex.toString(), show)
                          }
                        />
                        <ModalDeleteBrand
                          id={brand?.id}
                          onSuccess={() =>
                            fetchBrands(pageIndex.toString(), show)
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
