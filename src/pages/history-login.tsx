import AdminLayout from "@/components/AppLayout/AdminLayout";
import ListHistoryLogin from "@/components/HistoryLogin/ListHistoryLogin";
import React from "react";

export default function HistoryLogin() {
  return (
    <>
      <AdminLayout name="History Login" pageName="History Login">
        <ListHistoryLogin />
      </AdminLayout>
    </>
  );
}
