import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slice/authSlice.js";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(true); // true = Signup, false = Login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // To display success/error messages
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isSignup) {
        // Signup API
        const res = await axios.post(
          "/api/auth/user/signup",
          { name, email, password },
          { withCredentials: true }
        );
        console.log(res.data);

        setMessage("✅ Account created successfully! Please sign in.");
        setIsSignup(false);
      } else {
        // Login API
        const res = await axios.post(
          "http://localhost:5000/api/auth/user/login",
          { email, password },
          { withCredentials: true }
        );

        if (res.data.success) {
          // Save user info in Redux

          dispatch(
            loginUser({
              ...res.data.user,
              tasks: res.data.tasks || [],
            })
          );
          // Optionally, save tasks in localStorage or another slice
          localStorage.setItem("tasks", JSON.stringify(res.data.tasks));

          // Navigate to user home
          navigate("/user/home");
        } else {
          throw new Error(res.data.message || "Login failed");
        }
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || err.message || "❌ Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f8ff] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition mt-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Message Below Form */}
        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-green-600 font-medium cursor-pointer hover:underline"
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage("");
            }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
