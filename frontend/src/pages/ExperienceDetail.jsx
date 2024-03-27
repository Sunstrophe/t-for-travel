import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import placeholderImage from "../assets/placeholder_image.jpg";
import thumbDown from "../assets/thumb_down.png";
import thumbUp from "../assets/thumb_up.png";

function ExperienceDetail() {
    const { experience_id } = useParams();
    const [experience, setExperience] = useState(null);
    const [user, setUser] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        getExperience();
    }, []);

    const getExperience = async () => {
        const url = `http://localhost:8000/experience/${experience_id}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        setExperience(data);
        if (data.user_id) {
            getUsername(data.user_id);
        }
        if (data.image) {
            getImage(data.image);
        }
    };

    const getUsername = async (user_id) => {
        const url = `http://127.0.0.1:8000/user/${user_id}`;
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            console.error("Failed to find user");
        }
        const data = await response.json();
        // console.log("UsER DATA", data)
        setUser(data);
    };

    const getImage = async (imageName) => {
        const url = `http://127.0.0.1:8000/image/${imageName}`;
        try {
            const response = await fetch(url, {
                method: "GET",
            });
            // console.log(imageName);
            if (!response.ok) {
                throw new Error("Failed to fetch image!");
            }
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            // console.log(imageUrl);

            setImageUrl(imageUrl);
        } catch (error) {
            console.error("Error fetching image", error);
            return null;
        }
    };

    return (
        <div className="min-h-screen">
            <div className="container h-full py-8 mx-auto">
                <div className="px-10 py-5 bg-white rounded-lg shadow-lg">
                    {experience ? (
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between mx-8 mb-6">
                                <div className="flex items-center justify-center col-span-1 row-span-1">
                                    <h1 className="text-xl font-bold">{experience.title}</h1>
                                </div>
                                {user ? (
                                    <button className="w-16 h-16 overflow-hidden text-sm font-bold text-white bg-gray-900 rounded-full text-ellipsis">
                                        {user.username}
                                    </button>
                                ) : null}
                            </div>
                            <hr className="mb-6" />
                            <div className="grid grid-cols-3 gap-4 grid-row-3">
                                <div className="h-64 row-span-2 overflow-y-auto">
                                    <p className="h-full p-2 text-sm shadow-inner">{experience.description}</p>
                                </div>
                                <div className="col-span-2 row-span-3 max-h-96">
                                    {imageUrl ? (
                                        <img className="object-contain w-full h-full" src={imageUrl} alt="" />
                                    ) : (
                                        <img className="object-contain w-full h-full" src={placeholderImage} alt="" />
                                    )}
                                </div>
                                <div className="flex items-center justify-start">
                                    {experience.is_positive ? (
                                        <img
                                            className="w-16 h-16 p-2 ml-8 bg-green-400 border border-green-700 rounded-full shadow-lg"
                                            src={thumbUp}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className="w-16 h-16 p-2 ml-8 bg-red-400 border border-red-700 rounded-full shadow-lg"
                                            src={thumbDown}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <div></div>
                            </div>
                        </div>
                    ) : (
                        <div>Nothing here</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ExperienceDetail;
