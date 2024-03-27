import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Switch from "react-switch";
import UserMarker from "./UserMarker";

const sthlmCenter = [59.3342, 18.0586];

function UserExperiencePost({ onClose, userData }) {
    const [title, setTitle] = useState("");
    const [isTitleOOB, setIsTitleOOB] = useState(true)
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageToBig, setIsImageToBig] = useState(false)
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [positiveExperience, setPositiveExperience] = useState(true);
    const [isPublic, setIsPublic] = useState(true);
    const [map, setMap] = useState(null);
    const [inputTouched, setInputTouched] = useState(false)

    let newPost = {}

    const modalContentRef = useRef(null);

    useEffect(() => {
        adjustModalPosition();
    }, []);

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
    
    const checkTitle = () => {
        // console.log(title.length)
        if (title.length < 3) {
            setIsTitleOOB(true)
        }
        else {
            setIsTitleOOB(false)
        }
        handleInputFocus()
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            if (file.size > 1000000) {
                setIsImageToBig(true)
            }
            else {
                setIsImageToBig(false)
            }
    }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // const checkImageSize = () => {
    //     console.log(selectedImage.size)
    //     if (selectedImage.size > 1000000) {
    //         setIsImageToBig(true)
    //     } else {
    //         console.log("test")
    //         setIsImageToBig(false)
    //     }
    // }

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        setSelectedImage(file);
        if (file) {
            if (file.size > 1000000) {
                setIsImageToBig(true)
            }
            else {
                setIsImageToBig(false)
            }
        }
    };

    const handleToggleMap = () => {
        setIsMapVisible(!isMapVisible);
    };

    const postExperience = async(newPost, imageName) => {
        // console.log("newPost: ", newPost)
        try {
            const response = await fetch("http://127.0.0.1:8000/experience", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
            if (!response.ok) {
                throw new Error(`Error posting experience: ${response.status}`)
            }
            const experience = await response.json()
            return experience
        } catch (error) {
            if (imageName !== null){
                await removeImage(imageName)
            }
            console.error("Error posting experience", error);
        }
    }

    const postImage = async() => {
        try {
            const formData = new FormData()
            formData.append("file", selectedImage)
            const response = await fetch("http://127.0.0.1:8000/image", {
                method: "POST",
                body: formData,
            })
            if (!response.ok) {
                throw new Error(`Error posting image: ${response.status}`)
            }        
            // console.log("response: ", response)
            const data = await response.json()
            // console.log("data: ", data)
            return data["filename"]
        } catch (error) {
            console.error("Error uploading file", error);
        }
    }

    const removeImage = async(imageName) => {
        // console.log("imageName: ", imageName)
        const url = `http://127.0.0.1:8000/image/?filename=${imageName}`
        const response = await fetch(url, {
            method: "DELETE",
        })
        console.log(response)
        return response
    }

    const handlePost = async() => {
        let imageName = null
        
        if (selectedImage !== null) {
            imageName = await postImage()
        }
        // console.log("imageName: ", imageName)
        
        if (map === null || isMapVisible === false) {
            var lat = null;
            var lng = null;
        } else {
            var lat = map.getCenter()["lat"];
            var lng = map.getCenter()["lng"];
        }
        
        newPost = {
            title: title,
            description: description,
            image: imageName,
            latitude: lat,
            longitude: lng,
            is_positive: positiveExperience,
            is_public: isPublic,
            user_id: userData.id
        };
        
        await postExperience(newPost=newPost, imageName=imageName)
        // console.log("experience: ", experience)

        // Reset our states

        setTitle("");
        setDescription("");
        setSelectedImage(null);
        setIsMapVisible(false); // Close the map when saving
        setPositiveExperience(true);
        setIsPublic(true);
        setMap(null);
        setInputTouched(false)
        
        // Then make it make a call for fetch all our posts on the side

        // Close the modal
        onClose();
    };

    const handleMarkerPos = () => {
        console.log(map);
        console.log(map.getCenter());
        console.log(map.getCenter()["lat"]);
    };

    const handleInputFocus = () => {
        setInputTouched(true)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div
                ref={modalContentRef}
                className="bg-white p-8 rounded-md w-[48rem] max-h-screen overflow-y-auto fixed"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h2 className="mb-4 text-2xl font-bold">Create a New Post</h2>
                <button onClick={() => {console.log(userData)}}>TEST</button>
                {/* TITLE */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        onBlur={checkTitle}
                        className="w-1/2 p-2 mb-2 border rounded-lg"
                        placeholder="Enter the title of your post"
                        maxLength={100}
                    />
                    {inputTouched && isTitleOOB ? <p className="text-sm text-red-500">Must be more than 3 characters</p> : null}
                </div>
                {/* DESCRIPTION */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Enter the description of your post"
                        maxLength={255}
                    />
                    <div className="flex">
                        <p className="p-1 mt-1 ml-auto text-xs text-gray-600 border border-gray-600 rounded-md">{description.length}/255</p>
                    </div>
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
                            {isImageToBig ? <p className="text-sm text-red-500">Image to big! Image size limit 1mb</p> : null}
                    </div>
                )}
                {/* MAP CONTAINER  */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Select Location:</label>
                    <div className="flex items-center">
                        <button className="w-1/2 p-2 border rounded-lg" onClick={handleToggleMap}>
                            {isMapVisible ? "Hide Map" : "Show Map"}
                        </button>
                    </div>
                    {isMapVisible && (
                        <div>
                            <button
                                className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                                onClick={handleMarkerPos}
                            >
                                Marker pos
                            </button>
                            <MapContainer
                                center={sthlmCenter}
                                zoom={14}
                                style={{ height: "300px", marginTop: "10px" }}
                                ref={setMap}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                />
                                {/* {map ? <Marker draggable={true} position={position} ref={setMarker} /> : <p>Loading...</p>} */}
                                <UserMarker />
                            </MapContainer>
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
                    <button className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400" onClick={handlePost} disabled={isTitleOOB || isImageToBig}>
                        Post
                    </button>
                    <button className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserExperiencePost;
