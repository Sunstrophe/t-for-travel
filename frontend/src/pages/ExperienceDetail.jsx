import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ExperienceDetail() {
    const { experience_id } = useParams();
    const [experience, setExperience] = useState(null);

    const getExperience = async () => {
        const url = `http://localhost:8000/experience/${experience_id}`;
        const response = await fetch(url);
        const data = await response.json();
        setExperience(data);
    };

    useEffect(() => {
        getExperience();
    }, []);

    return (
        <div className="min-h-screen">
            <div className="container h-full py-8 mx-auto ">
                <div className="p-10 bg-white rounded-lg shadow-lg">
                    {experience === null ? (
                        <div>Nothing here</div>
                    ) : (
                        <div>
                            <h1>{experience.title}</h1>
                            <p>{experience.description}</p>
                            <p>experience id: {experience.id}</p>
                        </div>
                    )}
                </div>
            </div>
            {/* <h1>Exp id: {experience_id}</h1> */}
        </div>
    );
}

export default ExperienceDetail;
