import { useState } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { loginAdmin } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import api_url from "../utils/Api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const disptach = useDispatch()
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${api_url}/api/auth/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data.userStats);
      disptach(loginAdmin(res.data.userStats));
      navigate("/admin-dashboard")
      

      console.log("Login success:", res.data);
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f8ff] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Admin Login
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition mt-2"
          >
            Log in
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}
