import AdminLayout from "@/components/AppLayout/AdminLayout";
import ListCar from "@/components/Car/ListCar";
import React from "react";

export default function Car() {
  return (
    <>
      <AdminLayout name="Car" pageName="Information Car">
        <ListCar />
      </AdminLayout>
    </>
  );
}
