import { BrowserRouter, Routes, Route } from "react-router-dom";




import Home from "./pages/Home";
import Login from "./pages/Login";
import RoleSelect from "./pages/RoleSelect";
import PrincipalLogin from "./pages/PrincipalLogin";

import StaffDashboard from "./dashboards/StaffDashboard";
import Students from "./dashboards/Students";
import Attendance from "./dashboards/Attendance";
import TimeTable from "./dashboards/TimeTable";
import LeaveRequest from "./dashboards/LeaveRequest";
import LeaveHistory from "./dashboards/LeaveHistory";
import Profile from "./dashboards/Profile";
import PrincipalDashboard from "./dashboards/PrincipalDashboard";
import AttendanceManagement from "./dashboards/AttendanceManagement";


// 
import StudentManagement from "./dashboards/StudentManagement";
import Announcements from "./dashboards/Announcements";
import PrincipalTimeTable from "./dashboards/PrincipalTimeTable";
import Principalprofile from "./dashboards/Principalprofile";
import StaffManagement from "./dashboards/StaffManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/staff-login" element={<Login />} />
        <Route path="/select-role" element={<RoleSelect />} />
        <Route path="/principal-login" element={<PrincipalLogin />} />

        {/* STAFF DASHBOARD */}
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
        <Route path="/staff/students" element={<Students />} />
        <Route path="/staff/attendance" element={<Attendance />} />
        <Route path="/staff/timetable" element={<TimeTable />} />
        <Route path="/staff/leave-request" element={<LeaveRequest />} />
        <Route path="/staff/leave-history" element={<LeaveHistory />} />
        <Route path="/staff/profile" element={<Profile />} />
        
        {/* PRINCIPAL ATTENDANCE MANAGEMENT ROUTES */}
        <Route path="/principal/attendance-management" element={<AttendanceManagement />} />
        <Route path="/principal/attendance/students" element={<AttendanceManagement />} />
        <Route path="/principal/attendance/staff" element={<AttendanceManagement />} />
        <Route path="/principal/students" element={<StudentManagement />} />
        <Route path="/principal/announcements" element={<Announcements />} />
        <Route path="/principal/timetable" element={<PrincipalTimeTable />} />
        <Route path="/principal/profile" element={<Principalprofile />} />
         <Route path="/principal/staff" element={<StaffManagement />} />
        
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;