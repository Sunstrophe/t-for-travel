import React, { useEffect } from "react";
import LoginMenu from "./LoginMenu";
import { Link } from "react-router-dom";
import LoggedInButton from "./LoggedInButton";
import useAuthStore from "../stores/store";

function Header() {
    const { token, logout, fetchUser, userData } = useAuthStore();

    useEffect(() => {
        if (token) {
            fetchUser();
        }
        console.log(userData)
    }, []);

    useEffect(() => {
        let prevScrollPos = window.scrollY;

        // Event listener to handle scroll behavior
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            if (prevScrollPos > currentScrollPos) {
                document.getElementById("header").style.transform = "translateY(0)";
            } else {
                document.getElementById("header").style.transform = "translateY(-100%)";
            }

            prevScrollPos = currentScrollPos;
        };

        // Attach the scroll event listener when the component mounts
        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array to run the effect only once on mount

    return (
        <header
            id="header"
            className="z-50 flex items-center justify-between h-20 transition-transform duration-300 transform border-b bg-gradient-to-r from-lime-400 to-green-400"
        >
            <Link to="/" className="ml-24 rounded-t-lg">
                <img
                    src="https://www.shutterstock.com/shutterstock/photos/1806925870/display_1500/stock-vector-t-letter-logo-design-on-luxury-background-tt-monogram-initials-letter-logo-concept-t-icon-design-1806925870.jpg"
                    alt="Logo"
                    className="h-14"
                />
            </Link>
            <div className="p-2 mr-24 border border-gray-500 rounded-lg shadow-lg bg bg-slate-800">
                {!userData ? <LoginMenu /> : <LoggedInButton userData={userData} />}
            </div>
        </header>
    );
}

export default Header;
