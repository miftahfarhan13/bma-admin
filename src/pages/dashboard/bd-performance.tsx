import { SimpleGrid, Stack } from "@chakra-ui/react";
import AdminLayout from "@/components/AppLayout/AdminLayout";
import TabDashboard from "@/components/Dashboard/TabDashboard";
import BDPerformanceDealer from "@/components/Dashboard/BDPerformanceDealer/BDPerformanceDealer";
import PerformanceViewBid from "@/components/Dashboard/PerformanceViewBid";
import BDPerformanceCar from "@/components/Dashboard/BDPerformanceCar/BDPerformanceCar";

export default function BDPerformance() {
  return (
    <>
      <AdminLayout name="Biding Performance" pageName="Bidding Performance">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <TabDashboard name="BD & Dealer Performance" />
          <SimpleGrid columns={[1, 1, 2, 2]} gap="20px">
            <BDPerformanceDealer />
            <BDPerformanceCar />
          </SimpleGrid>
          <PerformanceViewBid />
        </Stack>
      </AdminLayout>
    </>
  );
}
