import React from "react";
import { Link } from "react-router-dom";

//Footer with links to pages
function Footer() {
  return (
    <footer className="flex items-center justify-between h-20 pt-10 pb-32 border-b bg-gradient-to-r from-lime-400 to-green-400">
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
    </footer>
  );
}

export default Footer;