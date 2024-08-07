import axios from "axios";

const API_URL = "http://localhost:4000/api/users";

const register = (userData) => {
  return axios.post(API_URL, userData);
};

const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export default { register, login };
