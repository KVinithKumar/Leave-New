import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

import {
  FaSearch,
  FaCalendarAlt,
  FaClipboardCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaUserClock,
  FaUserInjured,
  FaPaperPlane,
  FaChartPie,
  FaUserGraduate,
  FaFilter,
  FaUndo,
  FaPercentage,
  FaHistory,
  FaChartLine
} from "react-icons/fa";

export default function Attendance() {
  

  // ================= STATES =================
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showSummary, setShowSummary] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPercentageCard, setShowPercentageCard] = useState(false);
const [attendanceRows, setAttendanceRows] = useState([]);
const filteredStudents = attendanceRows;

  // ================= DYNAMIC COLORS =================
  const getStatusColor = (status) => {
    const colors = {
      "Present": "bg-gradient-to-r from-green-500 to-emerald-600",
      "Absent": "bg-gradient-to-r from-red-500 to-red-600",
      "Leave": "bg-gradient-to-r from-yellow-500 to-amber-600",
      "Sick": "bg-gradient-to-r from-orange-500 to-orange-600",
      "Not Marked": "bg-gradient-to-r from-gray-400 to-gray-500"
    };
    return colors[status] || "bg-gradient-to-r from-gray-400 to-gray-500";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "Present": <FaCheckCircle className="text-green-100" />,
      "Absent": <FaTimesCircle className="text-red-100" />,
      "Leave": <FaUserClock className="text-yellow-100" />,
      "Sick": <FaUserInjured className="text-orange-100" />,
      "Not Marked": <FaClipboardCheck className="text-gray-100" />
    };
    return icons[status] || <FaClipboardCheck />;
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      "Present": "bg-green-100 text-green-800 border-green-200",
      "Absent": "bg-red-100 text-red-800 border-red-200",
      "Leave": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Sick": "bg-orange-100 text-orange-800 border-orange-200",
      "Not Marked": "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // ================= SEARCH =================
 const handleSearch = async () => {
  if (!selectedClass || !selectedSection) return;

  try {
    const res = await fetch(
      `/api/attendance?class=${selectedClass}&section=${selectedSection}&date=${selectedDate}`
    );
    const data = await res.json();

    setAttendanceRows(data);
    setIsSubmitted(false);
    setShowPercentageCard(false);

  } catch (err) {
    console.error("Failed to fetch attendance", err);
  }
};


  // ================= CALCULATE ATTENDANCE PERCENTAGE =================
 const markAttendance = async (attendanceId, status) => {
  try {
    await fetch(`/api/attendance/${attendanceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setAttendanceRows(prev =>
      prev.map(r =>
        r._id === attendanceId ? { ...r, status } : r
      )
    );

    setIsSubmitted(false);
    setShowPercentageCard(false);

  } catch (err) {
    console.error("Failed to update attendance", err);
  }
};


  // ================= SUBMIT ATTENDANCE =================
 const handleSubmitAttendance = async () => {
  const unmarked = attendanceRows.filter(r => r.status === "Not Marked");
  if (unmarked.length > 0) {
    alert("Please mark attendance for all students");
    return;
  }

  try {
    await fetch("/api/attendance/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        class: selectedClass,
        section: selectedSection,
        date: selectedDate,
      }),
    });

    setIsSubmitted(true);
    setShowPercentageCard(true);
    setShowSummary(true);

  } catch (err) {
    console.error("Submit attendance failed", err);
  }
};

  // ================= RESET ATTENDANCE =================
  const resetAttendance = () => {
  handleSearch();
  setIsSubmitted(false);
  setShowPercentageCard(false);
};

  // ================= GET ATTENDANCE SUMMARY =================
const total = attendanceRows.length;

const present = attendanceRows.filter(r => r.status === "Present").length;
const absent = attendanceRows.filter(r => r.status === "Absent").length;
const leave = attendanceRows.filter(r => r.status === "Leave").length;
const sick = attendanceRows.filter(r => r.status === "Sick").length;

const notMarked = attendanceRows.filter(r => r.status === "Not Marked").length;
const [searchText, setSearchText] = useState("");

const calculateAttendancePercentage = () =>
  total ? Math.round((present / total) * 100) : 0;

const getAttendanceSummary = () => ({
  total,
  present,
  absent,
  leave,
  sick,
  notMarked,
  percentage: calculateAttendancePercentage(),
});

 

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <Header/>
      <div className="mb-8">
        <BackButton to="/staff/dashboard" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FaClipboardCheck className="text-blue-600" />
              Attendance Management
            </h1>
            <p className="text-gray-600 mt-2">Mark and manage daily student attendance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500">Today's Date</div>
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <FaCalendarAlt className="text-blue-500" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH FILTER CARD ================= */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FaFilter className="text-blue-600" />
            Filter Students
          </h2>
          {isSubmitted && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <FaCheckCircle />
              Attendance Submitted
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Date Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Class Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Class</option>
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
              <option value="8">Class 8</option>
              <option value="7">Class 7</option>
              <option value="6">Class 6</option>
            </select>
          </div>

          {/* Section Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={!selectedClass || !selectedSection}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSearch />
              Search Students
            </button>
          </div>
        </div>
      </div>

      {/* ================= ATTENDANCE PERCENTAGE CARD (After Submit) ================= */}
      {isSubmitted && showPercentageCard && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaPercentage className="text-green-600" />
                Attendance Percentage Summary
              </h3>
              <p className="text-gray-600 mt-1">
                Class {selectedClass} - Section {selectedSection} | {selectedDate}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-700">
                {calculateAttendancePercentage()}%
              </div>
              <p className="text-sm text-gray-600">Overall Attendance</p>
            </div>
          </div>
          
          {/* Percentage Breakdown */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { status: "Present", color: "green", icon: <FaCheckCircle /> },
              { status: "Absent", color: "red", icon: <FaTimesCircle /> },
              { status: "Leave", color: "yellow", icon: <FaUserClock /> },
              { status: "Sick", color: "orange", icon: <FaUserInjured /> },
              { status: "Total", color: "blue", icon: <FaClipboardCheck /> }
            ].map((item) => {
              const summary = getAttendanceSummary();
              let count, percentage;
              
              switch(item.status) {
                case "Present":
                  count = summary.present;
                  percentage = summary.total > 0 ? Math.round((summary.present / summary.total) * 100) : 0;
                  break;
                case "Absent":
                  count = summary.absent;
                  percentage = summary.total > 0 ? Math.round((summary.absent / summary.total) * 100) : 0;
                  break;
                case "Leave":
                  count = summary.leave;
                  percentage = summary.total > 0 ? Math.round((summary.leave / summary.total) * 100) : 0;
                  break;
                case "Sick":
                  count = summary.sick;
                  percentage = summary.total > 0 ? Math.round((summary.sick / summary.total) * 100) : 0;
                  break;
                default:
                  count = summary.total;
                  percentage = 100;
              }
              
              return (
                <div key={item.status} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <div className={`text-${item.color}-600 text-lg mb-2 flex justify-center`}>
                    {item.icon}
                  </div>
                  <div className={`text-2xl font-bold text-${item.color}-700 mb-1`}>
                    {percentage}%
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.status}</div>
                  <div className="text-xs text-gray-500">{count} students</div>
                </div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Attendance Progress</span>
              <span>{calculateAttendancePercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${calculateAttendancePercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ATTENDANCE HISTORY ================= */}
     
      {/* ================= RESULTS & ATTENDANCE ================= */}
      {attendanceRows.length > 0 && (

        <div className="space-y-6">
          {/* Header with Stats */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">
                  Class {selectedClass} – Section {selectedSection}
                </h2>
                <p className="text-blue-100 mt-1">
                  Date: {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div className="text-sm text-blue-100">Current Percentage</div>
                  <div className="text-xl font-bold">{calculateAttendancePercentage()}%</div>
                </div>
                <button
                  onClick={resetAttendance}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <FaUndo />
                  Reset
                </button>
                <button
                  onClick={() => setShowSummary(!showSummary)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <FaChartPie />
                  {showSummary ? "Hide" : "Show"} Stats
                </button>
              </div>
            </div>
          </div>
       

          {/* Summary Section */}
          {showSummary && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {["Total", "Present", "Absent", "Leave", "Sick", "Not Marked"].map((status) => {
                  const summary = getAttendanceSummary();
                  let count, percentage, color;
                  
                  switch(status) {
                    case "Present":
                      count = summary.present;
                      percentage = summary.total > 0 ? Math.round((summary.present / summary.total) * 100) : 0;
                      color = "text-green-600 bg-green-50";
                      break;
                    case "Absent":
                      count = summary.absent;
                      percentage = summary.total > 0 ? Math.round((summary.absent / summary.total) * 100) : 0;
                      color = "text-red-600 bg-red-50";
                      break;
                    case "Leave":
                      count = summary.leave;
                      percentage = summary.total > 0 ? Math.round((summary.leave / summary.total) * 100) : 0;
                      color = "text-yellow-600 bg-yellow-50";
                      break;
                    case "Sick":
                      count = summary.sick;
                      percentage = summary.total > 0 ? Math.round((summary.sick / summary.total) * 100) : 0;
                      color = "text-orange-600 bg-orange-50";
                      break;
                    case "Not Marked":
                      count = summary.notMarked;
                      percentage = summary.total > 0 ? Math.round((summary.notMarked / summary.total) * 100) : 0;
                      color = "text-gray-600 bg-gray-50";
                      break;
                    default:
                      count = summary.total;
                      percentage = 100;
                      color = "text-blue-600 bg-blue-50";
                  }
                  
                  return (
                    <div key={status} className="text-center p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                      <div className={`text-3xl font-bold mb-2 ${color.includes('text-') ? color.split(' ')[0] : 'text-gray-600'}`}>
                        {count}
                      </div>
                      <div className="text-sm font-medium text-gray-700">{status}</div>
                      <div className="text-lg font-bold mt-2">{percentage}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Attendance Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Current Status:</span> 
              <span className="ml-2 text-green-600 font-medium">{calculateAttendancePercentage()}% Overall</span>
              <span className="mx-2">•</span>
              <span>{attendanceRows.length} Students Total</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSubmitAttendance}
                disabled={isSubmitted}
                className={`px-6 py-3 rounded-lg font-semibold transition duration-200 flex items-center gap-2 ${
                  isSubmitted
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white'
                }`}
              >
                <FaPaperPlane />
                {isSubmitted ? "Submitted" : "Submit Attendance"}
              </button>
              <button
                onClick={resetAttendance}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <FaUndo />
              </button>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Roll No</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Student Name</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Class-Section</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRows.map((row) => (
                    <tr 
                      key={row._id}
                      className="border-b border-gray-100 hover:bg-blue-50 transition"
                    >
                      <td className="py-4 px-6">
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {row.roll}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {row.photo}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{row.studentId.basicInfo.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {row.class}-{row.section}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getStatusBadgeColor(row.status)}`}>
                          {getStatusIcon(row.status)}
                          <span className="font-medium">{row.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2 flex-wrap">
                          {["Present", "Absent", "Leave", "Sick"].map((status) => (
                            <button
                              key={status}
                              onClick={(e) => {
                                e.stopPropagation();
                                markAttendance(row._id, status);
                              }}
                              className={`px-3 py-1 rounded text-sm font-medium transition ${
                                row.status === status
                                  ? getStatusColor(status) + ' text-white shadow-md'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Status Legend</h4>
            <div className="flex flex-wrap gap-4">
              {["Present", "Absent", "Leave", "Sick", "Not Marked"].map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status).replace('gradient-to-r', '').split(' ')[0]}`}></div>
                  <span className="text-sm text-gray-600">{status}</span>
                  {filteredStudents.length > 0 && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {attendanceRows.length
                        ? Math.round((attendanceRows.filter(r => r.status === status).length / attendanceRows.length) * 100)
                        : 0
                      }%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {selectedClass && selectedSection && attendanceRows.length === 0 ? (

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
          <FaUserGraduate className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No students found</h3>
          <p className="text-gray-500">Try adjusting your search filters</p>
        </div>
      ) : !selectedClass || !selectedSection ? (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-12 text-center">
          <FaClipboardCheck className="text-6xl text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Select Class & Section</h3>
          <p className="text-gray-600">Choose a class and section to start marking attendance</p>
        </div>
      ) : null}
    </div>
  );
}