import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  {
    /* Implement this to display: Welcome, {username} once logged
                                                       in instead of login menu*/
  }
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex justify-between w-full pt-1.5"
      >
        {/* SVG plus sign which rotates and turns into minus when clicked on*/}
        <span className="mr-28 text-xl">Login</span>
        <svg
          className="fill-gray-400 shrink-0 ml-8"
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

      {/* If menu is open, display the form*/}
      {menuOpen && (
        <div className="absolute top-full mt-4  bg-white border border-gray-300 rounded-md shadow-md right-0">
          <div className="flex mx-3">
            <form onSubmit={submitLoginForm}>
              <div>
                <div className="my-4">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>

                <div className="mt-4">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
                <div className="ml-14 mt-2 mb-16 text-sm font-light text-gray-500">
                  Forgot your password?
                  <div className="text-sm underline hover:text-gray-600">
                    <Link to="/resetpassword">Reset password</Link>
                  </div>
                </div>

                {/* Clickable link to signup page*/}
                <div className="my-6">
                  <div className="mt-6 text-sm font-light text-gray-500 text-center">Don't have an account?</div>
                  <div className="underline hover:text-gray-500 text-center">
                    <Link to="/signup">Sign up here</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginMenu;
