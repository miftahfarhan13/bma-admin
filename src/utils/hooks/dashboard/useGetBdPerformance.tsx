import { getBdPerformances } from "@/networks/user";
import { useEffect, useRef, useState } from "react";

export default function useGetBdPerformance({
  dateProps,
}: {
  dateProps?: string;
}) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchDashboard = (date?: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBdPerformances("false", token, "", "", date)
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
      fetchDashboard(dateProps);
      firstRun.current = false;
    }
  }, []);

  const refetch = (date?: string) => {
    fetchDashboard(date);
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
