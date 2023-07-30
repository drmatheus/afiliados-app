import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("planilhasNormalizer@token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
