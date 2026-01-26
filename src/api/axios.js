import { service } from "@/services";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${
      service.cache.getItem("login")?.token
    }`;

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error?.response?.status == HttpStatus.UNAUTHORIZED) {
      useAppState.setState({ user: null });
      service.cache.removeItem("login");
      toast.error("Sessão expirada. Por favor, faça login novamente.");
      window.location.href = "/login";
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
