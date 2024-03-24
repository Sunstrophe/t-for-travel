import { useState } from "react";
import useAuthStore from "../stores/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginMenu() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { setToken, token } = useAuthStore();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [serverError, setServerError] = useState(""); // New state for server-side errors
  const [loading, setLoading] = useState(false); // Loading state for form submission

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!regex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }

  function validatePassword() {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  }

  async function submitLogin(e) {
    e.preventDefault();
    setServerError("");
    setLoading(true);
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      try {
        const response = await fetch("http://localhost:8000/user/token", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setToken(data.access_token);
          console.log(token);
          navigate("/userpage");
        } else {
          const data = await response.json();
          setServerError(data.detail);
        }
      } catch (error) {
        console.error("Error during login:", error);
        setServerError("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex justify-between pt-1.5"
      >
        <span className="mr-34 font-light">Login</span>
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

      {menuOpen && (
        <div className="absolute top-full mt-4  bg-white rounded-md shadow-md md:w-96 right-0">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">

              <form onSubmit={submitLogin} className="space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600">{emailError}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                  )}
                </div>

                <div className="my-2">
                  {serverError && (
                    <p className="mt-2 text-sm text-red-600">{serverError}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                {/* Clickable link to signup page*/}
                <div className="my-10">
                  <div className="mt-6 text-sm font-light text-gray-500 text-center">
                    Don't have an account?
                  </div>
                  <div className="underline hover:text-gray-500 text-center">
                    <Link to="/signup">Sign up here</Link>
                  </div>
                </div>
              </form>
            </div>
          
        </div>
      )}
    </div>
  );
}
export default LoginMenu;