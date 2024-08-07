import axios from "axios";
import { enrollmentActions } from "./enrollmentSlice";
import Swal from "sweetalert2";
import { getNotInClasses } from "../classes/classesActions";

const getToken = () => {
  return localStorage.getItem("token");
};

export const createEnroll = (studentId, classId) => async (dispatch) => {
  dispatch(enrollmentActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/enrollment`;
    const response = await axios.post(
      url,
      { student: studentId, class: classId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(enrollmentActions.createEnrollmentSuccess(response.data));
    dispatch(getNotInClasses(studentId));
    Swal.fire({
      title: "Success!",
      text: "Enrollment created successfully",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.log("Error creating enrollment:", error);
    if (error.response) {
      dispatch(enrollmentActions.fetchFail(error.response.data));
    } else {
      dispatch(enrollmentActions.fetchFail("Network error or no response"));
    }
    Swal.fire({
      title: "Error!",
      text: "Error creating enrollment",
      icon: "error",
      timer: 3000,
      showConfirmButton: false,
    });
  }
};

export const getStudentEnrollments = (studentId) => async (dispatch) => {
  dispatch(enrollmentActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/enrollment/student/${studentId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(enrollmentActions.fetchSuccess(response.data));
  } catch (error) {
    console.log("Error getting enrollments:", error);
    if (error.response) {
      dispatch(enrollmentActions.fetchFail(error.response.data));
    } else {
      dispatch(enrollmentActions.fetchFail("Network error or no response"));
    }
    Swal.fire({
      title: "Error!",
      text: "Error getting enrollments",
      icon: "error",
      timer: 3000,
      showConfirmButton: false,
    });
  }
};
