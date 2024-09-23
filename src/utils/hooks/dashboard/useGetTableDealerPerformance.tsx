import { getTableDealerPerformance } from "@/networks/dashboard";
import { useEffect, useRef, useState } from "react";

export default function useGetTableDealerPerformance({
  search,
}: {
  search: string;
}) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchTableDealerPerformance = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getTableDealerPerformance(token, search)
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (firstRun.current) {
      fetchTableDealerPerformance();
      firstRun.current = false;
    }
  }, []);

  const refetch = () => {
    fetchTableDealerPerformance();
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
