import axios from "axios";
import { classesActions } from "./classesSlice";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getclasses = () => async (dispatch) => {
  dispatch(classesActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/classes/`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(classesActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching classes:", error);
    if (error.response) {
      dispatch(classesActions.fetchFail(error.response.data));
    } else {
      dispatch(classesActions.fetchFail("Network error or no response"));
    }
  }
};

export const getNotInClasses = (userId) => async (dispatch) => {
  dispatch(classesActions.fetchRequest());
  try {
    const token = getToken();
    const url = `http://localhost:4000/api/classes/notIn/${userId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(classesActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching classes:", error);
    if (error.response) {
      dispatch(classesActions.fetchFail(error.response.data));
    } else {
      dispatch(classesActions.fetchFail("Network error or no response"));
    }
  }
};
