import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Login</h1>
      <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
        <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
