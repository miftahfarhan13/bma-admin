import { getLastSeenSummaryByCarId } from "@/networks/car";
import { useEffect, useRef, useState } from "react";

export default function useGetLastSeenSummaryByCarId({ carId }: { carId: string }) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchGetLastSeenSummary = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getLastSeenSummaryByCarId(carId, token)
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
      fetchGetLastSeenSummary();
      firstRun.current = false;
    }
  }, []);

  const refetch = () => {
    fetchGetLastSeenSummary();
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
