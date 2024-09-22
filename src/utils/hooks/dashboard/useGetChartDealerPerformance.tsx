import {
  getChartDealerPerformance,
} from "@/networks/dashboard";
import { useEffect, useRef, useState } from "react";

export default function useGetChartDealerPerformance() {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchMostViewedCar = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getChartDealerPerformance(token)
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
      fetchMostViewedCar();
      firstRun.current = false;
    }
  }, []);

  const refetch = () => {
    fetchMostViewedCar();
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
