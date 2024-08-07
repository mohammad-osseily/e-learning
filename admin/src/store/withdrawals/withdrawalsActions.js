import axiosInstance from "../../axiosInstance";
import { withdrawalsActions } from "./withdrawalsSlice";
import Swal from "sweetalert2";

export const getWithdrawals = () => async (dispatch) => {
  dispatch(withdrawalsActions.fetchRequest());
  try {
    const response = await axiosInstance.get("/withdrawal");
    dispatch(withdrawalsActions.fetchSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error fetching withdrawals";
    Swal.fire("Error", errorMessage, "error");
    dispatch(withdrawalsActions.fetchFail(errorMessage));
  }
};

export const approveWithdrawal = (withdrawalId) => async (dispatch) => {
  dispatch(withdrawalsActions.fetchRequest());
  try {
    await axiosInstance.patch(`/withdrawal/${withdrawalId}`, {
      status: "approved",
    });
    Swal.fire("Success", "Withdrawal approved", "success");
    dispatch(getWithdrawals());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error approving withdrawal";
    Swal.fire("Error", errorMessage, "error");
    dispatch(withdrawalsActions.fetchFail(errorMessage));
  }
};

export const rejectWithdrawal = (withdrawalId) => async (dispatch) => {
  dispatch(withdrawalsActions.fetchRequest());
  try {
    await axiosInstance.patch(`/withdrawal/${withdrawalId}`, {
      status: "rejected",
    });
    Swal.fire("Success", "Withdrawal rejected", "success");
    dispatch(getWithdrawals());
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error rejecting withdrawal";
    Swal.fire("Error", errorMessage, "error");
    dispatch(withdrawalsActions.fetchFail(errorMessage));
  }
};
