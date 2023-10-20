import { AxiosInstance } from "axios";
import { useCallback } from "react";
import defaultAxios from "../utils/axios";
import {
  URL_ACTIVATE_ACCOUNT,
  URL_LINK_ADDRESS,
  URL_LOGIN,
  URL_LOGIN_METAMASK,
  URL_REGISTER,
  URL_UPDATE_INFORMATION,
} from "../constants/apiUrl";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const login = useCallback(async (email: string, password: string) => {
    let service: AxiosInstance = defaultAxios;

    try {
      const res = await service.post(URL_LOGIN, { email, password });
      return res;
    } catch (error) {
      throw error;
    }
  }, []);

  const loginMetamask = useCallback(async (address: string, sig: string) => {
    let service: AxiosInstance = defaultAxios;

    try {
      const res = await service.post(URL_LOGIN_METAMASK, { address, sig });
      return res;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateInformation = useCallback(
    async (email: string, username: string, password: string) => {
      let service: AxiosInstance = defaultAxios;

      try {
        const res = await service.put(URL_UPDATE_INFORMATION, {
          email,
          username,
          password,
        });
        return res;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const signup = useCallback(
    async (email: string, username: string, password: string) => {
      let service: AxiosInstance = defaultAxios;

      try {
        const res = await service.post(URL_REGISTER, {
          email,
          username,
          password,
        });

        return res;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const activateAccount = useCallback(async (token: string) => {
    let service: AxiosInstance = defaultAxios;

    try {
      const res = await service.put(URL_ACTIVATE_ACCOUNT, { token });
      return res;
    } catch (error) {
      throw error;
    }
  }, []);

  const linkAddress = useCallback(async (address: string, sig: string) => {
    let service: AxiosInstance = defaultAxios;

    try {
      const res = service.put(URL_LINK_ADDRESS, { address, sig });
      return res;
    } catch (error) {
      throw error;
    }
  }, []);

  const checkMappingAddress = (token: string) => {
    let userAddress = "";

    if (!token) return userAddress;

    const decoded: any = jwtDecode(token);

    if (!decoded.metamask_address) return userAddress;

    userAddress = decoded.metamask_address;

    return userAddress;
  };

  return {
    login,
    loginMetamask,
    updateInformation,
    signup,
    activateAccount,
    linkAddress,
    checkMappingAddress,
  };
};

export default useAuth;
