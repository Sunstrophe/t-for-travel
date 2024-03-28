import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="h-24 py-6 bg-gradient-to-r from-lime-400 to-green-400">
            <div className="container flex items-center justify-center mx-auto">
                <Link to="/contact" className="mr-4 font-thin text-white hover:underline">
                    Contact us
                </Link>
                <div className="h-6 mx-4 border-r border-white"></div>
                <Link to="/about" className="mx-4 font-thin text-white hover:underline">
                    About
                </Link>
                <div className="h-6 mx-4 border-l border-white"></div>
                <Link to="/terms" className="ml-4 font-thin text-white hover:underline">
                    Terms of Service
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
