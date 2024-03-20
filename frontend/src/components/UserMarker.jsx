import React, { useCallback, useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";

function UserMarker({ map }) {
    const [position, setPosition] = useState(() => map.getCenter());

    const onClick = useCallback(() => {
        map.setView(center, zoom);
    }, [map]);

    const onMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);

    return (
            // <p>
            //     latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)} <button onClick={onClick}>reset</button>
            // </p>
            <Marker position={position} />
    );
}

export default UserMarker;
