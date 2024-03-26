import React from "react";
import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-50">
      <div className="max-w-3xl w-full mx-auto p-14 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-10">
          Terms of Service and privacy policy
        </h2>
        <p className="mb-4">
          By using our site and engaging in any form of interaction, you
          acknowledge and agree to the following terms:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="m-4">
            <strong>Data Storage:</strong> Your searches and interactions on our
            platform are stored on our main page for analysis purposes. We
            assure you that this information remains confidential and will not
            be shared with any third party.
          </li>
          <li className="m-4">
            <strong>Information Usage:</strong> Your posts and shared content,
            including pictures, contribute to the enhancement and analysis of
            our platform. By creating posts and sharing images, you grant us
            permission to utilize this information for site improvement
            purposes.
          </li>
          <li className="m-4">
            <strong>Public Visibility:</strong> Posts and images marked as
            public will be visible to other users of the platform. By choosing
            to make your content public, you understand and agree to its
            visibility to others.
          </li>
          <li className="m-4">
            <strong>Acceptable Use:</strong> You agree not to engage in any
            illegal activities, spamming, or misconduct while using our
            services. Any violation of these terms may result in the termination
            of your account.
          </li>
        </ul>

        <p className="text-gray-600 mt-16 mb-4 text-left max-w-4xl mx-auto px-4">
          Feel free to{" "}
          <Link to="/contact" className="text-blue-500 hover:underline">
            contact us
          </Link>{" "}
          if you have any questions or feedback.
        </p>

        <p className="text-gray-600 mb-4 text-left max-w-4xl mx-auto px-4">
          <button
            onClick={() => window.history.back()} // Go back to the previous page
            className="bg-gray-800 text-white px-3 py-2 rounded-md border-r border-gray-100 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
          >
            <svg
              class="w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Previous page
          </button>
        </p>
      </div>
    </div>
  );
}

export default Terms;
