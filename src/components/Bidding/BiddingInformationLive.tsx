import React, { useEffect, useState } from "react";
import useEcho from "@/utils/hooks/useEcho";
import moment from "moment";
import TableBiddingInformation from "./TableBiddingInformation";
import useGetCarBids from "@/utils/hooks/car/useGetCarBids";

export default function BiddingInformationLive() {
  useEcho();

  const today = moment(new Date()).format("YYYY-MM-DD");
  const [data, setData] = useState([]);

  const { data: dataRest } = useGetCarBids({ date: today });

  useEffect(() => {
    window.Echo.channel("car_bids_online").listen(
      "CarBidsEvent",
      async (e: any) => {
        setData(e?.data ? e?.data[0] : []);
      }
    );
  }, []);

  const liveData = data && data?.length > 0 ? data : dataRest;

  return <>{liveData && <TableBiddingInformation data={liveData} />}</>;
}