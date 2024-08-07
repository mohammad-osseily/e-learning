import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">E-Learning</div>
        {isAuthenticated && (
          <ul className="flex space-x-6">
            <li>
              <Link to="/home" className="text-white hover:text-gray-400">
                Home
              </Link>
            </li>

            <li>
              <Link to="/enroll" className="text-white hover:text-gray-400">
                Manage Enrollments
              </Link>
            </li>
            <li>
              <Link to="/withdraw" className="text-white hover:text-gray-400">
                Manage Withdrawals
              </Link>
            </li>
          </ul>
        )}
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/"
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
