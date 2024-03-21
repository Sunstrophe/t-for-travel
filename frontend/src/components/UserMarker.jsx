import React, { useCallback, useEffect, useState } from "react";
import { Marker, useMap, useMapEvent, useMapEvents } from "react-leaflet";

function UserMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvent({
        move () {
            setPosition(map.getCenter())
        }
    })

    return position === null ? null : (
            // <p>
            //     latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)} <button onClick={onClick}>reset</button>
            // </p>
            <Marker position={position} />
    );
}

export default UserMarker;
