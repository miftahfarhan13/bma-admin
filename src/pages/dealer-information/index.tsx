import AdminLayout from "@/components/AppLayout/AdminLayout";
import ListDealerInformation from "@/components/DealerInformation/ListDealerInformation";
import React from "react";

export default function DealerInformation() {
  return (
    <>
      <AdminLayout name="Dealer Information" pageName="Dealer Information">
        <ListDealerInformation />
      </AdminLayout>
    </>
  );
}
