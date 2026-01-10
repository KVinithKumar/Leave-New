import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUsers, FaLock } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SelectRole = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Admin",
      icon: <FaLock size={90} className="text-black" />,
      route: "/admin-login",
    },
    {
      title: "Principal",
      icon: <FaUser size={90} className="text-black" />,
      route: "/principal-login",
    },
    {
      title: "Staff",
      icon: <FaUsers size={90} className="text-black" />,
      route: "/staff-login",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Main content with specific gap adjustment */}
      <main className="flex flex-col items-center justify-center flex-grow py-20">
        <div className="w-full max-w-5xl px-6 mx-auto">
          {/* Title with increased bottom margin */}
          <h2 className="mb-24 text-4xl font-bold text-center text-black"> {/* Increased mb-24 for bigger gap */}
            Select Your Role
          </h2>

          {/* Role cards container */}
          <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-3 max-w-4xl mx-auto">
            {roles.map((role) => (
              <div
                key={role.title}
                onClick={() => navigate(role.route)}
                className="flex flex-col items-center justify-center w-full p-8 transition duration-300 bg-white border border-gray-300 shadow-lg cursor-pointer rounded-xl aspect-square hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500"
                tabIndex="0"
                role="button"
                aria-label={`Login as ${role.title}`}
                onKeyDown={(e) => e.key === "Enter" && navigate(role.route)}
              >
                <div className="mb-8">{role.icon}</div>
                <h3 className="text-2xl font-semibold text-black">{role.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SelectRole;