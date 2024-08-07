import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
