import { Box, Stack } from "@chakra-ui/react";
import AdminLayout from "@/components/AppLayout/AdminLayout";
import { useState } from "react";
import ListAccount from "@/components/Account/ListAccount";
import BdPerformanceHistorical from "@/components/BdPerformance/BdPerformanceHistorical";
import ButtonLive from "@/components/AppComponents/ButtonLive";
import BdPerformanceLive from "@/components/BdPerformance/BdPerformanceLive";

export default function BDPerformance() {
  const [isLive, setIsLive] = useState(false);

  return (
    <>
      <AdminLayout name="BD Performance" pageName="Manage Used Car Dealer">
        <Stack
          direction="column"
          spacing={["40px", "40px", "60px", "60px"]}
          position="relative"
        >
          <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
            <Box
              position={
                isLive ? "static" : ["static", "static", "absolute", "absolute"]
              }
              mb={["20px", "20px", "0px", "0px"]}
              top={0}
              left={0}
            >
              <ButtonLive isLive={isLive} onClick={() => setIsLive(!isLive)} />
            </Box>

            {isLive ? (
              <>
                <BdPerformanceLive />
              </>
            ) : (
              <>
                <BdPerformanceHistorical />
              </>
            )}
          </Stack>

          <ListAccount />
        </Stack>
      </AdminLayout>
    </>
  );
}
