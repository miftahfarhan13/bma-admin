import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
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
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartCar({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: any;
}) {
  return (
    <>
      <Box border="1px solid #DBDBDB" p="10px" borderRadius="8px">
        <Stack direction="column" spacing="10px" alignItems="center">
          <Text fontWeight="700">BD Performance (Unique Cars)</Text>

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
