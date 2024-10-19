import { getTableDealerPerformance } from "@/networks/dashboard";
import { useEffect, useRef, useState } from "react";

export default function useGetTableDealerPerformance({
  search,
  startDate,
  endDate,
}: {
  search: string;
  startDate: string;
  endDate: string;
}) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchTableDealerPerformance = (dateStart: string, dateEnd: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getTableDealerPerformance(token, search, dateStart, dateEnd)
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
      fetchTableDealerPerformance(startDate, endDate);
      firstRun.current = false;
    }
  }, []);

  const refetch = (startDate: string, endDate: string) => {
    fetchTableDealerPerformance(startDate, endDate);
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
