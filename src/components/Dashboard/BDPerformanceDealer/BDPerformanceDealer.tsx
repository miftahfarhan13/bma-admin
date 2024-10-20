import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Stack } from "@chakra-ui/react";
import ButtonLive from "../../AppComponents/ButtonLive";
import ChartDealerLive from "./ChartDealerLive";
import ChartDealerHistorical from "./ChartDealerHistorical";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BDPerformanceDealer() {
  const [isLive, setIsLive] = useState(false);

  return (
    <>
      <Stack position="relative">
        <Box position="absolute" top={-1} left={0}>
          <ButtonLive isLive={isLive} onClick={() => setIsLive(!isLive)} />
        </Box>

        {isLive ? (
          <>
            <Box mt="43px">
              <ChartDealerLive />
            </Box>
          </>
        ) : (
          <>
            <ChartDealerHistorical />
          </>
        )}
      </Stack>
    </>
  );
}
