import AdminLayout from "@/components/AppLayout/AdminLayout";
import ListLogBid from "@/components/LogBid/ListLogBid";
import React from "react";

export default function LogBid() {
  return (
    <>
      <AdminLayout name="Log Bid" pageName="Log Bid">
        <ListLogBid />
      </AdminLayout>
    </>
  );
}
