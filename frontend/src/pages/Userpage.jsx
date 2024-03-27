import React, { useState, useEffect } from "react";
import useAuthStore from "../stores/store";
import UserExperiencePost from "../components/UserExperiencePost";
import { useNavigate } from "react-router-dom";
import UserSettings from "./UserSettings";
import UserFollowedPosts from "./UserFollowedPosts";
import UserMyPosts from "./UserMyPosts";

function Userpage() {
    const { token, logout, fetchUser, userData } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, []);

    function handleLogout() {
        logout();
        navigate("/");
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState("UserMyPosts");
    const [remountMyPosts, setRemountMyPosts] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setRemountMyPosts(prev => !prev)
    };

    const setMyPosts = () => {
        setSelectedPage("UserMyPosts");
    };

    const setFollowedPosts = () => {
        setSelectedPage("UserFollowedPosts");
    };

    const setUserSettings = () => {
        setSelectedPage("UserSettings");
    };

    return !userData ? (
        <div className="min-h-screen">
            <div className="container my-8 mx-auto bg-white rounded-lg shadow-lg h-[90vh] flex flex-col justify-center items-center">
                <p className="text-4xl font-extrabold text-red-500">You are not logged in</p>
            </div>
        </div>
    ) : (
        <div className="flex flex-col min-h-screen">
            <div className="container py-8 mx-auto ">
                <div className="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
                    {/* LEFT SIDEBAR */}
                    <div className="col-span-4 sm:col-span-3">
                        <div className="flex flex-col max-h-[90vh] bg-white p-6 rounded-lg shadow-lg ">
                            <div className="flex flex-col items-center">
                                <button
                                    className="p-6 mx-4 my-4 font-light uppercase border border-gray-700 rounded-md hover:font-bold hover:bg-gray-100"
                                    onClick={handleOpenModal}
                                >
                                    Make a new post
                                </button>
                            </div>
                            <hr className="my-2 border-t border-gray-300" />
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col items-start">
                                    <button onClick={setMyPosts}>My Experiences</button>
                                    <button onClick={setFollowedPosts}>Follow Page</button>
                                </div>
                            </div>
                            <hr className="my-2 border-t border-gray-300" />
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col items-start">
                                    <button onClick={setUserSettings}>Settings</button>
                                    <button className="font-bold text-red-500" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Center POSTS */}
                    {selectedPage === "UserMyPosts" ? <UserMyPosts userData={userData} remountMyPosts={remountMyPosts} /> : null}
                    {selectedPage === "UserFollowedPosts" ? <UserFollowedPosts /> : null}
                    {selectedPage === "UserSettings" ? <UserSettings /> : null}
                    {/* MODAL */}
                    {isModalOpen && <UserExperiencePost key={remountMyPosts ? "1" : "0"} onClose={handleCloseModal} userData={userData} />}
                </div>
            </div>
        </div>
    );
}

export default Userpage;
