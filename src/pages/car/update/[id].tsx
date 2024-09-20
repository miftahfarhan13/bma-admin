import AdminLayout from "@/components/AppLayout/AdminLayout";
import CreateUpdateCar from "@/components/Car/CreateUpdateCar";

export default function UpdateCar() {
  return (
    <>
      <AdminLayout name="Car" pageName="Update Car">
        <CreateUpdateCar type="update" />
      </AdminLayout>
    </>
  );
}
