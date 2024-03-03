import React from "react";
import LoginMenu from "./LoginMenu";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between h-20 border-b bg-gradient-to-r from-lime-400 to-green-400">
      <Link to="/" className="ml-24 rounded-t-lg">
        <img src="https://img.freepik.com/premium-vector/map-location-gradient-logo-colorful-map-logo-template_103027-235.jpg?w=740" alt="Logo" className="h-14" />
      </Link>
      <div className="mr-24 p-3 bg-gray-200 rounded-lg ">
          <LoginMenu/>
      </div>
    </header>
  );
}

export default Header;
