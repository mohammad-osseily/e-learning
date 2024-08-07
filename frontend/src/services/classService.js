import axiosInstance from "./axiosInstance";

const getClasses = async () => {
  try {
    const response = await axiosInstance.get("/classes");
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default { getClasses };
