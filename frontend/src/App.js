import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ClassList from "./components/Classes/ClassList";
import ClassDetail from "./components/Classes/ClassDetail";
import EnrollmentForm from "./components/Enrollment/EnrollmentForm";
import EnrollmentList from "./components/Enrollment/EnrollmentList";
import WithdrawalForm from "./components/Withdrawal/WithdrawalForm";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/classes" element={<PrivateRoute component={ClassList} />} />
      <Route
        path="/classes/:id"
        element={<PrivateRoute component={ClassDetail} />}
      />
      <Route
        path="/enroll"
        element={<PrivateRoute component={EnrollmentForm} />}
      />
      <Route
        path="/enrollments"
        element={<PrivateRoute component={EnrollmentList} />}
      />
      <Route
        path="/withdraw"
        element={<PrivateRoute component={WithdrawalForm} />}
      />
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App">
        <Navbar />
        <div className="container mx-auto px-4">
          <ToastContainer position="top-right" />
        </div>
      </div>
    </RouterProvider>
  );
}

export default App;
