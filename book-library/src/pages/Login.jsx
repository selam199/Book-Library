import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Dummy login check (you can replace this with real API later)
    if (email === "user@example.com" && password === "123456") {
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/browse"), 1500); // Redirect after 1.5 seconds
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center mb-4 font-medium">
            {success}
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

