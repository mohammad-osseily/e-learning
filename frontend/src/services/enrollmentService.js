import axiosInstance from "./axiosInstance";

const getEnrollments = async () => {
  try {
    const response = await axiosInstance.get("/enrollment");
    return response.data;
  } catch (err) {
    throw err;
  }
};

const createEnrollment = async (enrollmentData) => {
  try {
    const response = await axiosInstance.post("/enrollment", enrollmentData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default { getEnrollments, createEnrollment };
