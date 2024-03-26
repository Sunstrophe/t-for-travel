import React, { useEffect, useState } from "react";
import { Marker, useMapEvent } from "react-leaflet";

function CloseExperiences() {
    const [experiences, setExeperiences] = useState(null);

    const getExperiences = async () => {
        const mapCenter = map.getCenter();
        const lat = mapCenter["lat"];
        const lng = mapCenter["lng"];

        const response = await fetch(`http://localhost:8000/experience?lat=${lat}&lng=${lng}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Error getting experiences");
        }
        const data = await response.json();
        console.log(data);
        setExeperiences(data);
    };

    const map = useMapEvent({
        moveend() {
            // console.log("TEST!!!")
            getExperiences();
        },
    });

    useEffect(() => {
        getExperiences();
    }, []);

    const renderMarker = () => {
        if (!experiences) return null;

        return experiences.map((experience) => {
            const { latitude, longitude } = experience;
            return <Marker position={[latitude, longitude]} key={experience.id} />;
        });
    };

    return renderMarker();
}

export default CloseExperiences;
