import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [formErrors, setFormErrors] = useState([]);
  const [submitForm, setSubmitForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [termsOfAgreement, setTermsOfAgreement] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [termsError, setTermsError] = useState("");

  function handleFirstName(e) {
    setFirstName(e.target.value);
    setFirstNameError("");
  }

  function handleLastName(e) {
    setLastName(e.target.value);
    setLastNameError("");
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setEmailError("");
  }

  function handleDescription(e) {
    setDescription(e.target.value);
    setDescriptionError("");
  }

  function handleCountryOption(e) {
    setCountry(e.target.value);
    setCountryError("");
  }

  function validateForm() {
    const errors = [];
    if (!firstName) {
      errors.push("First name is required");
      setFirstNameError("First name is required");
    }
    if (!lastName) {
      errors.push("Last name is required");
      setLastNameError("Last name is required");
    }
    if (!email) {
      errors.push("Email is required");
      setEmailError("Email is required");
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        errors.push("Invalid email format, try example@company.com");
        setEmailError("Invalid email format, try example@company.com");
      }
    }
    if (!description) {
      errors.push("Description is required");
      setDescriptionError("Description is required");
    }
    if (!country) {
      errors.push("Country is required");
      setCountryError("Country is required");
    }
    if (!termsOfAgreement) {
      errors.push("You must agree to the terms");
      setTermsError("You must agree to the terms");
    } else {
      setTermsError("");
    }
    setFormErrors(errors);
    return errors.length === 0;
  }

  function submitContactForm(e) {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Submit form logic here
      console.log("Form submitted successfully!");
      setSubmitForm(true);
    } else {
      console.log("Form has errors. Please fix them.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-opacity-50">
      <div className="flex-auto">
        <div className="container mx-auto relative">
          <form className="mt-8 relative z-0" onSubmit={submitContactForm}>
            <div className="p-8 pl-20 my-10 border border-gray-300 rounded-lg bg-white shadow-md w-[75%] relative z-0">
              <img
                src="https://www.shutterstock.com/shutterstock/photos/1806925870/display_1500/stock-vector-t-letter-logo-design-on-luxury-background-tt-monogram-initials-letter-logo-concept-t-icon-design-1806925870.jpg"
                alt="Logo"
                className="absolute top-4 right-4 w-24 h-24 z-10"
              />
              <h1 className="text-2xl font-bold py-4">Contact us</h1>
              {formErrors.length > 0 && (
                <div className="mb-4">
                  {formErrors.map((error, index) => (
                    <p key={index} className="text-red-600">
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <div className="my-4">
                <label htmlFor="firstName" className="block mr-2 text-gray-500">
                  First name:
                </label>
                <input
                  type="text"
                  className={`w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    firstNameError && "ring-red-500"
                  } focus:ring-indigo-500`}
                  name="firstName"
                  placeholder="Enter your first name:"
                  value={firstName}
                  onChange={handleFirstName}
                  onBlur={() => {
                    if (!firstName) {
                      setFirstNameError("First name is required");
                    }
                  }}
                />
                {firstNameError && (
                  <p className="mt-2 text-sm text-red-600">{firstNameError}</p>
                )}
              </div>

              <div className="my-4">
                <label htmlFor="lastName" className="block mr-2 text-gray-500">
                  Last name:
                </label>
                <input
                  type="text"
                  className={`w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    lastNameError && "ring-red-500"
                  } focus:ring-indigo-500`}
                  name="lastName"
                  placeholder="Enter your last name:"
                  value={lastName}
                  onChange={handleLastName}
                  onBlur={() => {
                    if (!lastName) {
                      setLastNameError("Last name is required");
                    }
                  }}
                />
                {lastNameError && (
                  <p className="mt-2 text-sm text-red-600">{lastNameError}</p>
                )}
              </div>

              <div className="my-4">
                <label htmlFor="country" className="block mr-2 text-gray-500">
                  Country:
                </label>
                <select
                  name="country"
                  id="country"
                  className={`w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    countryError && "ring-red-500"
                  } focus:ring-indigo-500`}
                  onChange={handleCountryOption}
                  value={country}
                  onBlur={() => {
                    if (!country) {
                      setCountryError("Country is required");
                    }
                  }}
                >
                  <option value="">Select a country</option>
                  <option value="denmark">Denmark</option>
                  <option value="finland">Finland</option>
                  <option value="iceland">Iceland</option>
                  <option value="norway">Norway</option>
                  <option value="sweden">Sweden</option>
                </select>
                {countryError && (
                  <p className="mt-2 text-sm text-red-600">{countryError}</p>
                )}
              </div>

              <div className="my-4">
                <label htmlFor="email" className="block mr-2 text-gray-500">
                  Email:
                </label>
                <input
                  type="email"
                  className={`w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    emailError && "ring-red-500"
                  } focus:ring-indigo-500`}
                  name="email"
                  placeholder="email@company.com"
                  value={email}
                  onChange={handleEmail}
                  onBlur={() => {
                    if (!email) {
                      setEmailError("Email is required");
                    } else {
                      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!regex.test(email)) {
                        setEmailError(
                          "Invalid email format, try example@company.com"
                        );
                      }
                    }
                  }}
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600">{emailError}</p>
                )}
              </div>

              <div className="my-4">
                <label
                  htmlFor="description"
                  className="block mr-2 text-gray-500"
                >
                  Description - {description.length} / 2000 words
                </label>
                <textarea
                  name="description"
                  id="description"
                  className={`w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    descriptionError && "ring-red-500"
                  } focus:ring-indigo-500`}
                  cols="40"
                  rows="5"
                  value={description}
                  onChange={handleDescription}
                  onBlur={() => {
                    if (!description) {
                      setDescriptionError("Description is required");
                    }
                  }}
                ></textarea>
                {descriptionError && (
                  <p className="mt-2 text-sm text-red-600">
                    {descriptionError}
                  </p>
                )}
              </div>

              <div className="flex items-center my-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 mr-2 border-gray-300 rounded focus:ring-indigo-500"
                  checked={termsOfAgreement}
                  onChange={(e) => setTermsOfAgreement(e.target.checked)}
                  onBlur={() => {
                    if (!termsOfAgreement) {
                      setTermsError("You must agree to the terms");
                    } else {
                      setTermsError("");
                    }
                  }}
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

              <div className="mt-7">
                <button
                  type="submit"
                  className={`w-72 px-4 py-2 rounded-md focus:outline-none ${
                    formErrors.length === 0 &&
                    firstName &&
                    lastName &&
                    email &&
                    description &&
                    country &&
                    termsOfAgreement
                      ? "bg-blue-500 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={
                    formErrors.length !== 0 ||
                    !firstName ||
                    !lastName ||
                    !email ||
                    !description ||
                    !country ||
                    !termsOfAgreement
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
