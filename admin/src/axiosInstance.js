import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Adjust this URL according to your backend server configuration
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
