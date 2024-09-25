import { Button, Input, Stack } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import DashboardCounterData from "./DashboardCounterData";
import useGetDashboard from "@/utils/hooks/dashboard/useGetDashboard";

export default function DashboardCounterHistorical() {
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
          <Input
            value={date}
            onChange={(event) => {
              setDate(event?.target?.value);
              refetch(event?.target?.value);
            }}
            type="date"
          />
          <Button
            leftIcon={<Icon icon="bx:download" />}
            variant="green-solid-medium"
            width="100%"
          >
            Export Data
          </Button>
        </Stack>

        <DashboardCounterData data={data} />
      </Stack>
    </>
  );
}
