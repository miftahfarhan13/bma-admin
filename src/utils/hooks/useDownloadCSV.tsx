import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";

export default function useDownloadCSV() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const downloadCSV = async ({
    url,
    fileName,
  }: {
    url: string;
    fileName: string;
  }) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token") || "";
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "text/csv",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setIsLoading(false);
        toast({
          title: "Failed",
          description: "Gagal export data!",
          status: "error",
          isClosable: true,
          position: "top",
        });
      }

      setIsLoading(false);
      const blob = await response.blob();
      const fileUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName; // Nama file yang akan di-download
      document.body.appendChild(a); // Tambahkan elemen <a> ke body
      a.click(); // Trigger download
      a.remove(); // Hapus elemen <a> setelah selesai
    } catch (error) {
      setIsLoading(false);
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

  return { isLoading, downloadCSV };
}
