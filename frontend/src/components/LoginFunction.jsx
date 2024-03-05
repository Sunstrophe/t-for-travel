import React, { useState } from "react";

function LoginFunction() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Implement this to show different things when logged on or off
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
            <input
              type="email"
              className="p-2 border border-black rounded-xl"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
            />
          </div>

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
