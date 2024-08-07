import axiosInstance from "../../axiosInstance";
import { classesActions } from "./classesSlice";
import Swal from "sweetalert2";

export const addClass = (classData) => async (dispatch) => {
  dispatch(classesActions.fetchRequest());
  try {
    const response = await axiosInstance.post("/classes", classData);
    dispatch(classesActions.addClassSuccess(response.data));
    Swal.fire("Success", "Class added successfully", "success");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error adding class";
    Swal.fire("Error", errorMessage, "error");
    dispatch(classesActions.fetchFail(errorMessage));
  }
};

export const getClasses = () => async (dispatch) => {
  dispatch(classesActions.fetchRequest());
  try {
    const response = await axiosInstance.get("/classes");
    dispatch(classesActions.fetchSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error fetching classes";
    Swal.fire("Error", errorMessage, "error");
    dispatch(classesActions.fetchFail(errorMessage));
  }
};
