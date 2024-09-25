import { Box, Stack } from "@chakra-ui/react";
import AdminLayout from "@/components/AppLayout/AdminLayout";
import TabDashboard from "@/components/Dashboard/TabDashboard";
import TopPerformanceCar from "@/components/Dashboard/TopPerformanceCar";
import { useState } from "react";
import ButtonLive from "@/components/AppComponents/ButtonLive";
import dynamic from "next/dynamic";

const DashboardCounterHistorical = dynamic(
  () =>
    import("@/components/Dashboard/DashboardCounter/DashboardCounterHistorical")
);

const DashboardCounterLive = dynamic(
  () => import("@/components/Dashboard/DashboardCounter/DashboardCounterLive")
);

export default function Home() {
  const [isLive, setIsLive] = useState(false);
  return (
    <>
      <AdminLayout name="Biding Performance" pageName="Bidding Performance">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <TabDashboard name="Live Performance Car" />
          <Box position="relative">
            <Stack direction="column" spacing="20px">
              <Box
                position={
                  isLive
                    ? "static"
                    : ["static", "static", "absolute", "absolute"]
                }
                mb={["20px", "20px", "0px", "0px"]}
                top={0}
                left={0}
              >
                <ButtonLive
                  isLive={isLive}
                  onClick={() => setIsLive(!isLive)}
                />
              </Box>

              {isLive ? (
                <>
                  <DashboardCounterLive />
                </>
              ) : (
                <>
                  <DashboardCounterHistorical />
                </>
              )}
            </Stack>
          </Box>

          <TopPerformanceCar />
        </Stack>
      </AdminLayout>
    </>
  );
}
