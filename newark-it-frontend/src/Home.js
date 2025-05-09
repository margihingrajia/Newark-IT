// src/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to Newark-IT 💻</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your one-stop shop for computers, laptops, printers, and accessories. Quality tech at your fingertips!
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
