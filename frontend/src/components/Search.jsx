import React, { useState } from "react";

function Search({ onSearch }) {
  const [coordinates, setCoordinates] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCoordinates(value);
  };

  const handleSearch = () => {
    // Split the input value into latitude and longitude
    const [lat, lon] = coordinates.split(",").map(coord => parseFloat(coord.trim()));

    // Check if both latitude and longitude are provided and are valid numbers
    if (!isNaN(lat) && !isNaN(lon)) {
      onSearch(lat, lon);
    }
  };

  return (
    <div className="flex justify-center px-4 pt-4 pb-4">
      <div className="w-full max-w-screen-sm">
        <div className="flex">
          <input
            value={coordinates}
            onChange={handleInputChange}
            className="flex-1 py-4 px-6 rounded-lg border-2 border-gray-200 focus:outline-none text-2xl font-thin"
            type="text"
            placeholder="Latitude, Longitude"
          />
          <button
            onClick={handleSearch}
            className="py-4 px-6 rounded-lg bg-blue-500 text-white font-semibold ml-4"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
