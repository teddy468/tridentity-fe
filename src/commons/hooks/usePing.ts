import { AxiosInstance } from "axios";
import { useCallback } from "react";
import { URL_PING } from "../constants/apiUrl";
import defaultAxios from "../utils/axios";

const usePing = () => {
  const getPing = useCallback(async () => {
    let service: AxiosInstance = defaultAxios;

    try {
      const res = await service.get(URL_PING);
      return res.data;
    } catch (error) {}
  }, []);

  return { getPing };
};

export default usePing;
