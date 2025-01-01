import AdminLayout from "@/components/AppLayout/AdminLayout";
import DetailCar from "@/components/Car/DetailCar";
import useGetCarById from "@/utils/hooks/car/useGetCarById";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default function DetailCarPage({ id }: { id: string }) {
  const { data, isLoading } = useGetCarById({ id });
  console.log(data)
  return (
    <>
      <AdminLayout name="Car" pageName="Detail Car">
        {isLoading ? (
          <></>
        ) : (
          <>
            <DetailCar car={data} />
          </>
        )}
      </AdminLayout>
    </>
  );
}
