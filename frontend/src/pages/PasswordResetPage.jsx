import React from "react";
import { Link } from "react-router-dom";
import PasswordResetForm from "../components/PasswordResetForm";

function PasswordResetPage() {
  return (
    <div className="min-w-xl">
      <div className="mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="w-auto h-12 mx-auto"
            src="https://www.shutterstock.com/shutterstock/photos/1806925870/display_1500/stock-vector-t-letter-logo-design-on-luxury-background-tt-monogram-initials-letter-logo-concept-t-icon-design-1806925870.jpg"
            alt="T-for-travel"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Password Reset
          </h2>
          <div className="flex justify-center max-w-md">
            <PasswordResetForm />
          </div>
            <div className="flex justify-center">
              <Link to="/Home" className="py-4 underline">
                Go to main page
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetPage;