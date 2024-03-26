import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-lime-400 to-green-400 py-6 h-24">
      <div className="container mx-auto flex items-center justify-center">
        <Link to="/contact" className="text-white hover:underline font-thin hover:font-bold mr-4">
          Contact us
        </Link>
        <div className="h-6 border-r border-white mx-4"></div>
        <Link to="/about" className="text-white hover:underline font-thin hover:font-bold mr-4">
          About
        </Link>
        <div className="h-6 border-r border-white mx-4"></div>
        <Link to="/terms" className="text-white hover:underline font-thin hover:font-bold">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
