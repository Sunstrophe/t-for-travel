import React from "react";
import ExpSquare from "../components/ExpSquare";

function Userpage() {
  return (
    <div className="bg-gray-100 bg-opacity-50">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <h1 className="font-bold uppercase my-6">Posts</h1>
                <ExpSquare className="scale-125 my-6 hover:scale-150" />
              </div>
              <div className="flex flex-col items-center">

                <ExpSquare className="scale-125 my-6 hover:scale-150" />
              </div>
              <div className="flex flex-col items-center">

                <ExpSquare className="scale-125 my-6 hover:scale-150" />
              </div>
              <div className="flex flex-col items-center">

                <ExpSquare className="scale-125 my-6 hover:scale-150" />
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold">Username</h2>
              <button className="border border-gray-700 p-6 my-4 mx-4 rounded-md uppercase font-light hover:font-bold hover:bg-blue-100">
                  Make a new post
                </button>
              <hr className="my-2 border-t border-gray-300" />

              <div className="flex justify-between flex-wrap w-1/2 mt-6">
                <h2 className="text-xl font-bold mt-6 mb-4">User details</h2>
                <button className="border border-gray-700 px-4 py-2 my-4 mx-4 rounded-md">
                  Edit user details
                </button>
                
              </div>
              <div className="my-6">
                <div className="flex justify-between flex-wrap w-full">
                  <span className="text-gray-700 font-bold">Posts</span>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Aenean posuere risus non velit egestas suscipit.
                </p>
              </div>

              <div className="mb-6">
                <div className="flex w-full">
                  <span className="text-gray-700 font-bold">
                    Extra information or features
                  </span>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Aenean posuere risus non velit egestas suscipit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userpage;
