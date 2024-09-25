import React, { useEffect, useState } from "react";
import DashboardCounterData from "./DashboardCounterData";
import useGetDashboard from "@/utils/hooks/dashboard/useGetDashboard";
import useEcho from "@/utils/hooks/useEcho";
import moment from "moment";

export default function DashboardCounterLive() {
  useEcho();

  const today = moment(new Date()).format('YYYY-MM-DD')
  const [data, setData] = useState({});

  const { data: dataRest } = useGetDashboard({ dateProps: today });

  useEffect(() => {
    window.Echo.channel("dashboard_online").listen(
      "DashboardEvent",
      async (e: any) => {
        console.log(e)
        setData(e?.data ? e?.data[0] : {});
      }
    );
  }, []);

  const liveData = data ? data : dataRest;

  return (
    <>
      <DashboardCounterData data={liveData} />
    </>
  );
}
