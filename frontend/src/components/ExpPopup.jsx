import React, { useEffect, useState } from "react";
import { Popup } from "react-leaflet";

function ExpPopup(experience) {
    const [imageSrc, setImageSrc] = useState(null);

    const getImage = async () => {
        try {
            const response = await fetch(`http://localhost:8000/image?${experience.image}`);
            const imageBlob = await response.blob();
            const image = URL.createObjectURL(imageBlob);
            setImageSrc(image);
        } catch (error) {
            console.error("Error fetching image", error);
        }
    };

    return (
        <Popup>
            <div className="grid w-40 grid-rows-2 border border-black">
                <img src="imageSrc" alt="Loading..." />
                <div>
                    <p>{experience.title}</p>
                    <p>{experience.description}</p>
                </div>
            </div>
        </Popup>
    );
}

export default ExpPopup;
