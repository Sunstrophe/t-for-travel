import React, { useState, useRef, useEffect } from 'react';
import LeafletMap from './LeafletMap';

const UserExperiencePost = ({ onClose, onNewPost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [positiveExperience, setPositiveExperience] = useState(true); // Default to true
  const [isPublic, setIsPublic] = useState(true); // Default to true
  const modalContentRef = useRef(null);

  useEffect(() => {
    adjustModalPosition();
  }, [title, description, selectedImage, isMapVisible]);

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

  const handleSearch = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const handleSave = () => {
    const newPost = {
      title,
      description,
      image: selectedImage,
      latitude,
      longitude,
      positiveExperience,
      isPublic,
    };

    onNewPost(newPost);

    setTitle('');
    setDescription('');
    setSelectedImage(null);
    setIsMapVisible(false);
    setLatitude(null);
    setLongitude(null);
    setPositiveExperience(true); // Reset to default
    setIsPublic(true); // Reset to default
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div
        ref={modalContentRef}
        className="bg-white p-8 rounded-md w-[48rem] max-h-screen overflow-y-auto fixed"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-1/2 border p-2 rounded-lg mb-2"
            placeholder="Enter the title of your post"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="w-1/2 border p-2 rounded-lg"
            placeholder="Enter the description of your post"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload an Image:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-1/2 border p-2 rounded-lg"
          />
          <p className="text-gray-500 text-sm mt-2">- or drag and drop an image here -</p>
        </div>

        {selectedImage && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Location:</label>
          <button
            className="w-1/2 border p-2 rounded-lg"
            onClick={handleToggleMap}
          >
            {isMapVisible ? 'Hide Map' : 'Show Map'}
          </button>
          {isMapVisible && <LeafletMap onSearch={handleSearch} />}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Positive Experience?</label>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="positiveYes"
              name="positiveExperience"
              value="true"
              checked={positiveExperience}
              onChange={() => setPositiveExperience(true)}
            />
            <label htmlFor="positiveYes" className="ml-2">Yes</label>
            <input
              type="radio"
              id="positiveNo"
              name="positiveExperience"
              value="false"
              checked={!positiveExperience}
              onChange={() => setPositiveExperience(false)}
              className="ml-4"
            />
            <label htmlFor="positiveNo" className="ml-2">No</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Public?</label>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="publicYes"
              name="isPublic"
              value="true"
              checked={isPublic}
              onChange={() => setIsPublic(true)}
            />
            <label htmlFor="publicYes" className="ml-2">Yes</label>
            <input
              type="radio"
              id="publicNo"
              name="isPublic"
              value="false"
              checked={!isPublic}
              onChange={() => setIsPublic(false)}
              className="ml-4"
            />
            <label htmlFor="publicNo" className="ml-2">No</label>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:text-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserExperiencePost;
