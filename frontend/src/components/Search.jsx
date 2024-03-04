import React from "react";

function Search() {
  return (
    <div className="flex justify-center px-4 pt-4 pb-4">
        <div className="w-full max-w-screen-sm">
            <div className="flex">
                <input 
                    className="flex-1 py-4 px-6 rounded-lg border-2 border-gray-200 focus:outline-none text-2xl font-thin"
                    type="text"
                    placeholder="Experience">
                </input>
            </div>
        </div>
    </div>
  );
}

export default Search;



