import useGetTableDealerPerformance from "@/utils/hooks/dashboard/useGetTableDealerPerformance";
import useDebounce from "@/utils/hooks/useDebounce";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import TablePerformanceViewBid from "./TablePerformanceViewBid";

export default function PerformanceViewBidHistorical() {
  const [search, setSearch] = useState("");
  const { data, refetch } = useGetTableDealerPerformance({ search });
  // DeBounce Function
  useDebounce(
    () => {
      refetch();
    },
    [search],
    500
  );
  return (
    <>
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

      <TablePerformanceViewBid data={data} />
    </>
  );
}
