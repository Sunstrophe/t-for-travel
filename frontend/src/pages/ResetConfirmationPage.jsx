import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ResetConfirmationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      setError("No reset token provided.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    const url = `http://localhost:8000/reset-password`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, new_password: password }),
    };

    try {
      const response = await fetch(url, options);
      setIsLoading(false);
      if (response.status === 404) {
        setError("User does not exist.");
      } else if (response.status === 400) {
        setError("The link has expired.");
      } else if (!response.ok) {
        throw new Error("An error occurred during the password reset process.");
      } else {
        setSuccessMessage(
          "Ditt lösenord har återställts. Vänligen logga in med ditt nya lösenord."
        );
      }
      // Redirect to login or show a success message
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-xl">
      {successMessage ? (
        <>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Logga in
          </h2>
          <div className="mt-2 text-center text-green-500">
            {successMessage}
          </div>

        </>
      ) : (
        <div className="mt-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="w-auto h-12 mx-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Set New Password
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
              {error && (
                <div className="mt-2 text-center text-red-500">{error}</div>
              )}
            </form>
            <div className="flex justify-center">
              <Link to="/" className="py-4 underline">
                Go to main page
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetConfirmationPage;
