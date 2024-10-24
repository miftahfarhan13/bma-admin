import { Box, Input, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import DashboardCounterData from "./DashboardCounterData";
import useGetDashboard from "@/utils/hooks/dashboard/useGetDashboard";
import ButtonExportDashboard from "../ButtonExportDashboard";
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";

export default function DashboardCounterHistorical() {
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";

  const [date, setDate] = useState("");

  const { data, refetch } = useGetDashboard({ dateProps: date });

  return (
    <>
      <Stack direction="column" spacing="20px">
        <Stack
          direction="row"
          spacing="10px"
          alignSelf="end"
          w={["100%", "100%", "fit-content", "fit-content"]}
        >
          {isAdmin ? (
            <>
              <Input
                value={date}
                onChange={(event) => {
                  setDate(event?.target?.value);
                  refetch(event?.target?.value);
                }}
                type="date"
              />
              <ButtonExportDashboard date={date} />
            </>
          ) : (
            <Box h="40px" />
          )}
        </Stack>

        <SimpleGrid
          columns={[2, 2, 3, 5]}
          gap={["10px", "10px", "20px", "20px"]}
        >
          <DashboardCounterData data={data} />
        </SimpleGrid>
      </Stack>
    </>
  );
}
