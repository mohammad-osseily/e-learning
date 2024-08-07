import axiosInstance from "./axiosInstance";

const createWithdrawal = (withdrawalData) => {
  return axiosInstance.post("/withdrawal", withdrawalData);
};

export default { createWithdrawal };
