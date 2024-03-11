import React, { useState } from "react";

function Search({ onSearch }) {
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });

  const handleInputChange = (e) => {
    //set the map container coordinates to the input coordinates
    const { name, value } = e.target;
    setCoordinates((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // Check if both latitude and longitude are provided
    if (coordinates.lat && coordinates.lon) {
      onSearch(coordinates.lat, coordinates.lon);
    }
  };

  return (
    <div className="flex justify-center px-4 pt-4 pb-4">
      <div className="w-full max-w-screen-sm">
        <div className="flex">
          <input
            name="lat"
            value={coordinates.lat}
            onChange={handleInputChange}
            className="flex-1 py-4 px-6 rounded-lg border-2 border-gray-200 focus:outline-none text-2xl font-thin"
            type="text"
            placeholder="Latitude"
          />
          <input
            name="lon"
            value={coordinates.lon}
            onChange={handleInputChange}
            className="flex-1 py-4 px-6 rounded-lg border-2 border-gray-200 focus:outline-none text-2xl font-thin"
            type="text"
            placeholder="Longitude"
          />
          <button
            onClick={handleSearch}
            className="py-4 px-6 rounded-lg bg-blue-400 shadow-md text-white font-semibold ml-4"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
