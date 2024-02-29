import React from "react";

function Footer() {
  return (
    <header className="flex items-center justify-between h-20 border-b bg-green-200">
      <div className="ml-24 rounded-t-lg">
        <div classname="rounded-lg bg-white py-3 px-5 shadow-md">
          Contact
        </div>
      </div>
      <div className="mr-24 rounded-t-lg">
        <div className="rounded-lg bg-white py-3 px-5 shadow-md">
          Cookies
        </div>
      </div>
    </header>
  );
}

export default Footer;