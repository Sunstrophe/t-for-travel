import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignupForm() {
  let navigate = useNavigate();

   // State variables for form fields and errors
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState([]);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState([]);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState([]);

  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Function to validate email field
  function validateEmail() {
    let emailErrors = [];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      emailErrors.push("It must be a correct email");
    }
    if (!email) {
      emailErrors.push("Email is required");
    }
    setEmailError(emailErrors);
  }

  // Function to validate password field
  function validatePassword() {
    let passwordErrors = [];
    const regex = /[^a-zA-Z0-9]/;
    if (password.length <= 8) {
      passwordErrors.push("Password length must be greater than 8");
    }
    if (!regex.test(password)) {
      passwordErrors.push("Your password must contain a unique character");
    }
    if (!password) {
      passwordErrors.push("Password is required");
    }
    setPasswordError(passwordErrors);
  }

  // Function for confirming password
  function validateConfirmPassword() {
    let confirmPasswordErrors = [];
    if (password !== confirmPassword) {
      confirmPasswordErrors.push("Passwords do not match");
    }
    setConfirmPasswordError(confirmPasswordErrors);
  }

  // Function to validate username
  function validateUsername() {
    let errors = [];
    if (!username) {
      errors.push("Username is required");
    }
    setUsernameError(errors);
  }

  // Function to validate terms
  function validateTerms() {
    if (!terms) {
      setTermsError("You must accept our terms to continue");
    } else {
      setTermsError("");
    }
  }

   // Function to handle form submission
  async function submitRegister(e) {
    e.preventDefault();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateUsername();
    validateTerms();

    // Check if there are no errors in form fields
    if (
      emailError.length === 0 &&
      passwordError.length === 0 &&
      confirmPasswordError.length === 0 &&
      usernameError.length === 0 &&
      !termsError
    ) {
      try {
        const response = await fetch("http://localhost:8000/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username: username,
            hashed_password: password,
          }),
        });

        const data = await response.json();

        // Check response status
        if (response.status === 201) {
          console.log("Success");
          setRegistrationSuccess(true);
        } else {
          console.log("Something went wrong");
          console.log("Error status:", response.status); // Log the response status
          console.log("Error data:", data); // Log the error data
          throw new Error("Error from the server");
        }
      } catch (error) {
        console.log("Error caught:", error); // Log any caught errors
      }
    } else {
      console.log("Error in form");
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/1806925870/display_1500/stock-vector-t-letter-logo-design-on-luxury-background-tt-monogram-initials-letter-logo-concept-t-icon-design-1806925870.jpg"
              alt="Logo"
              className="h-16 w-auto mx-auto mb-8"
            />
            <div className="pt-4 pb-8 font-bold text-xl">
              Create a new account
            </div>
            <form className="space-y-6" onSubmit={submitRegister}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address:
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                  />
                  {emailError.map((error, index) => (
                    <p key={index} className="mt-2 text-sm text-red-600">
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username:
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={validateUsername}
                  />
                  {usernameError.map((error, index) => (
                    <p key={index} className="mt-2 text-sm text-red-600">
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                  />
                  {passwordError.map((error, index) => (
                    <p key={index} className="mt-2 text-sm text-red-600">
                      {error}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password:
                </label>
                <div className="mt-1">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validateConfirmPassword}
                  />
                  {confirmPasswordError.length > 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      {confirmPasswordError[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                 <label htmlFor="terms" className="text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms" className="rounded-lg underline hover:font-bold">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {termsError && (
                <p className="mt-2 text-sm text-red-600">{termsError}</p>
              )}

              <div>
                <button
                  type="submit"
                  className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none ${
                    email &&
                    password &&
                    confirmPassword &&
                    username &&
                    !emailError.length &&
                    !passwordError.length &&
                    !confirmPasswordError.length &&
                    !usernameError.length &&
                    terms
                      ? "bg-blue-500 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={
                    !(
                      email &&
                      password &&
                      confirmPassword &&
                      username &&
                      !emailError.length &&
                      !passwordError.length &&
                      !confirmPasswordError.length &&
                      !usernameError.length &&
                      terms
                    )
                  }
                >
                  Register
                </button>
                {/* Confirmation message if no errors */}
                {registrationSuccess && (
                  <>
                    <p className="mt-2 text-sm text-green-600">
                      Sent a confirmation email
                    </p>
                    {/* Button to navigate */}
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Navigate to Main Page
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
