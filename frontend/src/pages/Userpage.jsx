import React, { useState, useEffect } from "react";
import useAuthStore from "../stores/store";
import UserExperiencePost from "../components/UserExperiencePost";
import { useNavigate } from "react-router-dom";


function Userpage() {
  const { token, logout, fetchUser, userData } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }


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
      <div className="container py-8 mx-auto">
        <div className="grid grid-cols-4 gap-6 px-4 sm:grid-cols-12">
          <div className="max-h-screen col-span-4 overflow-y-auto sm:col-span-3">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="flex flex-col items-center">
                <h1 className="my-6 font-bold uppercase">My latest post</h1>
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className={`mb-4 cursor-pointer ${selectedPostIndex === index ? "bg-gray-100" : ""}`}
                    onClick={() => setSelectedPostIndex(index)}
                  >
                    <img
                      src={URL.createObjectURL(post.image)}
                      alt={post.title}
                      className="object-cover w-full h-48 rounded-lg"
                    />
                    {selectedPostIndex === index && (
                      <div className="expanded-post">
                        <hr className="my-2 border-t border-gray-300" />
                        <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
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
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-bold">Username</h2>
              <button
                className="p-6 mx-4 my-4 font-light uppercase border border-gray-700 rounded-md hover:font-bold hover:bg-gray-100"
                onClick={handleOpenModal}
              >
                Make a new post
              </button>
              <hr className="my-2 border-t border-gray-300" />

              <div className="flex flex-wrap justify-between w-1/2 mt-6">
                <h2 className="mt-6 mb-4 text-xl font-bold">User details</h2>
                <button className="px-4 py-2 mx-4 my-4 border border-gray-700 rounded-md">
                  Edit user details
                </button>
              </div>
              {isModalOpen && (
                <UserExperiencePost onClose={handleCloseModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userpage;
