import React, { useEffect, useState } from "react";
import useEcho from "@/utils/hooks/useEcho";
import moment from "moment";
import TableMostViewedCar from "./TableMostViewedCar";
import useGetMostViewedCar from "@/utils/hooks/dashboard/useGetMostViewedCar";

export default function MostViewedCarLive() {
  useEcho();

  const today = moment(new Date()).format("YYYY-MM-DD");
  const [data, setData] = useState([]);

  const { data: dataRest } = useGetMostViewedCar({ date: today });

  useEffect(() => {
    window.Echo.channel("most_view_car_online").listen(
      "MostViewCarEvent",
      async (e: any) => {
        setData(e?.data ? e?.data[0] : []);
      }
    );
  }, []);

  const liveData = data && data?.length > 0 ? data : dataRest;

  return <>{liveData && <TableMostViewedCar mostViewedCar={liveData} />}</>;
}
