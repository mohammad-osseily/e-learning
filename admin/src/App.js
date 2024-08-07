import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AddClass from "./pages/AddClass";
import ListEnrollments from "./pages/ListEnrollments";
import ApproveWithdrawals from "./pages/ApproveWithdrawals";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./index.css";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      isAuthenticated = false;
    }
  }, [isAuthenticated]);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-grow">
            <Navbar />
            <Routes>
              <Route path="/add-class" element={<AddClass />} />
              <Route path="/list-enrollments" element={<ListEnrollments />} />
              <Route
                path="/approve-withdrawals"
                element={<ApproveWithdrawals />}
              />
              <Route path="*" element={<Navigate to="/add-class" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
