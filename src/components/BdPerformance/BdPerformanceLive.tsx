import React, { useEffect, useState } from "react";
import useEcho from "@/utils/hooks/useEcho";
import moment from "moment";
import TableBdPerformance from "./TableBdPerformance";
import useGetBdPerformance from "@/utils/hooks/dashboard/useGetBdPerformance";

export default function BdPerformanceLive() {
  useEcho();

  const today = moment(new Date()).format("YYYY-MM-DD");
  const [data, setData] = useState();

  const { data: dataRest } = useGetBdPerformance({
    startDate: today,
    endDate: today,
  });

  useEffect(() => {
    window.Echo.channel("car_dealer_online").listen(
      "CarDealerEvent",
      async (e: any) => {
        console.log(e);
        setData(e?.data ? e?.data[0] : undefined);
      }
    );
  }, []);

  const liveData = data ? data : dataRest;

  return (
    <>
      <TableBdPerformance
        data={liveData}
        startDate={today}
        endDate={today}
        date=""
        isRange={true}
      />
    </>
  );
}
