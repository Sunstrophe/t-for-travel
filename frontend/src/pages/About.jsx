import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-50 ">
      <div className="max-w-3xl w-full mx-auto p-8 bg-gradient-to-b from-gray-100 to-gray-200 shadow-md rounded-lg">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/1806925870/display_1500/stock-vector-t-letter-logo-design-on-luxury-background-tt-monogram-initials-letter-logo-concept-t-icon-design-1806925870.jpg"
          alt="Logo"
          className="h-16 w-auto mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg font-medium text-gray-700 text-center mb-6">
          Share your experiences with others and discover new adventures
        </p>
        <p className="text-gray-600 text-left mb-4">
          Embark on a journey to share your latest culinary escapades, from
          hidden gems to fine dining delights. Capture the essence of city life
          and explore its vibrant culture through the lens of our community. Let
          your wanderlust guide you as you share your experiences, from bustling
          streets to serene escapes.
        </p>
        <div className="border-t border-gray-300 mb-8"></div>
        <p className="text-gray-600 text-center mb-6">
          Create an account and inspire others.{" "}
          <Link
            to="/signup"
            className="block mx-auto w-1/4 py-2 text-center text-white bg-slate-900 rounded-md hover:bg-gray-500 transition duration-300"
          >
            Sign up here
          </Link>
        </p>
        <div className="border-t border-gray-300 m-8"></div>
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold mb-2">Technologies Used</h2>
          <p className="text-gray-600 text-left mb-4">
            We utilize a combination of modern technologies to build our platform
            and enhance user experience:
          </p>
          <div className="text-left space-y-2">
            <p>
              <span className="font-semibold">React Leaflet:</span>{" "}
              <span className="text-blue-500 hover:underline">
                <a href="https://react-leaflet.js.org/" target="_blank" rel="noopener noreferrer">
                  React Leaflet
                </a>
              </span> is an open-source JavaScript library that integrates interactive maps into React applications.
            </p>
            <p>
              <span className="font-semibold">Tailwind CSS:</span>{" "}
              <span className="text-blue-500 hover:underline">
                <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
                  Tailwind CSS
                </a>
              </span> is a utility-first CSS framework that streamlines the development process with its intuitive styling approach.
            </p>
            <p>
              <span className="font-semibold">OpenAI API:</span>{" "} <span className="text-blue-500 hover:underline">
                <a href="https://platform.openai.com/docs/introduction/" target="_blank" rel="noopener noreferrer">
                  OpenAI API
                </a>
              </span> Our platform incorporates AI-assisted search capabilities provided by the OpenAI API, enhancing user experience by enabling more efficient resource discovery.
            </p>
          </div>
        </div>
        <p className="text-gray-600 mt-12 mb-4 text-left">
          Feel free to{" "}
          <Link
            to="/contact"
            className="text-blue-500 hover:underline"
          >
            contact us
          </Link>{" "}
          if you have any questions or feedback.
        </p>
      </div>
    </div>
  );
}

export default About;
