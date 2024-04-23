import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Connection error");
        }
        const json = await response.json();
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error: any) {
        setError(error);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, isPending, error };
};
