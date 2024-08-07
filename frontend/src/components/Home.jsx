import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <Navbar />
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the E-Learning Platform
      </h1>
      <p className="text-lg mb-4">
        This platform allows you to enroll in classes, view class details, and
        manage your enrollments.
      </p>
      <div className="flex justify-center space-x-4 mt-8">
        <a
          href="/classes"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          View Classes
        </a>
        <a
          href="/enroll"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
        >
          Enroll Now
        </a>
        <a
          href="/withdraw"
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
          Withdraw from a Class
        </a>
      </div>
    </div>
  );
};

export default Home;
