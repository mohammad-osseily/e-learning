import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ClassList from "./components/Classes/ClassList";
import ClassDetail from "./components/Classes/ClassDetail";
import EnrollmentList from "./components/Enrollment/EnrollmentList";
import Withdrawals from "./components/Withdrawal/Withdrawals";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="classes" element={<PrivateRoute component={ClassList} />} />
      <Route
        path="classes/:id"
        element={<PrivateRoute component={ClassDetail} />}
      />
      <Route
        path="enrollments"
        element={<PrivateRoute component={EnrollmentList} />}
      />
      <Route
        path="withdrawals"
        element={<PrivateRoute component={Withdrawals} />}
      />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}>
      <ToastContainer position="top-right" />
    </RouterProvider>
  );
}

export default App;
