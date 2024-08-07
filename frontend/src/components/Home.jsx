import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the E-Learning Platform
      </h1>
      <p className="text-lg mb-6">
        This platform allows you to view available classes, enroll in classes,
        and manage your enrollments and withdrawal requests.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/classes"
          className="block bg-blue-500 text-white py-4 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
        >
          View Classes
        </Link>
        <Link
          to="/enrollments"
          className="block bg-green-500 text-white py-4 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-200"
        >
          Manage Enrollments
        </Link>
        <Link
          to="/withdrawals"
          className="block bg-red-500 text-white py-4 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-200"
        >
          Manage Withdrawals
        </Link>
      </div>
    </div>
  );
};

export default Home;
