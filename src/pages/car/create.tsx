import AdminLayout from "@/components/AppLayout/AdminLayout";
import { useRouter } from "next/router";
import CreateUpdateCar from "@/components/Car/CreateUpdateCar";

export default function CreateCar() {
  const router = useRouter();
  const role = router.query.role?.toString() || "";
  return (
    <>
      <AdminLayout name="Car" pageName="Create Car">
        <CreateUpdateCar role={role} type="create" />
      </AdminLayout>
    </>
  );
}
