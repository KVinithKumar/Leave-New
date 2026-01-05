import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaQuestionCircle, FaCrown } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StaffLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    // Dummy credentials for principal
    if (email === "principal@gmail.com" && password === "principal123") {
      // Store login state (in a real app, you'd use context/state management)
      localStorage.setItem("userRole", "principal");
      localStorage.setItem("isAuthenticated", "true");
      navigate("/principal/dashboard");
    } else {
      alert("Invalid credentials. Please use:\nEmail: principal@gmail.com\nPassword: principal123");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  // Quick login for testing
  const quickLogin = () => {
    document.getElementById("email").value = "principal@gmail.com";
    document.getElementById("password").value = "principal123";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md">
          {/* Demo Credentials Banner */}
          {/* <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 mb-6 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <FaCrown className="text-xl" />
              <div className="flex-1">
                <h3 className="font-bold">Principal Demo Access</h3>
                <p className="text-sm opacity-90">Email: principal@gmail.com | Password: principal123</p>
              </div>
              <button
                onClick={quickLogin}
                className="bg-white text-purple-600 hover:bg-gray-100 px-3 py-1 rounded-lg text-sm font-semibold transition"
              >
                Auto-fill
              </button>
            </div>
          </div> */}

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-8 py-10 text-center relative">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-20">
                <FaCrown className="text-white text-6xl" />
              </div>
              
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/30">
                <FaUser className="text-white text-3xl" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Principal Portal</h1>
              {/* <p className="text-blue-100 text-lg">Administrative Dashboard Access</p> */}
              
              {/* Role badge */}
              {/* <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <FaCrown className="text-yellow-300" />
                <span className="text-white font-medium">Principal Access Level</span>
              </div> */}
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="px-8 py-8 space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaUser className="text-gray-500" />
                    Principal Email Address
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-blue-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue="principal@gmail.com"
                    placeholder="principal@gmail.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaLock className="text-gray-500" />
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-blue-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    defaultValue="principal123"
                    placeholder="principal123"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Demo password: <span className="font-mono text-blue-600">principal123</span>
                </p>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember credentials
                  </label>
                </div>
                
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition flex items-center gap-1"
                >
                  <FaQuestionCircle className="h-4 w-4" />
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <FaSignInAlt className="h-5 w-5" />
                Access Principal Dashboard
              </button>

              {/* Quick Info
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <FaCrown className="text-blue-600" />
                  Principal Features:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Full system access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Staff management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Academic oversight
                  </li>
                </ul>
              </div> */}

              {/* Back Link */}
              <div className="text-center pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition flex items-center justify-center gap-2 mx-auto"
                >
                  <span>←</span>
                  Return to previous page
                </button>
              </div>
            </form>
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-4">
              {/* <p className="text-sm text-yellow-800">
                ⚠️ <strong>Note:</strong> This is a demo portal. For production use, implement proper authentication.
              </p> */}
            </div>
            
            <p className="text-sm text-gray-500">
              Having issues?{" "}
              <a href="mailto:it-support@school.edu" className="text-blue-600 hover:text-blue-800 font-medium">
                Contact IT Support
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}