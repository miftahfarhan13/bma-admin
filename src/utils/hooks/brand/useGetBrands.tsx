import { getBrands } from "@/networks/brand";
import { useEffect, useRef, useState } from "react";

export default function useGetBrands() {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchBrands = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBrands("false", token)
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setData([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (firstRun.current) {
      fetchBrands();
      firstRun.current = false;
    }
  }, []);

  return {
    isLoading,
    data,
  };
}
