import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState<string>();
  const navigate = useNavigate();
  const onLogin = () => {
    if (username !== undefined) {
      localStorage.setItem("username", username);
      navigate("/chat");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:outline-none"
        />

        <button
          onClick={onLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
