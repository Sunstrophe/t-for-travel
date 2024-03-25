import React, { useRef, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import Search from "./Search";

const originalCenter = [59.3342, 18.0586]

function LeafletMap() {
  const [map, setMap] = useState(null)


  // const getLatLng = () => {
  //   console.log(map.getCenter())

  // }


  const getExperiences = async() => {
    const mapCenter = map.getCenter()
    const lat = mapCenter["lat"]
    const lng = mapCenter["lng"]

    const response = await fetch(`http://localhost:8000/experience?lat=${lat}&lng=${lng}`, {
      method: "GET",
    })
    if (!response.ok) {
      throw new Error("Error getting experiences")
    }
    const experiences = await response.json()
    console.log(experiences)
  }


  return (
    <div className="relative flex-col">
      <button onClick={getExperiences}>test</button>
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
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
