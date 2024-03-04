import React, { useState } from "react";

function LoginFunction() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function submitLoginForm(e) {
    e.preventDefault();
    console.log(email);
    console.log(password);
  }

  return (
    <div className="flex bg-gray-100 mx-3">
      <form className="" onSubmit={submitLoginForm}>
        <div className="">
          <div className="my-4">
            {/* Display email input for both cases */}
            <input
              type="email"
              className="p-2 border border-black rounded-xl"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
            />
          </div>

          {!isLoggedIn && (
            <>
              {/* Display these fields only when the user is not logged in */}
              <div className="my-4">
                <input
                  type="text"
                  className="p-2 border border-black rounded-xl"
                  name="firstName"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="my-4">
                <input
                  type="text"
                  className="p-2 border border-black rounded-xl"
                  name="lastName"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="my-4">
                <input
                  type="text"
                  className="p-2 border border-black rounded-xl"
                  name="country"
                  placeholder="Enter your country"
                />
              </div>
            </>
          )}

          <div className="my-4">
            <input
              type="text"
              className="p-2 border border-black rounded-xl"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginFunction;
