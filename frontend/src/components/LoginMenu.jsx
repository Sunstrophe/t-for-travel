import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function LoginMenu() {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const handleLoginClick = () => {
    setOpen(!isOpen);
  };

  const closeLoginMenu = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`absolute top-16 right-0 bg-gray-200 p-2 ${
          isOpen ? "w-64 mr-2" : "w-16"
        }`}
        ref={menuRef}
      >
        {isOpen ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                className="mt-1 p-2 border w-full"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 p-2 border w-full"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
        ) : null}
      </div>

      <div className="mr-auto bold" onClick={handleLoginClick}>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default LoginMenu;
