import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, logoutAdmin } from "../redux/slice/authSlice.js";
import axios from "axios";
import api_url from "../utils/Api.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  const handleUserLogout = async () => {
    try {
      const res = await axios.post(
        `${api_url}/api/auth/user/logout`
      );
      if (res.data.success) {
        dispatch(logoutUser());
        localStorage.removeItem("tasks");
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleAdminLogout = async () => {
    try {
      const res = await axios.post(
        `${api_url}/api/auth/admin/logout`
      );
      if (res.data.success) {
        dispatch(logoutAdmin());
        navigate("/");
      }
    } catch (err) {
      console.error("Admin logout failed:", err);
    }
  };

  const linkClasses =
    "bg-white text-black shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.3)] font-medium px-4 py-2 rounded-md transition duration-200";

  const renderButtons = () => {
    if (isAdmin) {
      return (
        <>
          <button onClick={() => navigate("/")} className={linkClasses}>
            Home
          </button>
          <NavLink to="/admin-dashboard" className={linkClasses}>
            Admin Dashboard
          </NavLink>

          <button onClick={handleAdminLogout} className={linkClasses}>
            Logout
          </button>
        </>
      );
    } else if (isLoggedIn) {
      return (
        <>
          <span className="text-gray-700 font-medium px-4 py-2">
            Hello, {user.name}
          </span>
          <button onClick={() => navigate("/")} className={linkClasses}>
            Home
          </button>
          <NavLink to="/user/home" className={linkClasses}>
            Tasks
          </NavLink>
          <button onClick={handleUserLogout} className={linkClasses}>
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => navigate("/")} className={linkClasses}>
            Home
          </button>
          <NavLink to="/admin/login" className={linkClasses}>
            Admin Login
          </NavLink>
          <NavLink to="/user/signup" className={linkClasses}>
            Signup
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav className="bg-blue-100 px-6 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Single universal Home */}
        <h2
          className="text-xl font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition"
          onClick={() => navigate("/")}
        >
          Task Manager
        </h2>

        <div className="hidden md:flex gap-4 items-center">
          {renderButtons()}
        </div>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 mt-2" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 p-3">
          {renderButtons()}
        </div>
      </div>
    </nav>
  );
}
