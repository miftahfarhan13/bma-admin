import useGetTableDealerPerformance from "@/utils/hooks/dashboard/useGetTableDealerPerformance";
import React, { useEffect, useState } from "react";
import TablePerformanceViewBid from "./TablePerformanceViewBid";
import useEcho from "@/utils/hooks/useEcho";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function PerformanceViewBidLive() {
  useEcho();

  const [search, setSearch] = useState("");
  const [data, setData] = useState();

  const { data: dataRest } = useGetTableDealerPerformance({
    search: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    window.Echo.channel("list_dealer_online").listen(
      "ListDealerEvent",
      async (e: any) => {
        console.log(e);
        setData(e?.data);
      }
    );
  }, []);

  const liveData = data ? data : dataRest;

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

      <TablePerformanceViewBid data={liveData} keyword={search} isUseFilter />
    </>
  );
}
