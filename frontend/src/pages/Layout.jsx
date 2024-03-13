import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 bg-opacity-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
