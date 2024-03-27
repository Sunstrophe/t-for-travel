import React, { useEffect, useState } from "react";
import { Popup } from "react-leaflet";
import placeholderImage from "../assets/placeholder_image.jpg";
import { Link } from "react-router-dom";

function ExpPopup({ experience }) {
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

    const test = () => {
        console.log("test");
    };

    return (
        <Popup className="popup-request">
            <div className="grid h-48 grid-rows-3 p-0 m-0 w-36">
                <div className="flex items-center w-full row-span-1 overflow-hidden text-ellipsis">
                    <Link
                        className="w-full p-2 m-0 overflow-hidden text-sm font-bold text-center whitespace-nowrap text-ellipsis"
                        to={`/experience/${experience.id}`}
                    >
                        {experience.title}
                    </Link>
                </div>
                <div className="row-span-2">
                    <img className="object-cover w-full h-full rounded-lg" src={placeholderImage} alt="Loading..." />
                </div>
                {/* {console.log(experience)} */}
            </div>
        </Popup>
    );
}

export default ExpPopup;
