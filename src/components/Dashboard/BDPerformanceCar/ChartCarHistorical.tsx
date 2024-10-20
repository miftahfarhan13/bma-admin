import SelectDateRange from "@/components/AppComponents/SelectDateRange";
import { Box, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import ChartCar from "./ChartCar";
import useGetChartCarPerformance from "@/utils/hooks/dashboard/useGetChartCarPerformance";

export default function ChartCarHistorical() {
  const [dateRanges, setDateRanges] = useState(["", ""]);

  const { data, isLoading, refetch } = useGetChartCarPerformance({
    startDate: dateRanges[0],
    endDate: dateRanges[1],
  });

  return (
    <>
      <Stack direction="column" gap="10px">
        <Box alignSelf="end">
          <SelectDateRange
            dateRanges={dateRanges}
            onChangeDateRanges={(value) => {
              setDateRanges(value);
              refetch(value[0], value[1]);
            }}
          />
        </Box>
        <ChartCar isLoading={isLoading} data={data} />
      </Stack>
    </>
  );
}
