import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Search from "./Search";
import ExpShort from "../components/ExpShort";

const MapWrapper = ({ onSearch, selectedImage }) => {
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState([59.31, 18.07]);

  useEffect(() => {
    handleSearch(markerPosition[0], markerPosition[1]);
  }, [selectedImage]);

  const handleSearch = (lat, lon) => {
    onSearch(lat, lon);
    setMarkerPosition([lat, lon]);

    const map = mapRef.current;

    if (map) {
      map.setView([lat, lon], 14);
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <MapContainer ref={mapRef} center={markerPosition} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* Custom marker using ExpShort component */}
        <Marker position={markerPosition}>
          <Popup>
            <ExpShort image={selectedImage} />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
