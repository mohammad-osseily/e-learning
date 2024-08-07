import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";

const createEnrollment = async (enrollmentData) => {
  try {
    const response = await axiosInstance.post("/enrollment", enrollmentData);
    Swal.fire({
      title: "Success!",
      text: "Enrollment successful",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Enrollment failed";
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
      timer: 3000,
      showConfirmButton: false,
    });
    throw err;
  }
};

const getEnrollments = async () => {
  try {
    const response = await axiosInstance.get("/enrollment");
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default { createEnrollment, getEnrollments };
