import React, { useRef, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import Search from "./Search";

const originalCenter = [59.3342, 18.0586]

function LeafletMap() {
  // const mapRef = useRef(null);
  const [map, setMap] = useState(null)
  // const [markerPosition, setMarkerPosition] = useState([59.3342, 18.0586]);
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   console.log(markerPosition)
  // }, [markerPosition])

  // Loading if map not displayed
  // useEffect(() => {
  //   console.log(map)
  //   if (map) {
  //     setIsLoading(true)
  //   }
  //   else {
  //     setIsLoading(false)
  //   }
  // }, [map])





  return (
    <div className="relative flex-col">
      <Search map={map} />
      {isLoading ? (
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
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
