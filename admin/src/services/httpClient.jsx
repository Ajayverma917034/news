import axios from "axios";
import { handleRefreshToken } from "./refreshToken";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 400 &&
      originalRequest.url.includes("refresh-token")
    ) {
      // console.log("IN stop");
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // console.log("IN stop 2");
        const response = await handleRefreshToken();
        const { accessToken, refreshToken } = response.data;
        // console.log(accessToken, refreshToken);

        // Save tokens in cookies
        document.cookie = `accessToken=${accessToken};`;
        document.cookie = `refreshToken=${refreshToken};`;

        // Retry the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
