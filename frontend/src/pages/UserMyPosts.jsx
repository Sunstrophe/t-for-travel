import React, { useEffect, useState } from "react";
import placeholderImage from "../assets/placeholder_image.jpg"

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

    return (
        <div className="max-h-full px-8 py-6 overflow-y-auto">
            <div className="flex flex-col gap-4">
                {userPosts.length === 0 ? (
                    <p>Nothing posted!</p>
                ) : (
                    userPosts.map((experience, index) => {
                        return (
                            <div className="grid grid-cols-3 border-2 border-black h-60" key={index}>
                                <div className="flex flex-col col-span-2 gap-2 p-4">
                                    <h4 className="text-lg font-bold text-center">{experience.title}</h4>
                                    <p className="text-sm">{experience.description}</p>
                                </div>
                                <div className="flex items-center justify-center col-span-1">
                                    <img className="w-auto h-auto max-w-full max-h-full" src={placeholderImage} alt="Placeholder" />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default UserMyPosts;
