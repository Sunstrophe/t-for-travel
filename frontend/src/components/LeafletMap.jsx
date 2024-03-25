import React, { useRef, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';
import Search from "./Search";
import CloseExperiences from "./CloseExperiences";

const originalCenter = [59.3342, 18.0586]

function LeafletMap() {
  const [map, setMap] = useState(null)


  // const getLatLng = () => {
  //   console.log(map.getCenter())

  // }
  

  


  return (
    <div className="relative flex-col">
      {/* <button onClick={getExperiences}>test</button> */}
      <Search map={map} />
      {false ? (
        <p>Loading...</p>
      ) : (
        <MapContainer 
          className="h-48"
          center={originalCenter} 
          zoom={14} 
          ref={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <CloseExperiences />
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
