import React, { useEffect, useState } from "react";
import useEcho from "@/utils/hooks/useEcho";
import moment from "moment";
import TableBiddingInformation from "./TableBiddingInformation";
import useGetCarBids from "@/utils/hooks/car/useGetCarBids";

export default function BiddingInformationLiveOnly() {
  useEcho();

  const today = moment(new Date()).format("YYYY-MM-DD");

  const { data: dataRest, refetch } = useGetCarBids({ date: today });

  useEffect(() => {
    window.Echo.channel("update_bid_event").listen(
      "UpdateBidEvent",
      async (e: any) => {
        refetch();
      }
    );
  }, []);

  return <>{dataRest && <TableBiddingInformation data={dataRest} />}</>;
}
