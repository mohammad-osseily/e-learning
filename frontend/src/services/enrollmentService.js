import axiosInstance from "./axiosInstance";

const createEnrollment = (enrollmentData) => {
  return axiosInstance.post("/enrollment", enrollmentData);
};

const getEnrollments = () => {
  return axiosInstance.get("/enrollment");
};

export default { createEnrollment, getEnrollments };
