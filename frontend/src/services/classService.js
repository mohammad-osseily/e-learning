import axiosInstance from "./axiosInstance";

const getClasses = () => {
  return axiosInstance.get("/classes");
};

const getClassById = (id) => {
  return axiosInstance.get(`/classes/${id}`);
};

export default { getClasses, getClassById };
