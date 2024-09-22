import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import useGetChartDealerPerformance from "@/utils/hooks/dashboard/useGetChartDealerPerformance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BDPerformanceDealer() {
  const { data, isLoading } = useGetChartDealerPerformance();
  return (
    <>
      <Box border="1px solid #DBDBDB" p="10px" borderRadius="8px">
        <Stack direction="column" spacing="10px" alignItems="center">
          <Text fontWeight="700">BD Performance (Unique Dealer)</Text>
          {isLoading ? (
            <>
              <Skeleton />
            </>
          ) : (
            <>{data && <Bar data={data} />}</>
          )}
        </Stack>
      </Box>
    </>
  );
}
