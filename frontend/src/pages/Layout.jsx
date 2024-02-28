import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-20 border-b bg-gradient-to-r from-gray-300 to-green-300">
        <div className="ml-auto underline">
            <Link to="/">Home</Link>
        </div>
      </header>
      <Outlet />
      <footer className="h-20 border-t bg-green-300">Footer</footer>
    </div>
  );
}

export default Layout;