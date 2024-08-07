import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/classes" className="text-white">
                Classes
              </Link>
            </li>
            <li>
              <Link to="/enroll" className="text-white">
                Enroll
              </Link>
            </li>
            <li>
              <Link to="/withdraw" className="text-white">
                Withdraw
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
