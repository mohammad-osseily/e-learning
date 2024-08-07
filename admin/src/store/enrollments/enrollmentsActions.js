import axiosInstance from "../../axiosInstance";
import { enrollmentsActions } from "./enrollmentsSlice";
import Swal from "sweetalert2";

export const getEnrollments = () => async (dispatch) => {
  dispatch(enrollmentsActions.fetchRequest());
  try {
    const response = await axiosInstance.get("/enrollment");
    dispatch(enrollmentsActions.fetchSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error fetching enrollments";
    Swal.fire("Error", errorMessage, "error");
    dispatch(enrollmentsActions.fetchFail(errorMessage));
  }
};
