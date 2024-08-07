import axios from "axios";
import { toast } from "react-toastify";
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
      toast.success("Login successful", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage, { autoClose: 3000 });
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
      toast.success("Signup successful", { autoClose: 3000, theme: "colored" });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.log(err);

      const errorMessage = err.response?.data?.error || "Signup failed";
      toast.error(errorMessage, { autoClose: 3000, theme: "colored" });
      dispatch(authActions.signupFail(errorMessage));
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(authActions.logout());
  toast.success("Logout successful", { autoClose: 3000 });
};
