import { useState } from "react";
import {
  FaTrash,
  FaCheck,
  FaUndo,
  FaEdit,
  FaSave,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export default function TaskPage() {
  const { user } = useSelector((state) => state.auth);

  // Initialize tasks safely
  const initialTasks = (user?.tasks || []).map((t) => ({
    ...t,
    _id: t._id || t.id || Date.now() + Math.random(),
  }));

  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newTask = {
      _id: Date.now(),
      title,
      description,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setDescription("");
  };

  // Toggle completion
  const toggleComplete = (_id) => {
    setTasks(
      tasks.map((task) =>
        task._id === _id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (_id) => {
    setTasks(tasks.filter((task) => task._id !== _id));
  };

  // Start editing
  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Save edited task
  const saveEdit = (_id) => {
    setTasks(
      tasks.map((task) =>
        task._id === _id
          ? { ...task, title: editTitle, description: editDescription }
          : task
      )
    );
    setEditingTask(null);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingTask(null);
  };

  // Apply filter + search
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f0f8ff] p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Task Manager
        </h2>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            title="Add Task"
          >
            <FaCheck />
          </button>
        </form>

        {/* Filter + Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>

          <div className="relative flex-1 max-w-sm">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Scrollable Task List */}
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found</p>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-4 border rounded-md shadow-md transition-all hover:shadow-lg ${
                    task.completed ? "bg-green-50 border-green-300" : "bg-white"
                  }`}
                >
                  {editingTask === task._id ? (
                    // --- Edit Mode ---
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                      <div className="flex gap-2">
                        <FaSave
                          onClick={() => saveEdit(task._id)}
                          className="text-green-600 text-xl cursor-pointer hover:scale-110 transition"
                          title="Save"
                        />
                        <FaTimes
                          onClick={cancelEdit}
                          className="text-gray-500 text-xl cursor-pointer hover:scale-110 transition"
                          title="Cancel"
                        />
                      </div>
                    </div>
                  ) : (
                    // --- View Mode ---
                    <>
                      <div className="flex-1">
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
                          {task.description}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        {task.completed ? (
                          <FaUndo
                            onClick={() => toggleComplete(task._id)}
                            className="text-gray-500 text-xl cursor-pointer hover:scale-110 transition"
                            title="Undo"
                          />
                        ) : (
                          <FaCheck
                            onClick={() => toggleComplete(task._id)}
                            className="text-green-600 text-xl cursor-pointer hover:scale-110 transition"
                            title="Mark Complete"
                          />
                        )}

                        <FaEdit
                          onClick={() => startEditing(task)}
                          className="text-blue-600 text-xl cursor-pointer hover:scale-110 transition"
                          title="Edit"
                        />

                        <FaTrash
                          onClick={() => deleteTask(task._id)}
                          className="text-red-600 text-xl cursor-pointer hover:scale-110 transition"
                          title="Delete"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
