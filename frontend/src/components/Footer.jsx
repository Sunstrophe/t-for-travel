import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <header className="flex items-center justify-between h-20 border-b bg-gradient-to-r from-lime-400 to-green-400">
      <div className="ml-24 rounded-t-lg">
        <Link to="/contact" className="rounded-lg">
          Contact us
        </Link>
      </div>
      <div>
        <Link to="/about" className="rounded-lg">
          About
        </Link>
      </div>
      <div className="mr-24 rounded-t-lg">
        <Link to="/cookies" className="rounded-lg">
          Cookies
        </Link>
      </div>
    </header>
  );
}

export default Footer;