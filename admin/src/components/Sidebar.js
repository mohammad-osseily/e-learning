import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex flex-col mt-4">
        <Link to="/add-class" className="px-4 py-2 hover:bg-gray-700">
          Add Class
        </Link>
        <Link to="/list-enrollments" className="px-4 py-2 hover:bg-gray-700">
          List Enrollments
        </Link>
        <Link to="/approve-withdrawals" className="px-4 py-2 hover:bg-gray-700">
          Approve Withdrawals
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
