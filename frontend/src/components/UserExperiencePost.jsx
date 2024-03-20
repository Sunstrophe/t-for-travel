import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import Search from "./Search";
import Switch from "react-switch";
import UserMarker from "./UserMarker";

const sthlmCenter = [59.3342, 18.0586]


const UserExperiencePost = ({ onClose, onNewPost }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [position, setPosition] = useState(sthlmCenter); // Default coordinates
    const [positiveExperience, setPositiveExperience] = useState(true);
    const [isPublic, setIsPublic] = useState(true);
    // const [markerPosition, setMarkerPosition] = useState(null)
    const [map, setMap] = useState(null)

    const modalContentRef = useRef(null);

    useEffect(() => {
        adjustModalPosition();
    }, [title, description, selectedImage]);

    const adjustModalPosition = () => {
        const contentHeight = modalContentRef.current.clientHeight;
        const windowHeight = window.innerHeight;

        const modal = modalContentRef.current.parentNode;
        const modalHeight = modal.clientHeight;

        const modalTop = windowHeight / 2 - modalHeight / 2;
        const modalBottom = windowHeight / 2 - contentHeight / 2;

        modal.style.top = `${Math.max(20, modalTop)}px`;
        modal.style.bottom = `${Math.max(20, modalBottom)}px`;
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedImage(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (file) {
            setSelectedImage(file);
        }
    };

    const handleToggleMap = () => {
        setIsMapVisible(!isMapVisible);
    };

    const handleSave = () => {
        // Make backend call here
        try {
            fetch("http://127.0.0.1/image", {
                method: "POST",
                body: selectedImage,
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        } catch (error) {
            console.error("Error uploading file", error);
        }

        const newPost = {
            title,
            description,
            image: selectedImage,
            coordinates,
            positiveExperience,
            isPublic,
        };

        onNewPost(newPost);

        // Then make it make a call for fetch all our posts on the side

        setTitle("");
        setDescription("");
        setSelectedImage(null);
        setIsMapVisible(false); // Close the map when saving
        setCoordinates([59.31, 18.07]); // Reset coordinates to default
        setPositiveExperience(true);
        setIsPublic(true);

        // Close the modal
        onClose();
    };

    const handleSearch = (lat, lon) => {
        setCoordinates([lat, lon]);
    };

    const handleTest = () => {
      console.log(map.getCenter())
    }

    useEffect (() => {
      
    }, [map])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div
                ref={modalContentRef}
                className="bg-white p-8 rounded-md w-[48rem] max-h-screen overflow-y-auto fixed"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h2 className="mb-4 text-2xl font-bold">Create a New Post</h2>
                {/* TITLE */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-1/2 p-2 mb-2 border rounded-lg"
                        placeholder="Enter the title of your post"
                    />
                </div>
                {/* DESCRIPTION */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-1/2 p-2 border rounded-lg"
                        placeholder="Enter the description of your post"
                    />
                </div>
                {/* IMAGE STUFF */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload an Image:</label>
                    <input type="file" onChange={handleImageUpload} className="w-1/2 p-2 border rounded-lg" />
                    <p className="mt-2 text-sm text-gray-500">- or drag and drop an image here -</p>
                </div>
                {selectedImage && (
                    <div className="mb-4">
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                            className="object-cover w-full h-48 rounded-lg"
                        />
                    </div>
                )}
                {/* MAP CONTAINER  */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Select Location:</label>
                    <div className="flex items-center">
                        <button className="w-1/2 p-2 border rounded-lg" onClick={handleToggleMap}>
                            {isMapVisible ? "Hide Map" : "Show Map"}
                        </button>
                        {/* {isMapVisible && <Search onSearch={handleSearch} />} */}
                    </div>
                    {isMapVisible && (
                        <div>
                          <MapContainer
                            center={position}
                            zoom={14}
                            style={{ height: "300px", marginTop: "10px" }}
                            ref={setMap}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                            />
                            { map ? (<Marker position={map.getCenter()}/>) : <p>Loading...</p>}
                            {/* <UserMarker /> */}
                            
                          </MapContainer>
                          <button className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600" onClick={handleTest}>
                            test
                          </button>
                        </div>
                    )}
                </div>
                {/* POSTITIVE EXPERIENCE */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Positive Experience:</label>
                    <Switch
                        checked={positiveExperience}
                        onChange={(checked) => setPositiveExperience(checked)}
                        className="ml-2"
                    />
                </div>
                {/* IS PUBLIC */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Public:</label>
                    <Switch checked={isPublic} onChange={(checked) => setIsPublic(checked)} className="ml-2" />
                </div>
                {/* BUTTONS */}
                <div className="flex justify-between">
                    <button className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600" onClick={handleSave}>
                        Save
                    </button>
                    <button className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserExperiencePost;
