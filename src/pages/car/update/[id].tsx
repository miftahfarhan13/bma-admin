import AdminLayout from "@/components/AppLayout/AdminLayout";
import CreateUpdateCar from "@/components/Car/CreateUpdateCar";
import useGetCarById from "@/utils/hooks/car/useGetCarById";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default function UpdateCar({ id }: { id: string }) {
  const { data, isLoading } = useGetCarById({ id });
  return (
    <>
      <AdminLayout name="Car" pageName="Update Car">
        {isLoading ? (
          <></>
        ) : (
          <>
            <CreateUpdateCar id={id} car={data} type="update" />
          </>
        )}
      </AdminLayout>
    </>
  );
}
