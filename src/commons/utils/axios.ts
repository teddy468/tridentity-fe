import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, REFRESH_TOKEN_KEY, TOKEN_KEY } from "../constants";

const getToken = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  } catch {
    return null;
  }
};

const defaultAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "api-key": "api-key-test",

    // "ngrok-skip-browser-warning": true
  },
});

export const handleRefreshToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (refreshToken) {
    try {
      const body: RefreshTokenBody = { refresh_token: refreshToken };
      const res = await axios.post<RefreshTokenResponse>(BASE_URL + "auth/refresh-token", body);
      localStorage.setItem(TOKEN_KEY, res.data.access_token);
      return res.data.access_token;
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      window.location.reload();
    }
  }
  return null;
};

defaultAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers?.set("Authorization", "Bearer " + token);

  config.headers?.set("allowRetry", true);

  config.headers?.set("Content-Type", "application/json");
  return config;
});

defaultAxios.interceptors.response.use(
  undefined,
  async (error: { config: AxiosRequestConfig; response: AxiosResponse }) => {
    const config = error.config;
    const allowRetry = typeof config.headers?.get === "function" && config.headers?.get("allowRetry");
    if (error.response.status === 401 && allowRetry) {
      const token = await handleRefreshToken();
      if (token && typeof config.headers?.set === "function") {
        config.headers?.set("allowRetry", null);

        return defaultAxios(config);
      }
    }
    return Promise.reject(error);
  }
);

const uploadAxios = axios.create({ baseURL: BASE_URL, headers: { "api-key": "api-key-test" } });

uploadAxios.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers?.set("Authorization", "Bearer " + token);
  config.headers?.set("allowRetry", true);
  config.headers?.set("Content-Type", "multipart/form-data");
  return config;
});

uploadAxios.interceptors.response.use(
  undefined,
  async (error: { config: AxiosRequestConfig; response: AxiosResponse }) => {
    const config = error.config;
    const allowRetry = typeof config.headers?.get === "function" && config.headers?.get("allowRetry");
    if (error.response.status === 401 && allowRetry) {
      if (typeof config.headers?.set === "function") {
        config.headers?.set("allowRetry", null);
        return uploadAxios(config);
      }
    }
    return Promise.reject(error);
  }
);

export { defaultAxios, uploadAxios };

export default defaultAxios;
