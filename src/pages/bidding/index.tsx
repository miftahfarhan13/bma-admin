import { Stack } from "@chakra-ui/react";
import AdminLayout from "@/components/AppLayout/AdminLayout";
import { useState } from "react";
import dynamic from "next/dynamic";
import ButtonLive from "@/components/AppComponents/ButtonLive";

const BiddingInformationHistorical = dynamic(
  () => import("@/components/Bidding/BiddingInformationHistorical")
);

const BiddingInformationLive = dynamic(
  () => import("@/components/Bidding/BiddingInformationLive")
);
export default function Account() {
  const [isLive, setIsLive] = useState(false);

  return (
    <>
      <AdminLayout name="Bidding Information" pageName="Bidding Information">
        <Stack direction="column" spacing={["20px", "20px", "40px", "40px"]}>
          <Stack direction="column" spacing="20px">
            <ButtonLive isLive={isLive} onClick={() => setIsLive(!isLive)} />
            {isLive ? (
              <>
                <BiddingInformationLive />
              </>
            ) : (
              <>
                <BiddingInformationHistorical />
              </>
            )}
          </Stack>
        </Stack>
      </AdminLayout>
    </>
  );
}
