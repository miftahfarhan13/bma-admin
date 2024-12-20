import AdminLayout from "@/components/AppLayout/AdminLayout";
import CreateUpdateAccount from "@/components/Account/CreateUpdateAccount";
import useGetAccountById from "@/utils/hooks/account/useGetAccountById";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default function UpdateAccount({ id }: { id: string }) {
  const { data, isLoading } = useGetAccountById({ id });
  return (
    <>
      <AdminLayout name="Akun" pageName="Update Account">
        {isLoading ? (
          <></>
        ) : (
          <>
            <CreateUpdateAccount
              id={id}
              name={data?.name}
              phoneNumber={data?.phone_number}
              email={data?.email}
              role={data?.roles ? data?.roles[0]?.name : ""}
              businessUserId={data?.businesses ? data?.businesses[0]?.business_user_id : ""}
              isActive={data?.is_active?.toString()}
              isDeposit={data?.is_deposit?.toString()}
              depositNominal={data?.deposit_nominal}
              depositDate={data?.deposit_date}
              accountName={data?.account_name}
              accountNumber={data?.account_number}
              bankName={data?.bank_name}
              savingBookUrl={data?.saving_book_url}
              proofTransferUrl={data?.proof_transfer_url}
              ktpUrl={data?.ktp_url}
              type="update"
              provinceProps={data?.province}
              cityProps={data?.city}
            />
          </>
        )}
      </AdminLayout>
    </>
  );
}
