import { getBidsSummaryByCarId } from "@/networks/car";
import { useEffect, useRef, useState } from "react";

export default function useGetBidsSummaryByCarId({ carId }: { carId: string }) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchGetCarBidsSummary = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBidsSummaryByCarId(carId, token)
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
      fetchGetCarBidsSummary();
      firstRun.current = false;
    }
  }, []);

  const refetch = () => {
    fetchGetCarBidsSummary();
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
