import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";

const createWithdrawal = async (withdrawalData) => {
  try {
    const response = await axiosInstance.post("/withdrawal", withdrawalData);
    Swal.fire({
      title: "Success!",
      text: "Withdrawal request submitted successfully",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
    return response.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Withdrawal request failed";
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

export default { createWithdrawal };
