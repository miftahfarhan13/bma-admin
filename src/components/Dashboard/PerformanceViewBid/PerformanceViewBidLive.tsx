import useGetTableDealerPerformance from "@/utils/hooks/dashboard/useGetTableDealerPerformance";
import React, { useEffect, useState } from "react";
import TablePerformanceViewBid from "./TablePerformanceViewBid";
import useEcho from "@/utils/hooks/useEcho";

export default function PerformanceViewBidLive() {
  useEcho();

  const [data, setData] = useState({});

  const { data: dataRest } = useGetTableDealerPerformance({ search: "" });

  useEffect(() => {
    window.Echo.channel("list_dealer_online").listen(
      "ListDealerEvent",
      async (e: any) => {
        setData(e?.data);
      }
    );
  }, []);

  const liveData = data ? data : dataRest;

  return (
    <>
      <TablePerformanceViewBid data={liveData} />
    </>
  );
}
