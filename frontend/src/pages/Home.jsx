// Home.jsx
import React from "react";
import MapWrapper from "../components/LeafletMap";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 bg-opacity-50">
      <div className="flex justify-center items-center px-20 pb-4 z-0">
        <div className="w-full lg:w-3/4 xl:w-2/3">
          <MapWrapper />
        </div>
      </div>
    </div>
  );
}

export default Home;
