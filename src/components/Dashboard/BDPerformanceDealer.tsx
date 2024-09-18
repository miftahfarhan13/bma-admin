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
import { Box, Stack, Text } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BDPerformanceDealer() {
  return (
    <>
      <Box border="1px solid #DBDBDB" p="10px" borderRadius="8px">
        <Stack direction="column" spacing="10px" alignItems="center">
          <Text fontWeight="700">BD Performance (Unique Dealer)</Text>
          <Bar
            data={{
              labels: ["BD A", "BD B", "BD C"],
              datasets: [
                { label: "BD A", data: [10, 20, 30], backgroundColor: ["#E77A7A"] },
                {
                  label: "BD B",
                  data: [5, 10, 15],
                  backgroundColor: ["#FBE569"],
                },
                {
                  label: "BD C",
                  data: [5, 10, 15],
                  backgroundColor: ["#9DF3A6"],
                },
              ],
            }}
          />
        </Stack>
      </Box>
    </>
  );
}
