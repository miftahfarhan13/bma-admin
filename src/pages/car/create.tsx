import AdminLayout from "@/components/AppLayout/AdminLayout";
import CreateUpdateCar from "@/components/Car/CreateUpdateCar";

export default function CreateCar() {
  return (
    <>
      <AdminLayout name="Car" pageName="Create Car">
        <CreateUpdateCar type="create" />
      </AdminLayout>
    </>
  );
}
