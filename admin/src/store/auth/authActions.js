import axiosInstance from "../../axiosInstance";
import { authActions } from "./authSlice";
import Swal from "sweetalert2";

export const login =
  ({ email, password, navigate }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.loginSuccess(response.data));
      Swal.fire("Success", "Login successful", "success");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      Swal.fire("Error", errorMessage, "error");
      dispatch(authActions.loginFail(errorMessage));
    }
  };

export const signup =
  ({ name, email, password, phone_number, navigate }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance.post("/users", {
        name,
        email,
        password,
        phone_number,
      });
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.signupSuccess(response.data));
      Swal.fire("Success", "Signup successful", "success");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Signup failed";
      Swal.fire("Error", errorMessage, "error");
      dispatch(authActions.signupFail(errorMessage));
    }
  };

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(authActions.logout());
  Swal.fire("Success", "Logout successful", "success");
  navigate("/");
};
