import React, { useState, useEffect } from "react";
import useAuthStore from "../stores/store";
import UserExperiencePost from "../components/UserExperiencePost";


function Userpage() {
  const userData = useAuthStore((state) => state.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPostIndex(null);
  };

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3 overflow-y-auto max-h-screen">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <h1 className="font-bold uppercase my-6">My latest post</h1>
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className={`mb-4 cursor-pointer ${selectedPostIndex === index ? "bg-gray-100" : ""}`}
                    onClick={() => setSelectedPostIndex(index)}
                  >
                    <img
                      src={URL.createObjectURL(post.image)}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {selectedPostIndex === index && (
                      <div className="expanded-post">
                        <hr className="my-2 border-t border-gray-300" />
                        <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
                        <p className="mt-2">{post.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <hr className="my-2 border-t border-gray-300" />
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold">Welcome {userData.first_name}</h2>
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
              {isModalOpen && (
                <UserExperiencePost onClose={handleCloseModal} onNewPost={handleNewPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userpage;
