import React, { useState } from "react";

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [termsOfAgreement, setTermsOfAgreement] = useState(false)

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleCountryOption(e) {
    console.log(e.target.value);
    setCountry(e.target.value);
  }

  function submitContactForm(e) {
    e.preventDefault();
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(description);
    console.log(country);
    console.log(termsOfAgreement)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-auto">
        <div className="container mx-auto bg-inherit">
          <h1 className="text-xl pl-8 pt-4 ">Share your thoughts with us!</h1>
          <form className="" onSubmit={submitContactForm}>
            <div className="p-8 my-10 border shadow-lg min-h-[30rem] bg-gray-100">
              <div className="my-4">
                <label htmlFor="firstName" className="block mr-2 text-gray-500">
                  First name
                </label>
                <input
                  type="text"
                  className="p-2 border border-black rounded-xl"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={handleFirstName}
                  autoComplete="off"
                />
              </div>
              <div className="my-4">
                <label htmlFor="LastName" className="block mr-2 text-gray-500">
                  Last name
                </label>
                <input
                  type="text"
                  className="p-2 border border-black rounded-xl"
                  name="LastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={handleLastName}
                />
              </div>
              <div className="my-4">
                <label htmlFor="email" className="block mr-2 text-gray-500">
                  Email
                </label>
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
                <label
                  htmlFor="description"
                  className="block mr-2 text-gray-500"
                >
                  Description - {description.length} / 2000 words
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="border border-black"
                  cols="40"
                  rows="10"
                  value={description}
                  onChange={handleDescription}
                ></textarea>
              </div>
              <div className="my-4">
                <label htmlFor="country" className="block mr-2 text-gray-500">
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  className="w-36 border border-black rounded-md"
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
              </div>
              
              <div className="my-4">
                <label htmlFor="date" className="block mr-2 text-gray-500">
                  Date of application
                </label>
                <input type="date" className="p-4 border border-black rounded-md" />
              </div>


              <div className="flex my-4">
                <label htmlFor="terms" className="block mr-2 text-gray-500">Do you agree with our terms?</label>
                <input type="checkbox" className="bg-red-500" checked={termsOfAgreement} onChange={(e) => setTermsOfAgreement(e.target.checked)}/>
              </div>
              <div className="mt-7">
                <button type="submit" className="p-4 border border-black rounded-md">
                  Submit form
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
