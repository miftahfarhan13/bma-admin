import useGetChartCarPerformance from "@/utils/hooks/dashboard/useGetChartCarPerformance";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ChartCar from "./ChartCar";
import useEcho from "@/utils/hooks/useEcho";

export default function ChartCarLive() {
  useEcho();

  const [data, setData] = useState();
  const today = moment(new Date()).format("YYYY-MM-DD");

  const { data: dataChart, isLoading } = useGetChartCarPerformance({
    startDate: today,
    endDate: today,
  });

  useEffect(() => {
    window.Echo.channel("chart_car_online").listen(
      "ChartCarEvent",
      async (e: any) => {
        setData(e?.data ? e?.data[0] : undefined);
      }
    );
  }, []);

  const liveData = data ? data : dataChart;
  return (
    <>
      <ChartCar isLoading={isLoading} data={liveData} />
    </>
  );
}
