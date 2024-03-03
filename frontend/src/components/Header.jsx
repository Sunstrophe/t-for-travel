import React from "react";
import LoginMenu from "./LoginMenu";

function Header() {
  return (
    <header className="flex items-center justify-between h-20 border-b bg-gradient-to-r from-lime-400 to-green-400">
      <div className="ml-24 rounded-t-lg">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/World_Globe_Map.jpg/800px-World_Globe_Map.jpg" alt="Logo" className="h-14" />
      </div>
      <div className="mr-24 p-3 bg-gray-200 rounded-lg ">
          <LoginMenu/>
      </div>
    </header>
  );
}

export default Header;
