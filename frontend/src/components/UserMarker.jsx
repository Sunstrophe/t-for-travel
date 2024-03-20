import React, { useState } from "react";
import { Marker, useMap } from "react-leaflet";

function UserMarker() {
    const [position, setPosition] = useState([50,50]);
    const map = useMap();

    

    console.log(map.getCenter())
    // setPosition(map.getCenter())

    console.log("Render UserMarker");

    return <Marker position={position}></Marker>;
}

export default UserMarker;
