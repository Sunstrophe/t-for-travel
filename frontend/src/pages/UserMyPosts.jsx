import React, { useEffect, useState } from "react";
import placeholderImage from "../assets/placeholder_image.jpg";
import { Link } from "react-router-dom";

function UserMyPosts() {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        getUserPosts();
    }, []);

    const getUserPosts = async () => {
        // Url for user will be implemented in the future
        const user_id = "1";
        const url = `http://localhost:8000/user/${user_id}/experience`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data[0].title)
        setUserPosts(data);
    };

    // const sendToExperience = (experience_id) => {
    //     <Navigate to="" />
    // }

    return (
        <div className="grid max-h-full grid-cols-3 gap-4 px-8 py-6 overflow-y-auto">
            {userPosts.length === 0 ? (
                <p>Nothing posted!</p>
            ) : (
                userPosts.map((experience, index) => {
                    return (
                        <Link to={`/experience/${experience.id}`} key={index} >
                            <div
                                className="overflow-hidden border rounded-lg shadow-lg"
                            >
                                <h4 className="text-lg font-bold text-center text-ellipsis">{experience.title}</h4>
                                <img className="w-auto h-auto max-w-full max-h-full" src={placeholderImage} alt="Placeholder" />
                            </div>
                        </Link>
                    );
                })
            )}
        </div>
    );
}

export default UserMyPosts;
