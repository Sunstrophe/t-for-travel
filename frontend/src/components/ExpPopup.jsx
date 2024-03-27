import React, { useEffect, useState, Link } from "react";
import { Popup } from "react-leaflet";
import placeholderImage from "../assets/placeholder-image.jpg";

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
                <div className="row-span-1 py-3 m-0 text-ellipsis">
                    {/* <Link to={test}> */}
                        <p className="h-full p-4 m-0 font-bold text-center text-ellipsis">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laborum placeat voluptatum corrupti
                            exercitationem temporibus pariatur dolor harum, necessitatibus quidem.
                        </p>
                    {/* </Link> */}
                </div>
                <div className="row-span-2 ">
                    <img className="object-cover w-full h-full" src={placeholderImage} alt="Loading..." />
                </div>
                {/* {console.log(experience)} */}
            </div>
        </Popup>
    );
}

export default ExpPopup;
