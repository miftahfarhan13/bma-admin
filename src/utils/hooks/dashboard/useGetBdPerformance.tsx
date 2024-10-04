import { getBdPerformances } from "@/networks/user";
import { useEffect, useRef, useState } from "react";

export default function useGetBdPerformance({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchDashboard = (startDate: string, endDate: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBdPerformances({
      isPaginate: "false",
      token,
      page: "",
      show: "",
      date: "",
      startDate,
      endDate,
      isRange: true
    })
      .then((response) => {
        setData(response?.data?.result);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (firstRun.current) {
      fetchDashboard(startDate, endDate);
      firstRun.current = false;
    }
  }, []);

  const refetch = (startDate: string, endDate: string) => {
    fetchDashboard(startDate, endDate);
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
