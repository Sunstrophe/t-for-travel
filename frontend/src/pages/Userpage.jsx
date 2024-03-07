import React, { useState } from "react";
import UserExperiencePost from "../components/UserExperiencePost";

function Userpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    handleCloseModal(); // Close the modal after adding a new post
  };

  return (
    <div className="bg-gray-100 bg-opacity-50">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3 overflow-y-auto max-h-screen">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <h1 className="font-bold uppercase my-6">Latest post</h1>
                {posts.map((post, index) => (
                  <div key={index} className="mb-4">
                    
                    <img
                      src={URL.createObjectURL(post.image)}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {index === 0 && <hr className="my-2 border-t border-gray-300" />}
                    <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
                    <p className="mt-2">{post.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold">Username</h2>
              <button
                className="border border-gray-700 p-6 my-4 mx-4 rounded-md uppercase font-light hover:font-bold hover:bg-gray-100"
                onClick={handleOpenModal}
              >
                Make a new post
              </button>
              <hr className="my-2 border-t border-gray-300" />

              <div className="flex justify-between flex-wrap w-1/2 mt-6">
                <h2 className="text-xl font-bold mt-6 mb-4">User details</h2>
                <button className="border border-gray-700 px-4 py-2 my-4 mx-4 rounded-md">
                  Edit user details
                </button>
              </div>
              {isModalOpen && <UserExperiencePost onClose={handleCloseModal} onNewPost={handleNewPost} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userpage;
