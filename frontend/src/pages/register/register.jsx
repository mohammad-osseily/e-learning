import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../store/auth/authActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || name === "" || phone_number === "" || password === "") {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      dispatch(signup({ name, email, password, phone_number, navigate }));
    }
  };

  return (
    <div className="mainDiv">
      <div className="register-container">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="register-input-group">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="register-input-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="register-input-group">
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={phone_number}
              placeholder="Enter your number eg: 03123123"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Register
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
