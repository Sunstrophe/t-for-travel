import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import Search from "./Search";
import ExpSquare from "../components/ExpSquare";

const LeafletMap = ({ onSearch, selectedImage }) => {
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState([59.3342, 18.0586]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    handleSearch(markerPosition[0], markerPosition[1]);
    setIsLoading(false);
  }, [selectedImage, markerPosition]);

  useEffect(() => {
    const map = mapRef.current;

    if (map) {
      map.setView(markerPosition, 14);
    }
  }, [markerPosition]);

  const handleSearch = (lat, lon) => {
    onSearch(lat, lon);
    setMarkerPosition([lat, lon]);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <MapContainer center={markerPosition} zoom={14} style={{ height: "700px" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {/* Custom component directly rendered on the map */}
          <ExpSquare image={selectedImage ? URL.createObjectURL(selectedImage) : ""} position={markerPosition} />
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
