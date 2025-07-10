import axios, { type AxiosInstance } from "axios";
import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1/";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => {
    if (!response.data.success) {
      return Promise.reject(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      redirect("/login"); 
    }
    return Promise.reject(error);
  }
);

export default api;
