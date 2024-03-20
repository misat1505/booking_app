import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type useFetchReturnType<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  status: number | null;
};

export default function useFetch<T>(
  url: string,
  options?: AxiosRequestConfig | undefined
): useFetchReturnType<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url, options);
        setData(response.data);
        setStatus(response.status);
      } catch (e) {
        setError(new Error());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error, status };
}
