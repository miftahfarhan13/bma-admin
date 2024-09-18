import { Button, SimpleGrid, Stack } from "@chakra-ui/react";
import AdminLayout from "@/components/AppLayout/AdminLayout";
import TabDashboard from "@/components/Dashboard/TabDashboard";
import CounterCard from "@/components/Dashboard/CounterCard";
import TopPerformanceCar from "@/components/Dashboard/TopPerformanceCar";
import { Icon } from "@iconify/react/dist/iconify.js";
import DatePicker from "@/components/DatePicker";
import { useEffect, useState } from "react";
import useEcho from "@/utils/hooks/useEcho";

export default function Home() {
  const [date, setDate] = useState(new Date());
  const echo = useEcho();

  useEffect(() => {
    if (echo) {
      echo.private("testingok").listen("Testing", (event: any) => {
        console.log("dashboard: ", event);
      });
    }
  }, []);

  return (
    <>
      <AdminLayout name="Biding Performance" pageName="Bidding Performance">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <TabDashboard name="Live Performance Car" />
          <Stack direction="row" spacing="10px" alignSelf="end">
            <DatePicker
              selected={date}
              onChange={(event) => setDate(new Date(event || ""))}
            />
            <Button
              leftIcon={<Icon icon="bx:download" />}
              variant="green-solid-medium"
              width="100%"
            >
              Export Data
            </Button>
          </Stack>
          <SimpleGrid
            columns={[2, 2, 3, 5]}
            gap={["10px", "10px", "20px", "20px"]}
          >
            <CounterCard icon="bxs:car" label="Total Cars" value="100" />
            <CounterCard icon="f7:hammer-fill" label="Total Bid" value="210" />
            <CounterCard
              icon="f7:hammer-fill"
              label="Uniq Dealer Bid"
              value="25"
            />
            <CounterCard
              icon="fa6-solid:users"
              label="Login Dealer"
              value="30"
            />
            <CounterCard icon="mdi:users" label="Live Dealer" value="5" />
            <CounterCard
              icon="mdi:car-side"
              label="Bided Cars"
              value="80/100 (80%)"
            />
            <CounterCard
              icon="mdi:car-side"
              label="BO cars"
              value="20/20 (100%)"
            />
            <CounterCard
              icon="mdi:car-side"
              label="Owner Cars"
              value="18/20 (90%)"
            />
            <CounterCard
              icon="mdi:car-side"
              label="SA Cars"
              value="15/20 (75%)"
            />
            <CounterCard
              icon="mdi:car-side"
              label="Corp Cars"
              value="10/20 (50%)"
            />
          </SimpleGrid>

          <TopPerformanceCar />
        </Stack>
      </AdminLayout>
    </>
  );
}
