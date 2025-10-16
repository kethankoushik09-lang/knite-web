import React, { useState } from "react";
import { FaTasks, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import UserTasks from "./UserTask";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { admin } = useSelector((state) => state.auth);
  console.log("Admin data:", admin);

  // Make sure userStats exists and is an array
  const users = admin|| [];

  if (selectedUser) {
    return (
      <UserTasks user={selectedUser} goBack={() => setSelectedUser(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f8ff] p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => {
            const totalTasks = user.tasks?.length || 0;
            const completedTasks =
              user.tasks?.filter((t) => t.completed)?.length || 0;
            const incompleteTasks = totalTasks - completedTasks;

            return (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition relative"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {user.name}
                </h3>
                <p className="text-gray-500 mb-4">{user.email}</p>

                <div className="flex items-center gap-4 mb-2">
                  <FaTasks className="text-gray-400" />
                  <span className="font-medium text-gray-700">
                    {totalTasks} Tasks
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-green-600 font-semibold">
                    {completedTasks} Completed
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <FaTimesCircle className="text-red-500" />
                  <span className="text-red-600 font-semibold">
                    {incompleteTasks} Incomplete
                  </span>
                </div>

                <button
                  onClick={() => setSelectedUser(user)}
                  className="mt-4 bg-green-600 text-white px-3 py-2 rounded-md text-sm hover:bg-green-700 transition"
                >
                  View Tasks
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
