import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "localhost:8082/api/v1",
  withCredentials: true,
});