// LeafletMap.jsx
import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet'; 
import Search from "./Search";

const MapWrapper = () => {
  const mapRef = useRef(null);
  const handleSearch = (lat, lon) => {
    const map = mapRef.current;
    // Set coordinates and make a marker at the input coordinates, with zoom level of 14
    if (map) {
      map.setView([lat, lon], 14);
      L.marker([lat, lon]).addTo(map);
    }
  };

  return (
    <div>
      
      <Search onSearch={handleSearch} />
      <MapContainer ref={mapRef} center={[59.31, 18.07]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
