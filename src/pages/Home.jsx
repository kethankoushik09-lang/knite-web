import React from "react";
import todoImage from "../assets/todo.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn,isAdmin } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f0f8ff] px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 m-3">
            Welcome to <br /> Task Manager
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Manage your tasks efficiently, assign work, and track progress — all
            in one place.
          </p>

          {/* Conditional Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start w-full md:w-auto">
            {isLoggedIn ? (
              // ✅ User logged in
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition w-full md:w-auto"
                onClick={() => navigate("/user/home")}
              >
                Get Started
              </button>
            ) : isAdmin ? (
              // ✅ Admin logged in
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition w-full md:w-auto"
                onClick={() => navigate("/admin-dashboard")}
              >
                Get Dashboard
              </button>
            ) : (
              // ✅ Neither logged in
              <>
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition w-full md:w-auto"
                  onClick={() => navigate("/user/signup")}
                >
                  Get Started
                </button>
                <button
                  className="bg-white text-gray-800 px-6 py-3 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition w-full md:w-auto"
                  onClick={() => navigate("/admin/login")}
                >
                  Admin Login
                </button>
              </>
            )}
          </div>
        </div>

        <div className="relative flex justify-center">
          <img
            src={todoImage}
            alt="Task Illustration"
            className="w-[300px] md:w-[500px] h-[250px] md:h-[400px] rounded-xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
