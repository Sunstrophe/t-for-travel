import React, { useCallback, useState } from "react";

function Search({ map }) {
    const [prompt, setPrompt] = useState("");

    const handleInput = (event) => {
        setPrompt(event.target.value)
    }

    const handleSearch = () => {
        // Split the input value into latitude and longitude
        // const [lat, lon] = coordinates.split(",").map(coord => parseFloat(coord.trim()));

        fetch(`http://localhost:8000/location?search_prompt=${prompt}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Handle successful response
                // console.log(data);
                // console.log(data[0]["latitude"])
                // console.log(data[0]["longitude"])
                map.setView([data[0]["latitude"], data[0]["longitude"]], map.getZoom())
            })
            .catch((error) => {
                // Handle fetch errors
                console.error("There was a problem with the fetch operation:", error);
            });

        // Check if both latitude and longitude are provided and are valid numbers
        // if (!isNaN(lat) && !isNaN(lon)) {
        //   onSearch(lat, lon);
        // }
    };

    const handleTest = useCallback(() => {
        map.setView([51, 0], map.getZoom())
    }, [map])

    return (
        <div className="flex justify-center px-4 pt-4 pb-4">
            <div className="w-full max-w-screen-sm">
                <div className="flex">
                    {/* <button onClick={handleTest} className="px-6 py-4 ml-4 font-semibold text-white bg-blue-500 rounded-lg">
                        Test Button
                    </button> */}
                    <input
                        value={prompt}
                        onChange={handleInput}
                        className="flex-1 px-6 py-4 text-2xl font-thin border-2 border-gray-200 rounded-lg focus:outline-none"
                        type="text"
                        placeholder="Where do you want to go?"
                    />
                    <button onClick={handleSearch} className="px-6 py-4 ml-4 font-semibold text-white bg-blue-500 rounded-lg">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;
