import React from "react";
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from "react-icons/fa";

export default function UserTasks({ user, goBack }) {
  return (
    <div className="min-h-screen bg-[#f0f8ff] p-6 flex flex-col items-center">
      <button
        onClick={goBack}
        className="self-start mb-6 flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {user.name}'s Tasks
      </h2>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        {user.tasks.map((task, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center p-4 rounded-xl shadow-md transition hover:shadow-lg ${
              task.completed ? "bg-green-50 border border-green-300" : "bg-white border border-gray-200"
            }`}
          >
            <div>
              <h3
                className={`font-semibold text-gray-800 text-lg ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </h3>
              <p
                className={`text-gray-600 ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.description || "No description"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {task.completed ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <FaTimesCircle className="text-red-500 text-xl" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
