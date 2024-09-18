import AdminLayout from "@/components/AppLayout/AdminLayout";
import ListBrand from "@/components/Car/ListBrand";
import React from "react";

export default function Brand() {
  return (
    <>
      <AdminLayout name="Car" pageName="Information Brand">
        <ListBrand />
      </AdminLayout>
    </>
  );
}
