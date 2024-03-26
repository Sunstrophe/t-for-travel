import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-50">
      <div className="max-w-3xl w-full mx-auto p-14 bg-white shadow-md rounded-lg">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/1806925870/display_1500/stock-vector-t-letter-logo-design-on-luxury-background-tt-monogram-initials-letter-logo-concept-t-icon-design-1806925870.jpg"
          alt="Logo"
          className="h-16 w-auto mx-auto mb-8"
        />
        <h1 className="text-3xl font-bold text-center m-4">About Us</h1>
        <p className="text-lg font-medium text-gray-700 text-center mb-8">
          Share your experiences with others and discover new adventures
        </p>
        <p className=" text-gray-600 text-left mb-4">
          Embark on a journey to share your latest culinary escapades, from
          hidden gems to fine dining delights. Capture the essence of city life
          and explore its vibrant culture through the lens of our community. Let
          your wanderlust guide you as you share your experiences, from bustling
          streets to serene escapes.
        </p>
        <p className=" text-gray-600 text-left mb-8">
          Create an account and inspire others.{" "}
          <div className="underline hover:text-gray-500 hover:font-bold text-left">
            <Link to="/signup">Sign up here</Link>
          </div>
        </p>
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Made with React Leaflet and Tailwind CSS
          </h2>
          <p className="text-gray-600 text-left mb-4">
            React Leaflet is an open-source JavaScript library that allows you
            to integrate interactive maps into your React applications. It's
            based on the popular Leaflet library and provides a simple way to
            add mapping functionality to your projects. Learn more about React
            Leaflet{" "}
            <a
              href="https://react-leaflet.js.org/"
              className="text-blue-500 hover:underline"
            >
              here
            </a>
            .
          </p>
          <p className="text-gray-600 text-left mb-4">
            Tailwind CSS, a utility-first CSS framework, empowers developers to
            create stunning, responsive designs with ease. With its intuitive
            approach to styling, Tailwind CSS streamlines the development
            process, allowing you to focus on crafting engaging user
            experiences. Discover the power of Tailwind CSS and unleash your
            creativity today. Learn more about Tailwind CSS{" "}
            <a
              href="https://tailwindcss.com/"
              className="text-blue-500 hover:underline"
            >
              here
            </a>
            .
          </p>
          <h2 className="text-xl font-semibold mb-4">AI-Assisted Search</h2>
          <p className="text-gray-600 text-left mb-4">
            Our platform incorporates AI-assisted search capabilities provided
            by the OpenAI API. This allows users to find relevant places and
            resources more efficiently, enhancing their overall experience on
            our platform.
          </p>
          <p className="text-gray-600 mt-16 mb-4 text-left">
            Feel free to{" "}
            <Link to="/contact" className="text-blue-500 hover:underline">
              contact us
            </Link>{" "}
            if you have any questions or feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
