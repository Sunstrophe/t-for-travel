import React, { useEffect, useState } from "react";
import placeholderImage from "../assets/placeholder_image.jpg";
import { Link } from "react-router-dom";

function UserMyPosts({ userData, remountMyPosts }) {
    const [userPosts, setUserPosts] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        getUserPosts();
    }, [remountMyPosts]);

    const getUserPosts = async () => {
        // Url for user will be implemented in the future
        const user_id = userData.id;
        const url = `http://localhost:8000/user/${user_id}/experience`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data[0].title)
        setUserPosts(data);

        const urls = {};
        for (const experience of data) {
            if (experience.image) {
                const imageUrl = await getImage(experience.image);
                urls[experience.id] = imageUrl;
            }
        }
        setImageUrls(urls);
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

            return imageUrl;
        } catch (error) {
            console.error("Error fetching image", error);
            console.log(error);
            return null;
        }
    };

    return (
        <div className="max-h-[90vh] col-span-4 bg-white rounded-lg shadow sm:col-span-9">
            <div className="grid max-h-full grid-cols-3 gap-4 px-8 py-6 overflow-y-auto">
                {userPosts.length === 0 ? (
                    <p>Nothing posted!</p>
                ) : (
                    userPosts.map((experience) => {
                        const imageUrl = imageUrls[experience.id] || placeholderImage;
                        return (
                            <Link to={`/experience/${experience.id}`} key={experience.id}>
                                <div className="w-full h-64 overflow-hidden border rounded-lg shadow-lg">
                                    <h4 className="text-lg font-bold text-center text-ellipsis">{experience.title}</h4>
                                    <img className="object-cover w-full h-full" src={imageUrl} alt="" />
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default UserMyPosts;
