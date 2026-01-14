import { Link } from "react-router-dom"

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:outline-none"
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

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold">
          Sign Up
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
