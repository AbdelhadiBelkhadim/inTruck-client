import React from "react";

const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <div className="mb-4">
            <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                Username
            </label>
            <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="border border-gray-300 p-2 rounded w-full"
                required
            />
            </div>
            <div className="mb-4">
            <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                Email
            </label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="border border-gray-300 p-2 rounded w-full"
                required
            />
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
            Update Profile
            </button>
        </form>
        </div>
    );
    }


export default Profile;