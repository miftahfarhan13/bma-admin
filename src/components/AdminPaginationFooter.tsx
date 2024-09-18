
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Fragment } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { pageDisplayedIndex } from "@/utils/paginationFunction";

const AdminPaginationFooter = ({
  pageIndex,
  maxPage,
  onChangePage,
  numberDisplayed,
  setNumberDisplayed,
  showBaris = true,
  nameOfList = "Row",
  minW,
  showBarisOptions = [5, 10, 20],
}: {
  pageIndex: number;
  maxPage: number;
  onChangePage: (to: number) => void;
  numberDisplayed: string;
  setNumberDisplayed: (max: string) => void;
  showBaris?: boolean;
  nameOfList?: string;
  minW?: string;
  showBarisOptions?: number[];
}) => {
  const displayedPageIndex = pageDisplayedIndex(pageIndex, maxPage);

  return (
    <Stack
      direction={["column", "column", "row"]}
      justify="space-between"
      alignItems="center"
      userSelect="none"
      spacing="16px"
    >
      {showBaris ? (
        <>
          <Flex alignItems="center" minW={minW}>
            <Text
              letterSpacing="0.25px"
              fontWeight={700}
              fontSize="14px"
              color="lmsb.black"
              mr="16px"
            >
              Show:
            </Text>
            <Select
              onChange={(event) => {
                onChangePage(0);
                setNumberDisplayed(event.target.value);
              }}
              value={numberDisplayed}
              color="lmsb.black"
              minW="140px"
              w="140px"
            >
              {showBarisOptions.map((opt) => (
                <option value={`${opt}`} key={`${opt}`}>
                  {opt} {nameOfList}
                </option>
              ))}
            </Select>
          </Flex>
        </>
      ) : (
        <></>
      )}

      <Flex
        direction="column"
        alignItems="end"
        width={["fit-content", "fit-content", "100%", "100%"]}
      >
        <Stack direction="row">
          <Button
            onClick={() => onChangePage(pageIndex - 1)}
            variant="ghost"
            userSelect="none"
            minW="34px"
            p="8px"
          >
            <Icon icon="bx:chevron-left" fontSize="18px" />
          </Button>
          {displayedPageIndex.map((page, index) => (
            <Fragment key={page}>
              <Button
                variant={
                  page === pageIndex
                    ? "primary-solid-medium"
                    : "ghost"
                }
                onClick={() => onChangePage(page)}
                userSelect="none"
                w="34px"
                borderRadius="99px"
              >
                {page + 1}
              </Button>
              <Flex
                display={
                  displayedPageIndex[index + 1] !== page + 1 &&
                  page + 1 !== maxPage
                    ? "flex"
                    : "none"
                }
                bgColor="transparent"
                alignItems="center"
                fontWeight={600}
                userSelect="none"
                justify="center"
                fontSize="14px"
                color="#014E60"
                rounded="full"
                w="32px"
                h="32px"
              >
                ...
              </Flex>
            </Fragment>
          ))}
          <Button
            onClick={() => onChangePage(pageIndex + 1)}
            variant="ghost"
            userSelect="none"
            minW="34px"
            p="8px"
          >
            <Icon icon="bx:chevron-right" fontSize="18px" />
          </Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default AdminPaginationFooter;

/*
  // //////////////////////////////////////////////////////////////// //
  // WANT TO USE THIS? MAKE SURE PARRENT HAS VARIABLE BELOW FOR PROPS //
  // //////////////////////////////////////////////////////////////// //

  // Must have for pagination footer
  const dataLength = ... // Ganti sesuai panjang data SETELAH ada (filter kalo ada)
  const [pageIndex, setPageIndex] = useState(0);
  const [numberDisplayed, setNumberDisplayed] = useState("5");
  const maxPage = Math.floor(
    (dataLength ?? 0) / parseInt(numberDisplayed, 10) + ((dataLength ?? 0) % parseInt(numberDisplayed, 10) === 0 ? 0 : 1)
  );
  const changePage = (page: number) => {
    if (page < 0) return;
    if (page >= maxPage) return;
    setPageIndex(page);
  };
  // --


  USE THIS FOR COMPONENT
  
  <AdminPaginationFooter
    pageIndex={pageIndex}
    maxPage={maxPage}
    onChangePage={changePage}
    numberDisplayed={numberDisplayed}
    setNumberDisplayed={setNumberDisplayed}
  />

  THEN FILTER YOUR DATA LIKE THIS

  <>
    {Math.floor(index / parseInt(numberDisplayed, 10)) === pageIndex && (
      -- code goes here -- 
    )}
  </>

  // ////////////////////////////////// //
  // ONLY IF WANT SSR READ DEFAULT PAGE //
  // ////////////////////////////////// //
  
  SSR const
  export const getServerSideProps: GetServerSideProps = async (context) => {
    const { search, page, limit } = context.query;
    return {
      props: {
        defaultSearch: search ?? null,
        defaultPage: page ?? null,
        defaultLimit: limit ?? null
      },
    };
  };

  JUST CHANGE
  // Change page props to get SSR props
  pageFuntion({ defaultPage, defaultSearch, defaultLimit }: any){bodyPage};
  // --

  // Initiation
  const router = useRouter();
  // --

  // Search Mechanism
  const [searchKeyword, setSearchKeyword] = useState(defaultSearch);

  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldown, setCooldown] = useState<any>();
  // --

  GRAPHQL BEFORE PAGINATION EG. COUNT ALL DATA
  // Graphql before pagination
  // --
  
  // Must have for pagination footer
  const dataLength = countFormGenerators.data?.countFormGenerators ?? 0;
  const [pageIndex, setPageIndex] = useState(defaultPage);
  const [numberDisplayed, setNumberDisplayed] = useState(defaultLimit);
  const maxPage = Math.floor(
    (dataLength ?? 0) / parseInt(numberDisplayed, 10) + ((dataLength ?? 0) % parseInt(numberDisplayed, 10) === 0 ? 0 : 1)
  );
  const changeLimit = (limit: string) => {
    setNumberDisplayed(limit);
    router.replace({
      query: {
        ...router.query,
        limit,
      }
    });
  };
  const changePage = (page: number) => {
    if (page < 0) return;
    if (page >= maxPage) return;
    router.replace({
      query: {
        ...router.query,
        page,
      }
    });
    setPageIndex(page);
  };
  // --

  GRAPHQL AFTER PAGINATION
  // Graphql after pagination
  // --

  // Filtering, Update Url
  const handleChangeKeyword = (event: any) => {
    const callCooldown = () => {
      setCooldown(setTimeout(() => {
        setSearchKeyword(event.target.value);
        setIsCooldown(false);
        changePage(0);
        router.replace({
          query: {
            ...router.query,
            search: event.target.value,
          }
        });
      }, 200));
    }
    if (isCooldown) {
      clearTimeout(cooldown);
      callCooldown();
    } else {
      setIsCooldown(true);
      callCooldown();
    }
  };
  // --

  ADD AS COMPONENT
  <AdminPaginationFooter
    pageIndex={pageIndex}
    maxPage={maxPage}
    onChangePage={changePage}
    numberDisplayed={numberDisplayed}
    setNumberDisplayed={changeLimit}
  />

  No need FE filtering

*/
