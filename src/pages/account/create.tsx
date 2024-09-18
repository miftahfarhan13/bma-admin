import AdminLayout from "@/components/AppLayout/AdminLayout";
import CreateUpdateAccount from "@/components/Account/CreateUpdateAccount";
import { useRouter } from "next/router";

export default function Account() {
  const router = useRouter();
  const role = router.query.role?.toString() || "";
  return (
    <>
      <AdminLayout name="Akun" pageName="Create Account">
        <CreateUpdateAccount role={role} type="create" />
      </AdminLayout>
    </>
  );
}
