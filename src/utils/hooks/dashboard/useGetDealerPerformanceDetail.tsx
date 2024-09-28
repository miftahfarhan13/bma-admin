import { getDealerPerformanceDetail } from "@/networks/dashboard";
import { useEffect, useState } from "react";

export default function useGetDealerPerformanceDetail({
  id,
  date,
  isOpen,
}: {
  id: string;
  date: string;
  isOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchTableDealerPerformanceDetail = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getDealerPerformanceDetail(token, id, date)
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchTableDealerPerformanceDetail();
    }
  }, [id, isOpen]);

  const refetch = () => {
    fetchTableDealerPerformanceDetail();
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
