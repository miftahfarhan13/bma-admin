import React, { useEffect, useState } from "react";
import DashboardCounterData from "./DashboardCounterData";
import useGetDashboard from "@/utils/hooks/dashboard/useGetDashboard";
import useEcho from "@/utils/hooks/useEcho";
import moment from "moment";
import { SimpleGrid } from "@chakra-ui/react";

export default function DashboardCounterLive() {
  useEcho();

  const today = moment(new Date()).format("YYYY-MM-DD");
  const [data, setData] = useState();

  const { data: dataRest } = useGetDashboard({ dateProps: today });

  useEffect(() => {
    window.Echo.channel("dashboard_online").listen(
      "DashboardEvent",
      async (e: any) => {
        console.log(e)
        setData(e?.data ? e?.data[0] : undefined);
      }
    );
  }, []);

  const liveData = data ? data : dataRest;

  return (
    <>
      <SimpleGrid columns={[2, 2, 3, 5]} gap={["10px", "10px", "20px", "20px"]}>
        <DashboardCounterData data={liveData} />
      </SimpleGrid>
    </>
  );
}
