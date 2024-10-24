import useGetTableDealerPerformance from "@/utils/hooks/dashboard/useGetTableDealerPerformance";
import useDebounce from "@/utils/hooks/useDebounce";
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import TablePerformanceViewBid from "./TablePerformanceViewBid";
import ButtonExportPerformanceViewBid from "./ButtonExportPerformanceViewBid";
import SelectDateRange from "@/components/AppComponents/SelectDateRange";
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";

export default function PerformanceViewBidHistorical() {
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";

  const [search, setSearch] = useState("");
  const [dateRanges, setDateRanges] = useState(["", ""]);
  const { data, refetch } = useGetTableDealerPerformance({
    search,
    startDate: dateRanges[0],
    endDate: dateRanges[1],
  });
  // DeBounce Function
  useDebounce(
    () => {
      refetch(dateRanges[0], dateRanges[1]);
    },
    [search],
    500
  );
  return (
    <>
      <Stack
        direction={["column", "column", "row", "row"]}
        alignItems="center"
        justifyContent="space-between"
        spacing="10px"
      >
        <InputGroup w="300px">
          <InputLeftElement pointerEvents="none">
            <Icon icon="bx:search" />
          </InputLeftElement>
          <Input
            placeholder="Search.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <Stack
          direction={["column", "column", "row", "row"]}
          alignItems="center"
          justifyContent="space-between"
          spacing="10px"
        >
          <SelectDateRange
            dateRanges={dateRanges}
            onChangeDateRanges={(value) => {
              setDateRanges(value);
              refetch(value[0], value[1]);
              // fetchBids((pageIndex + 1).toString(), show, value[0], value[1]);
            }}
          />
          {isAdmin && (
            <ButtonExportPerformanceViewBid
              startDate={dateRanges[0]}
              endDate={dateRanges[1]}
            />
          )}
        </Stack>
      </Stack>

      <TablePerformanceViewBid data={data} isUseFilter={false} />
    </>
  );
}
