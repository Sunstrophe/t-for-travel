import React from "react";
import LeafletMap from "../components/LeafletMap";

function Home() {
  const handleSearch = (lat, lon) => {
    // Handle search functionality if needed
    console.log("Coordinates:", lat, lon);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center px-20 pb-4 z-0">
        <div className="w-full lg:w-3/4 xl:w-2/3">
          <LeafletMap onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default Home;
