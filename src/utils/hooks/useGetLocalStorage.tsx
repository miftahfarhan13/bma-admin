import { useEffect, useState } from "react";

export default function useGetLocalStorage(key: string) {
  const [item, setItem] = useState<any>();

  useEffect(() => {
    const local = localStorage.getItem(key);
    if (local) {
      setItem(local);
    }
  }, []);

  return { item };
}
