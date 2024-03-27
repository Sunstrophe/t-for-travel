import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/store";

function LoggedInButton({ userData }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const { logout } = useAuthStore();

    const testButton = () => {
        console.log("logout");
    };

    return (
        <div className="relative">
            <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
                {userData.username ? userData.username : "User"}
            </button>
            {menuOpen && (
                <div className="absolute right-0 mt-4 bg-white rounded-md shadow-md top-full md:w-32">
                    <div className="flex flex-col gap-2 p-6">
                        <Link to="/userpage" className="text-center" onClick={() => setMenuOpen(!menuOpen)}>
                            My Page
                        </Link>
                        <hr />
                        <button className="font-bold text-red-500" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoggedInButton;
