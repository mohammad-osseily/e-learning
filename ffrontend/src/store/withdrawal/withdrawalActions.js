import axios from "axios";
import { withdrawalActions } from "./withdrawalSlice";
import Swal from "sweetalert2";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getWithdrawals = (studentId) => async (dispatch) => {
  dispatch(withdrawalActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/withdrawal/student/${studentId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    dispatch(withdrawalActions.fetchSuccess(response.data));
  } catch (error) {
    console.log("Error creating withdrawal:", error);
    if (error.response) {
      dispatch(withdrawalActions.fetchFail(error.response.data));
    } else {
      dispatch(withdrawalActions.fetchFail("Network error or no response"));
    }
    Swal.fire({
      title: "Error!",
      text: "Error creating withdrawal",
      icon: "error",
      timer: 3000,
      showConfirmButton: false,
    });
  }
};

export const createWithdrawal = (classId, studentId) => async (dispatch) => {
  dispatch(withdrawalActions.fetchRequest());
  console.log(classId, studentId);

  try {
    const token = getToken();
    const url = "http://localhost:4000/api/withdrawal";
    const response = await axios.post(
      url,
      { class: classId, reason: "personal" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    Swal.fire({
      title: "Success!",
      text: "Withdrawal created successfully",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
    dispatch(withdrawalActions.fetchSuccess());
    dispatch(getWithdrawals(studentId));
  } catch (error) {
    console.log("Error creating withdrawal:", error);
    if (error.response) {
      dispatch(withdrawalActions.fetchFail(error.response.data));
    } else {
      dispatch(withdrawalActions.fetchFail("Network error or no response"));
    }
    Swal.fire({
      title: "Error!",
      text: "Error creating withdrawal",
      icon: "error",
      timer: 3000,
      showConfirmButton: false,
    });
  }
};
