import { Button, useToast } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function ButtonExportLogBid({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const toast = useToast();
  const [isLoading, setIsloading] = useState(false);

  const downloadCSV = async () => {
    try {
      setIsloading(true);
      const token = localStorage.getItem("token") || "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bids/export-log-bid?start_date=${startDate}&end_date=${endDate}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/csv",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setIsloading(false);
        toast({
          title: "Failed",
          description: "Gagal export data!",
          status: "error",
          isClosable: true,
          position: "top",
        });
      }

      setIsloading(false);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bids_export.csv"; // Nama file yang akan di-download
      document.body.appendChild(a); // Tambahkan elemen <a> ke body
      a.click(); // Trigger download
      a.remove(); // Hapus elemen <a> setelah selesai
    } catch (error) {
      setIsloading(false);
      toast({
        title: "Failed",
        description: "Gagal export data!",
        status: "error",
        isClosable: true,
        position: "top",
      });
      console.error("Error downloading the file", error);
    }
  };

  return (
    <>
      <Button
        leftIcon={<Icon icon="bx:download" />}
        variant="green-solid-medium"
        width="100%"
        h="34px"
        onClick={downloadCSV}
        isLoading={isLoading}
      >
        Export Data
      </Button>
    </>
  );
}
