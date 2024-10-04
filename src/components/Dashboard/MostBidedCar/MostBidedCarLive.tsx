import React, { useEffect, useState } from "react";
import useEcho from "@/utils/hooks/useEcho";
import moment from "moment";
import TableMostBidedCar from "./TableMostBidedCar";
import useGetMostBidedCar from "@/utils/hooks/dashboard/useGetMostBidedCar";

export default function MostBidedCarLive() {
  useEcho();

  const today = moment(new Date()).format("YYYY-MM-DD");
  const [data, setData] = useState([]);

  const { data: dataRest } = useGetMostBidedCar({ date: today });

  useEffect(() => {
    window.Echo.channel("most_bid_car_online").listen(
      "MostBidCarEvent",
      async (e: any) => {
        setData(e?.data ? e?.data[0] : []);
      }
    );
  }, []);

  const liveData = data && data?.length > 0 ? data : dataRest;

  return <>{liveData && <TableMostBidedCar mostBidedCar={liveData} />}</>;
}
