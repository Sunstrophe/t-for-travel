// LoginMenu.jsx
import React, { useState } from "react";
import LoginFunction from "./LoginFunction";

const LoginMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex justify-between w-full px-2"
      >{/* SVG plus sign which rotates and turn into minus when clicked on*/}
        <span className="mr-28">Login</span>
        <svg
          className="fill-gray-500 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              menuOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              menuOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      {/* If menu is open, display the div with LoginFunction*/}
      {menuOpen && (
        <div
          className="absolute top-full mt-4 bg-white border border-gray-300 rounded-md shadow-md right-0"
        >
          <LoginFunction />
        </div>
      )}
    </div>
  );
};

export default LoginMenu;
