import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State to hold validation error message
  const [success, setSuccess] = useState(""); // State to hold success message

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email before proceeding
    if (!validateEmail(email)) {
      setError("Please enter a valid email address."); // Set an error message
      return; // Prevent form submission
    }

    // Reset error state if email passes validation
    setError("");

    // Prepare the URL and options for the fetch request
    const url = `http://localhost:8000/password-recovery/${email}`;
    const options = {
      method: "POST", // Specify the request method
      headers: {
        // Set necessary headers
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      
    };

    try {
      // Make the fetch request
      const response = await fetch(url, options);
      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Assuming the response is JSON, parse it
      const data = await response.json();
      setSuccess("We have sent an email for password recovery"); // Set the success message
    } catch (error) {
      // Log or handle the error as needed
      console.error("There was an error!", error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-xs italic text-red-500">{error}</p>}{" "}
        {/* Display validation error */}
      </div>
      <div>
        <button
          type="submit"
          className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Reset Link
        </button>
      </div>
      {success && (
        <div>
          <p className="text-sm italic text-green-500">{success}</p>
        </div>
      )}{" "}
    </form>
  );
};

export default PasswordResetForm;
