import axios, { AxiosInstance } from "axios";
import { useCallback, useEffect, useState } from "react";
import defaultAxios from "../utils/axios";
import { getUrlSearchParams } from "../utils/getQueryString";

interface Params extends PaginationQuery {
  [key: string]: string | number | boolean | undefined;
}

interface FetchReturnType<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  total: number;
  totalPage: number;
  refresh: () => void;
}

const useFetchList = <T>(url: string, params: Params = {}): FetchReturnType<T> => {
  const [data, setData] = useState<T[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const getList = useCallback(async () => {
    if (!url) return;
    let service: AxiosInstance = defaultAxios;
    if (url.search("http://") === 0 || url.search("https://") === 0) {
      service = axios;
    }
    setLoading(true);
    try {
      const baseURL = url.split("?")[0];
      const lastURL = url.split("?")[1];
      const queryUrl = getUrlSearchParams({ ...params, paginationMetadataStyle: "body" });
      const res = await service.get<PaginationData<T>>(`${baseURL}?${lastURL ? `${lastURL}&` : ""}${queryUrl}`);
      const { data, metadata } = res.data;
      setData(data);
      setTotal(metadata["x-total-count"]);
      setTotalPage(metadata["x-pages-count"]);
      setError(null);
      setInitialized(true);
    } catch (error: any) {
      setData([]);
      setError(error?.response?.data?.message || error?.message);
    }
    setLoading(false);
  }, [url, JSON.stringify(params)]);

  useEffect(() => {
    getList();
  }, [getList]);

  return {
    data,
    loading,
    error,
    initialized,
    total,
    totalPage,
    refresh: getList,
  };
};

export default useFetchList;
