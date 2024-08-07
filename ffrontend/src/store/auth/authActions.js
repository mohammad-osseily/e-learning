import axios from "axios";
import Swal from "sweetalert2";
import { authActions } from "./authSlice";

export const login =
  ({ email, password, navigate }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.loginSuccess(response.data));
      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
      dispatch(authActions.loginFail(errorMessage));
    }
  };

export const signup =
  ({ name, email, password, phone_number, navigate }) =>
  async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:4000/api/users", {
        name,
        email,
        password,
        phone_number,
      });
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.signupSuccess(response.data));
      Swal.fire({
        title: "Success!",
        text: "Signup successful",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.log(err);

      const errorMessage = err.response?.data?.error || "Signup failed";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
      dispatch(authActions.signupFail(errorMessage));
    }
  };

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(authActions.logout());
  Swal.fire({
    title: "Success!",
    text: "Logout successful",
    icon: "success",
    timer: 3000,
    showConfirmButton: false,
  });
  navigate("/");
};
