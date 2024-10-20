import { getChartCarPerformance } from "@/networks/dashboard";
import { useEffect, useRef, useState } from "react";

export default function useGetChartCarPerformance({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchMostViewedCar = (dateStart: string, dateEnd: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getChartCarPerformance({ token, startDate: dateStart, endDate: dateEnd })
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
      fetchMostViewedCar(startDate, endDate);
      firstRun.current = false;
    }
  }, []);

  const refetch = (startDate: string, endDate: string) => {
    fetchMostViewedCar(startDate, endDate);
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
