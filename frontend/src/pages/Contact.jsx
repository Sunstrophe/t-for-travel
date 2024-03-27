import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [formErrors, setFormErrors] = useState([]);
  const [submitForm, setSubmitForm] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [termsOfAgreement, setTermsOfAgreement] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [termsError, setTermsError] = useState("");

  function handleTitle(e) {
    setTitle(e.target.value);
    setTitleError("");
  }

  function handleName(e) {
    setName(e.target.value);
    setNameError("");
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
    if (!title) {
      errors.push("Title is required");
      setTitleError("Title is required");
    }
    if (!name) {
      errors.push("Name is required");
      setNameError("Name is required");
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
    // Country is not mandatory
    // if (!country) {
    //   errors.push("Country is required");
    //   setCountryError("Country is required");
    // }
    if (!termsOfAgreement) {
      errors.push("You must agree to the terms");
      setTermsError("You must agree to the terms");
    } else {
      setTermsError("");
    }
    setFormErrors(errors);
    return errors.length === 0;
  }

  async function submitContactForm(e) {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await fetch("http://localhost:8000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            name,
            email,
            description,
            country,
          }),
        });

        const data = await response.json();

        // Check response status
        if (response.status === 201) {
          console.log("Success");
          setSubmitForm(true);

          // Clear form fields after successful submission
          setTitle("");
          setName("");
          setEmail("");
          setDescription("");
          setCountry("");
          setTermsOfAgreement(false);
          setTitleError("");
          setNameError("");
          setEmailError("");
          setDescriptionError("");
          setCountryError("");
          setTermsError("");
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
      console.log("Form has errors. Please revise your input.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-opacity-50">
      <div className="flex-auto">
        <div className="container mx-auto relative">
          <form className="mt-8 relative z-0" onSubmit={submitContactForm}>
            <div className="p-8 pl-20 my-10 border border-gray-300 rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 shadow-md w-[75%] relative z-0">
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
                <label htmlFor="title" className="block mr-2 text-gray-500">
                  Title:
                </label>
                <input
                  type="text"
                  className={`w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    titleError && "ring-red-500"
                  } focus:ring-indigo-500`}
                  name="title"
                  placeholder="Enter your title:"
                  value={title}
                  onChange={handleTitle}
                  onBlur={() => {
                    if (!title) {
                      setTitleError("Title is required");
                    }
                  }}
                />
                {titleError && (
                  <p className="mt-2 text-sm text-red-600">{titleError}</p>
                )}
              </div>

              <div className="my-4">
                <label htmlFor="name" className="block mr-2 text-gray-500">
                  Name:
                </label>
                <input
                  type="text"
                  className={`w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                    nameError && "ring-red-500"
                  } focus:ring-indigo-500`}
                  name="name"
                  placeholder="Enter your name:"
                  value={name}
                  onChange={handleName}
                  onBlur={() => {
                    if (!name) {
                      setNameError("Name is required");
                    }
                  }}
                />
                {nameError && (
                  <p className="mt-2 text-sm text-red-600">{nameError}</p>
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
                  <Link
                    to="/terms"
                    className="rounded-lg underline hover:font-bold"
                  >
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
                    title &&
                    name &&
                    email &&
                    description &&
                    termsOfAgreement
                      ? "bg-gray-800 shadow-md text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                      : "bg-gray-400 shadow-md text-gray-100 cursor-not-allowed"
                  }`}
                  disabled={
                    formErrors.length !== 0 ||
                    !title ||
                    !name ||
                    !email ||
                    !description ||
                    !termsOfAgreement
                  }
                >
                  Submit
                </button>
                {/* Conditional rendering of success message */}
                {submitForm && (
                  <div>
                    <div className="mt-4 text-green-800">
                      We will get back to you soon.
                    </div>
                    <p className="text-gray-600 mb-4 text-left max-w-4xl mx-auto px-4">
                      <button
                        onClick={() => window.history.back()} // Go back to the previous page
                        className="bg-gray-800 text-white px-3 py-2 rounded-md border-r border-gray-100 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
                      >
                        <svg
                          class="w-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Previous page
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
