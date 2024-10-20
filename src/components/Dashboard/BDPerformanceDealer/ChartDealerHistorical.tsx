import SelectDateRange from "@/components/AppComponents/SelectDateRange";
import useGetChartDealerPerformance from "@/utils/hooks/dashboard/useGetChartDealerPerformance";
import { Box, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import ChartDealer from "./ChartDealer";

export default function ChartDealerHistorical() {
  const [dateRanges, setDateRanges] = useState(["", ""]);

  const { data, isLoading, refetch } = useGetChartDealerPerformance({
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
        <ChartDealer isLoading={isLoading} data={data} />
      </Stack>
    </>
  );
}
