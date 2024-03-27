import React, { useState } from "react";

function LoggedInButton({ userData }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return <div className="relative">
         <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>{userData.first_name ? userData.first_name : "User"}</button>
        {menuOpen && (<div className="text-white">open</div>)}
    </div>
    
    ;
}

export default LoggedInButton;
