import React from "react";
import LoginMenu from "./LoginMenu";

function Header() {
  return (
    <header className="flex items-center justify-between h-20 border-b bg-green-200">
      <div className="ml-24 rounded-t-lg">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/World_Globe_Map.jpg/800px-World_Globe_Map.jpg" alt="Logo" className="h-14" />
      </div>
      <div className="mr-24">
        <div className="rounded-lg bg-white py-3 px-5 shadow-md">
          Login
        </div>
      </div>
    </header>
  );
}

export default Header;
