import React from "react";
import Search from "../components/Search";
import LeafletMap from "../components/LeafletMap";


function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Search/>
      <div className="flex justify-center px-20 pb-4">
        <LeafletMap/>
      </div>
    </div>
  );
}

export default Home;
