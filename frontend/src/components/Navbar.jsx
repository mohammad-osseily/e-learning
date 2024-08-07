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
    <div className="navbar bg-base-100 shadow-lg flex justify-between">
      <div className="">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          E-Learning
        </Link>
      </div>
      <div className="  justify-center">
        <ul className="menu menu-horizontal ">
          {isAuthenticated && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/classes">Classes</Link>
              </li>
              <li>
                <Link to="/enrollments">Manage Enrollments</Link>
              </li>
              <li>
                <Link to="/withdrawals">Manage Withdrawals</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className="menu menu-horizontal p-0">
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="btn btn-ghost">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
