import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
    /*
  Search Location
 */

const SearchLocation = (props) => {
  // Get access to leaflet map
  const { provider } = props;

  // Get search control
  
  const searchControl = new GeoSearchControl({
    provider: provider,
  });

  //   Access Leaflet Map
  const map = useMap(props);
  useEffect(() => {
    // Add searchControl to Leaflet map
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  });

  return null; // Do not render any thing
};

function LeafletMap() {
  return (
    <MapContainer className="map" center={[59.325, 18.05]} zoom={15}> {/* Default map location*/}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />

      <SearchLocation provider={new OpenStreetMapProvider()} />
      {/* ... */}
    </MapContainer>
  );
}

export default LeafletMap;
