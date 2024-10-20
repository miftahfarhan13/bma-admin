import useGetChartDealerPerformance from "@/utils/hooks/dashboard/useGetChartDealerPerformance";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ChartDealer from "./ChartDealer";
import useEcho from "@/utils/hooks/useEcho";

export default function ChartDealerLive() {
  useEcho();

  const [data, setData] = useState();
  const today = moment(new Date()).format("YYYY-MM-DD");

  const { data: dataChart, isLoading } = useGetChartDealerPerformance({
    startDate: today,
    endDate: today,
  });

  useEffect(() => {
    window.Echo.channel("chart_dealer_online").listen(
      "ChartDealerEvent",
      async (e: any) => {
        setData(e?.data ? e?.data[0] : undefined);
      }
    );
  }, []);

  const liveData = data ? data : dataChart;
  return (
    <>
      <ChartDealer isLoading={isLoading} data={liveData} />
    </>
  );
}
