// // // // import React from "react";
// // // // import { Link, useNavigate } from "react-router-dom";
// // // // import logo from "../assets/logo.jpeg"; // ✅ logo image

// // // // const Header = () => {
// // // //   const navigate = useNavigate();

// // // //   return (
// // // //     <>
// // // //       {/* HEADER */}
// // // //     <header className="fixed top-0 left-0 z-50 w-full h-33 bg-blue-900 text-white shadow-md">
// // // //   <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-full">
// // // //     {/* Adjust px-6 to px-4 or px-2 */}
// // // //     {/* header content */}
  
  

          
// // // //           {/* LEFT: LOGO IMAGE + SCHOOL NAME */}
// // // //           <Link to="/" className="flex items-center gap-4">
            
// // // //             {/* LOGO IMAGE */}
// // // //             <img
// // // //   src={logo}
// // // //   alt="School Logo"
// // // //   className="w-30 h-30 -ml-2 rounded-full object-cover bg-white p-1"
// // // // />

// // // //             {/* SCHOOL NAME */}
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold tracking-wide">
// // // //                 NLVRGSRV School              </h1>
// // // //               <p className="text-sm text-blue-00">
// // // //                 School Management System
// // // //               </p>
// // // //             </div>
// // // //           </Link>

// // // //           {/* RIGHT: LOGIN BUTTON */}
// // // //           <button
// // // //             onClick={() => navigate("/select-role")}
// // // //             className="px-6 py-3 text-sm font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-100 transition-all"
// // // //           >
// // // //             Login
// // // //           </button>
// // // //         </div>
// // // //       </header>

// // // //       {/* SPACER (FOR FIXED HEADER HEIGHT) */}
// // // //       <div className="h-28"></div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Header;


// // // import React, { useEffect, useState } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import logo from "../assets/logo.jpeg";

// // // const Header = () => {
// // //   const navigate = useNavigate();
// // //   const [currentTime, setCurrentTime] = useState(new Date());

// // //   // Live time update
// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       setCurrentTime(new Date());
// // //     }, 1000);

// // //     return () => clearInterval(timer);
// // //   }, []);

// // //   // ===== Time Helpers (same as StaffDashboard) =====
// // //   const formatTime = (date) =>
// // //     date.toLocaleTimeString("en-US", {
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //       second: "2-digit",
// // //       hour12: true,
// // //     });

// // //   const formatShortDate = (date) =>
// // //     date.toLocaleDateString("en-US", {
// // //       month: "short",
// // //       day: "numeric",
// // //     });

// // //   const getDayOfWeek = (date) =>
// // //     date.toLocaleDateString("en-US", { weekday: "long" });

// // //   return (
// // //     <>
// // //       {/* HEADER */}
// // //       <header className="fixed top-0 left-0 z-50 w-full h-32 bg-blue-900 text-white shadow-md">
// // //         <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-full">

// // //           {/* LEFT: LOGO + SCHOOL NAME */}
// // //           <Link to="/" className="flex items-center gap-4">
// // //             <img
// // //               src={logo}
// // //               alt="School Logo"
// // //               className="w-16 h-16 rounded-full object-cover bg-white p-1"
// // //             />
// // //             <div>
// // //               <h1 className="text-2xl font-bold tracking-wide">
// // //                 NLVRGSRV School
// // //               </h1>
// // //               <p className="text-sm text-blue-200">
// // //                 School Management System
// // //               </p>
// // //             </div>
// // //           </Link>

// // //           {/* CENTER: LIVE TIME WIDGET (YOUR CODE) */}
// // //           <div className="hidden md:block">
// // //             <div className="bg-white p-3 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow duration-300">
// // //               <div className="flex items-center space-x-4">

// // //                 <div className="text-center">
// // //                   <div className="text-sm text-gray-500">Today</div>
// // //                   <div className="text-lg font-bold text-blue-600">
// // //                     {formatShortDate(currentTime)}
// // //                   </div>
// // //                   <div className="text-xs text-gray-500">
// // //                     {getDayOfWeek(currentTime)}
// // //                   </div>
// // //                 </div>

// // //                 <div className="h-12 w-px bg-gray-200"></div>

// // //                 <div className="text-center">
// // //                   <div className="text-sm text-gray-500">Live Time</div>
// // //                   <div className="text-xl font-bold text-gray-800 tracking-wider">
// // //                     {formatTime(currentTime)}
// // //                   </div>
// // //                   <div className="text-xs text-green-600 font-medium mt-1 animate-pulse">
// // //                     ● Live Updating
// // //                   </div>
// // //                 </div>

// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* RIGHT: LOGIN BUTTON */}
// // //           <button
// // //             onClick={() => navigate("/select-role")}
// // //             className="px-6 py-3 text-sm font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-100 transition-all"
// // //           >
// // //             Login
// // //           </button>

// // //         </div>
// // //       </header>

// // //       {/* SPACER FOR FIXED HEADER */}
// // //       <div className="h-32"></div>
// // //     </>
// // //   );
// // // };

// // // export default Header;
// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import logo from "../assets/logo.jpeg";

// // const Header = () => {
// //   const navigate = useNavigate();
// //   const [currentTime, setCurrentTime] = useState(new Date());

// //   // Live time update every second
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   // ===== Time Helpers =====
// //   const formatTime = (date) =>
// //     date.toLocaleTimeString("en-US", {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       second: "2-digit",
// //       hour12: true,
// //     });

// //   const formatShortDate = (date) =>
// //     date.toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //     });

// //   const getDayOfWeek = (date) =>
// //     date.toLocaleDateString("en-US", { weekday: "long" });

// //   return (
// //     <>
// //       {/* HEADER */}
// //       <header className="fixed top-0 left-0 z-50 w-full h-32 bg-blue-900 text-white shadow-md">
// //         <div className="flex items-center max-w-7xl mx-auto px-4 h-full">

// //           {/* LEFT: LOGO + SCHOOL NAME */}
// //           <Link to="/" className="flex items-center gap-4">
// //             <img
// //               src={logo}
// //               alt="School Logo"
// //               className="w-16 h-16 rounded-full object-cover bg-white p-1"
// //             />
// //             <div>
// //               <h1 className="text-2xl font-bold tracking-wide">
// //                 NLVRGSRV School
// //               </h1>
// //               <p className="text-sm text-blue-200">
// //                 School Management System
// //               </p>
// //             </div>
// //           </Link>

// //           {/* FLEX SPACER */}
// //           <div className="flex-1"></div>

// //           {/* RIGHT: TIME + LOGIN */}
// //           <div className="flex items-center gap-6">

// //             {/* LIVE TIME WIDGET */}
// //             <div className="hidden lg:block">
// //               <div className="bg-white p-3 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow duration-300">
// //                 <div className="flex items-center space-x-4">

// //                   <div className="text-center">
// //                     <div className="text-sm text-gray-500">Today</div>
// //                     <div className="text-lg font-bold text-blue-600">
// //                       {formatShortDate(currentTime)}
// //                     </div>
// //                     <div className="text-xs text-gray-500">
// //                       {getDayOfWeek(currentTime)}
// //                     </div>
// //                   </div>

// //                   <div className="h-12 w-px bg-gray-200"></div>

// //                   <div className="text-center">
// //                     <div className="text-sm text-gray-500">Live Time</div>
// //                     <div className="text-xl font-bold text-gray-800 tracking-wider">
// //                       {formatTime(currentTime)}
// //                     </div>
// //                     <div className="text-xs text-green-600 font-medium mt-1 animate-pulse">
// //                       ● Live Updating
// //                     </div>
// //                   </div>

// //                 </div>
// //               </div>
// //             </div>

// //             {/* LOGIN BUTTON */}
// //             <button
// //               onClick={() => navigate("/select-role")}
// //               className="px-6 py-3 text-sm font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-100 transition-all"
// //             >
// //               Login
// //             </button>

// //           </div>
// //         </div>
// //       </header>

// //       {/* SPACER FOR FIXED HEADER */}
// //       <div className="h-32"></div>
// //     </>
// //   );
// // };

// // export default Header;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.jpeg";

// const Header = () => {
//   const navigate = useNavigate();
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date) =>
//     date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });

//   const formatShortDate = (date) =>
//     date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     });

//   return (
//     <>
//       <header className="fixed top-0 left-0 z-50 w-full h-28 bg-blue-900 text-white shadow-md">
//         <div className="flex items-center max-w-7xl mx-auto px-4 h-full">

//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt="School Logo"
//               className="w-14 h-14 rounded-full bg-white p-1"
//             />
//             <div>
//               <h1 className="text-xl font-bold">NLVRGSRV School</h1>
//               <p className="text-xs text-blue-200">
//                 School Management System
//               </p>
//             </div>
//           </Link>

//           <div className="flex-1"></div>

//           {/* RIGHT SECTION */}
//           <div className="flex items-center gap-4">

//             {/* MODERN TIME CARD */}
//             <div className="hidden lg:flex items-center gap-3 bg-white/90 text-gray-800 px-4 py-2 rounded-full shadow-sm">
//               <div className="text-right leading-tight">
//                 <p className="text-xs text-gray-500">{formatShortDate(currentTime)}</p>
//                 <p className="text-lg font-semibold tracking-wide">
//                   {formatTime(currentTime)}
//                 </p>
//               </div>
//               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//             </div>

//             {/* LOGIN */}
//             <button
//               onClick={() => navigate("/select-role")}
//               className="px-5 py-2 text-sm font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-100 transition"
//             >
//               Login
//             </button>

//           </div>
//         </div>
//       </header>

//       {/* Spacer */}
//       <div className="h-28"></div>
//     </>
//   );
// };

// export default Header;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Header = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const formatShortDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 z-50 w-full h-32 bg-blue-900 text-white shadow-md">
        <div className="flex items-center max-w-7xl mx-auto px-6 h-full">

          {/* LEFT: LOGO + NAME */}
          <Link to="/" className="flex items-center gap-4">
            <img
              src={logo}
              alt="School Logo"
              className="w-30 h-30 rounded-full bg-white p-1 object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">
                NLVRGSRV School
              </h1>
              <p className="text-sm text-blue-200">
                School Management System
              </p>
            </div>
          </Link>

          <div className="flex-1"></div>

          {/* RIGHT: TIME + LOGIN */}
          <div className="flex items-center gap-5">

            {/* TIME */}
            <div className="hidden lg:flex items-center gap-3 bg-white/90 text-gray-800 px-5 py-2 rounded-full shadow-sm">
              <div className="text-right leading-tight">
                <p className="text-xs text-gray-500">
                  {formatShortDate(currentTime)}
                </p>
                <p className="text-lg font-semibold tracking-wide">
                  {formatTime(currentTime)}
                </p>
              </div>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            </div>

            {/* LOGIN */}
            <button
              onClick={() => navigate("/select-role")}
              className="px-6 py-2 text-sm font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-100 transition"
            >
              Login
            </button>

          </div>
        </div>
      </header>

      {/* SPACER */}
      <div className="h-32"></div>
    </>
  );
};

export default Header;
