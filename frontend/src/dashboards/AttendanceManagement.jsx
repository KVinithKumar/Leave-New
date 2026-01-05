// import { useState, useEffect, useRef } from 'react';
// import PrincipalSidebar from "../components/PrincipalSidebar";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { 
//   FaUserGraduate, 
//   FaChalkboardTeacher, 
//   FaSearch, 
//   FaCalendarCheck, 
//   FaCalendarTimes, 
//   FaUserInjured, 
//   FaEye, 
//   FaChevronRight,
//   FaChevronLeft,
//   FaIdCard,
//   FaPhone,
//   FaHome,
//   FaHistory,
//   FaChartBar,
//   FaFilter,
//   FaDownload,
//   FaFileExcel,
//   FaFilePdf,
//   FaUserMd,
//   FaBed
// } from "react-icons/fa";
// import { useLocation, useNavigate } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const AttendanceManagement = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [activeTab, setActiveTab] = useState('students');
//   const [selectedClass, setSelectedClass] = useState('all');
//   const [selectedSection, setSelectedSection] = useState('all');
//   const [selectedDepartment, setSelectedDepartment] = useState('all');
//   const [showClassDetails, setShowClassDetails] = useState(null);
  
//   // Check URL path to set active tab
//   useEffect(() => {
//     if (location.pathname.includes('/attendance/staff')) {
//       setActiveTab('staff');
//     } else {
//       setActiveTab('students');
//     }
//   }, [location]);

//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Format time
//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     });
//   };

//   // Format date
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Classes 1-10 with sections A, B
//   const classes = Array.from({ length: 10 }, (_, i) => ({
//     id: i + 1,
//     name: `Class ${i + 1}`,
//     sections: ['A', 'B']
//   }));

//   // All sections
//   const sections = ['A', 'B'];

//   // Departments for teachers
//   const departments = [
//     { id: 'math', name: 'Mathematics' },
//     { id: 'science', name: 'Science' },
//     { id: 'english', name: 'English' },
//     { id: 'social', name: 'Social Studies' },
//     { id: 'hindi', name: 'Hindi' },
//     { id: 'computer', name: 'Computer Science' },
//     { id: 'phyedu', name: 'Physical Education' },
//     { id: 'arts', name: 'Arts & Crafts' }
//   ];

//   // Sample Student Attendance Data
//   const studentAttendanceData = {
//     '1A': { 
//       total: 45, 
//       present: 40, 
//       absent: 3, 
//       sick: 1, 
//       leave: 1, 
//       percentage: 88.9,
//       students: [
//         { id: "STU001", name: "Rahul Sharma", status: "absent", rollNo: "001" },
//         { id: "STU002", name: "Priya Patel", status: "sick", rollNo: "002" },
//         { id: "STU003", name: "Amit Kumar", status: "leave", rollNo: "003" },
//         { id: "STU004", name: "Sneha Singh", status: "absent", rollNo: "004" },
//         { id: "STU005", name: "Raj Verma", status: "absent", rollNo: "005" }
//       ]
//     },
//     '1B': { 
//       total: 42, 
//       present: 38, 
//       absent: 2, 
//       sick: 1, 
//       leave: 1, 
//       percentage: 90.5,
//       students: [
//         { id: "STU006", name: "Karan Mehta", status: "sick", rollNo: "001" },
//         { id: "STU007", name: "Neha Gupta", status: "leave", rollNo: "002" },
//         { id: "STU008", name: "Rohit Sharma", status: "absent", rollNo: "003" },
//         { id: "STU009", name: "Pooja Patel", status: "absent", rollNo: "004" }
//       ]
//     },
//     // Add more class data as needed
//   };

//   // Sample Student Details
//   const studentsData = [
//     {
//       id: "STU001",
//       name: "Rahul Sharma",
//       class: "10",
//       section: "A",
//       rollNo: "001",
//       father: "Rajesh Sharma",
//       mother: "Priya Sharma",
//       phone: "9876543210",
//       emergency: "9876543211",
//       aadharId: "1234 5678 9012",
//       address: "Mumbai, Maharashtra",
//       attendance: {
//         present: 95,
//         absent: 3,
//         sick: 1,
//         leave: 1,
//         percentage: 95
//       },
//       leaveHistory: [
//         { date: "2024-01-15", reason: "Medical", approved: true },
//         { date: "2024-02-20", reason: "Family Function", approved: true },
//         { date: "2024-03-10", reason: "Medical", approved: true }
//       ],
//       profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
//     },
//     {
//       id: "STU002",
//       name: "Priya Patel",
//       class: "10",
//       section: "A",
//       rollNo: "002",
//       father: "Amit Patel",
//       mother: "Neha Patel",
//       phone: "9876543212",
//       emergency: "9876543213",
//       aadharId: "2345 6789 0123",
//       address: "Ahmedabad, Gujarat",
//       attendance: {
//         present: 98,
//         absent: 1,
//         sick: 0,
//         leave: 1,
//         percentage: 98
//       },
//       leaveHistory: [
//         { date: "2024-02-05", reason: "Personal", approved: true }
//       ],
//       profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
//     },
//     // Add more students as needed
//   ];

//   // Sample Teacher Attendance Data
//   const teacherAttendanceData = {
//     'math': { 
//       total: 15, 
//       present: 14, 
//       absent: 1, 
//       percentage: 93.3,
//       teachers: [
//         { id: "TCH001", name: "Dr. Ravi Kumar", status: "leave" },
//       ]
//     },
//     'science': { 
//       total: 18, 
//       present: 17, 
//       absent: 1, 
//       percentage: 94.4,
//       teachers: [
//         { id: "TCH002", name: "Dr. Anjali Singh", status: "present" },
//       ]
//     },
//     'english': { total: 12, present: 11, absent: 1, percentage: 91.7 },
//     'social': { total: 10, present: 9, absent: 1, percentage: 90.0 },
//     'hindi': { total: 8, present: 8, absent: 0, percentage: 100 },
//     'computer': { total: 6, present: 6, absent: 0, percentage: 100 },
//     'phyedu': { total: 4, present: 4, absent: 0, percentage: 100 },
//     'arts': { total: 5, present: 5, absent: 0, percentage: 100 }
//   };

//   // Sample Teacher Details
//   const teachersData = [
//     {
//       id: "TCH001",
//       teacherId: "MATH001",
//       name: "Dr. Ravi Kumar",
//       department: "Mathematics",
//       subject: "Mathematics",
//       phone: "9000012345",
//       emergency: "9000099999",
//       aadharId: "3456 7890 1234",
//       address: "Delhi, NCR",
//       leaveBalance: 12,
//       attendance: {
//         present: 98,
//         absent: 2,
//         percentage: 98
//       },
//       leaveHistory: [
//         { date: "2024-01-10", reason: "Medical", days: 2, approved: true },
//         { date: "2024-03-05", reason: "Conference", days: 3, approved: true }
//       ],
//       currentLeave: {
//         from: "2024-04-01",
//         to: "2024-04-05",
//         reason: "Personal",
//         type: "Casual Leave"
//       },
//       profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi"
//     },
//     {
//       id: "TCH002",
//       teacherId: "SCI001",
//       name: "Dr. Anjali Singh",
//       department: "Science",
//       subject: "Physics",
//       phone: "9000023456",
//       emergency: "9000088888",
//       aadharId: "4567 8901 2345",
//       address: "Bangalore, Karnataka",
//       leaveBalance: 8,
//       attendance: {
//         present: 100,
//         absent: 0,
//         percentage: 100
//       },
//       leaveHistory: [
//         { date: "2024-02-15", reason: "Medical", days: 1, approved: true }
//       ],
//       currentLeave: null,
//       profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali"
//     },
//   ];

//   // Filter data based on selections
//   const filteredStudentData = selectedClass === 'all' 
//     ? studentAttendanceData 
//     : Object.keys(studentAttendanceData).reduce((acc, key) => {
//         if (selectedSection === 'all') {
//           if (key.startsWith(selectedClass)) {
//             acc[key] = studentAttendanceData[key];
//           }
//         } else {
//           if (key === `${selectedClass}${selectedSection}`) {
//             acc[key] = studentAttendanceData[key];
//           }
//         }
//         return acc;
//       }, {});

//   const filteredTeacherData = selectedDepartment === 'all'
//     ? teacherAttendanceData
//     : { [selectedDepartment]: teacherAttendanceData[selectedDepartment] };

//   // Calculate overall statistics
//   const overallStudentStats = Object.values(studentAttendanceData).reduce((acc, curr) => ({
//     total: acc.total + curr.total,
//     present: acc.present + curr.present,
//     absent: acc.absent + curr.absent,
//     sick: acc.sick + curr.sick,
//     leave: acc.leave + curr.leave
//   }), { total: 0, present: 0, absent: 0, sick: 0, leave: 0 });

//   overallStudentStats.percentage = overallStudentStats.total > 0 
//     ? ((overallStudentStats.present / overallStudentStats.total) * 100).toFixed(1)
//     : 0;

//   const overallTeacherStats = Object.values(teacherAttendanceData).reduce((acc, curr) => ({
//     total: acc.total + curr.total,
//     present: acc.present + curr.present,
//     absent: acc.absent + curr.absent
//   }), { total: 0, present: 0, absent: 0 });

//   overallTeacherStats.percentage = overallTeacherStats.total > 0
//     ? ((overallTeacherStats.present / overallTeacherStats.total) * 100).toFixed(1)
//     : 0;

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'absent': return 'bg-red-100 text-red-800';
//       case 'sick': return 'bg-yellow-100 text-yellow-800';
//       case 'leave': return 'bg-blue-100 text-blue-800';
//       case 'present': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Get status text
//   const getStatusText = (status) => {
//     switch (status) {
//       case 'absent': return 'Absent';
//       case 'sick': return 'Sick';
//       case 'leave': return 'On Leave';
//       case 'present': return 'Present';
//       default: return 'Unknown';
//     }
//   };

//   // Handle tab change
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     if (tab === 'students') {
//       navigate('/principal/attendance/students');
//     } else {
//       navigate('/principal/attendance/staff');
//     }
//   };

//   // Export to Excel function
//   const exportToExcel = () => {
//     const data = [];
    
//     if (activeTab === 'students') {
//       // Add headers
//       data.push(['Student ID', 'Name', 'Class', 'Section', 'Roll No', 'Status', 'Father Name', 'Mother Name', 'Phone', 'Emergency Contact', 'Aadhar ID', 'Address']);
      
//       // Add absent/sick/leave students
//       studentsData.forEach(student => {
//         data.push([
//           student.id,
//           student.name,
//           student.class,
//           student.section,
//           student.rollNo,
//           'Absent',
//           student.father,
//           student.mother,
//           student.phone,
//           student.emergency,
//           student.aadharId,
//           student.address
//         ]);
//       });
      
//       // Add attendance statistics
//       data.push([]);
//       data.push(['Overall Statistics']);
//       data.push(['Total Students', overallStudentStats.total]);
//       data.push(['Present', overallStudentStats.present]);
//       data.push(['Absent', overallStudentStats.absent]);
//       data.push(['Sick', overallStudentStats.sick]);
//       data.push(['On Leave', overallStudentStats.leave]);
//       data.push(['Attendance %', `${overallStudentStats.percentage}%`]);
      
//     } else {
//       // Add headers for teachers
//       data.push(['Teacher ID', 'Name', 'Department', 'Subject', 'Status', 'Phone', 'Emergency Contact', 'Leave Balance', 'Aadhar ID', 'Address']);
      
//       // Add absent teachers
//       teachersData.forEach(teacher => {
//         if (teacher.currentLeave) {
//           data.push([
//             teacher.teacherId,
//             teacher.name,
//             teacher.department,
//             teacher.subject,
//             'On Leave',
//             teacher.phone,
//             teacher.emergency,
//             teacher.leaveBalance,
//             teacher.aadharId,
//             teacher.address
//           ]);
//         }
//       });
      
//       // Add attendance statistics
//       data.push([]);
//       data.push(['Overall Statistics']);
//       data.push(['Total Teachers', overallTeacherStats.total]);
//       data.push(['Present', overallTeacherStats.present]);
//       data.push(['Absent', overallTeacherStats.absent]);
//       data.push(['Attendance %', `${overallTeacherStats.percentage}%`]);
//     }
    
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
    
//     const fileName = activeTab === 'students' 
//       ? `Student_Attendance_Report_${new Date().toISOString().split('T')[0]}.xlsx`
//       : `Teacher_Attendance_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    
//     XLSX.writeFile(wb, fileName);
//   };

//   // Export to PDF function
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.width;
    
//     // Add title
//     doc.setFontSize(18);
//     doc.setTextColor(0, 0, 128);
//     doc.text(activeTab === 'students' ? 'Student Attendance Report' : 'Teacher Attendance Report', pageWidth / 2, 15, { align: 'center' });
    
//     // Add date
//     doc.setFontSize(10);
//     doc.setTextColor(100, 100, 100);
//     doc.text(`Generated on: ${new Date().toLocaleDateString()} ${formatTime(new Date())}`, pageWidth / 2, 22, { align: 'center' });
    
//     let yPos = 35;
    
//     if (activeTab === 'students') {
//       // Add statistics
//       doc.setFontSize(14);
//       doc.setTextColor(0, 0, 0);
//       doc.text('Overall Statistics', 14, yPos);
//       yPos += 10;
      
//       doc.setFontSize(11);
//       doc.text(`Total Students: ${overallStudentStats.total}`, 20, yPos);
//       yPos += 7;
//       doc.text(`Present: ${overallStudentStats.present}`, 20, yPos);
//       yPos += 7;
//       doc.text(`Absent: ${overallStudentStats.absent}`, 20, yPos);
//       yPos += 7;
//       doc.text(`Sick: ${overallStudentStats.sick}`, 20, yPos);
//       yPos += 7;
//       doc.text(`On Leave: ${overallStudentStats.leave}`, 20, yPos);
//       yPos += 7;
//       doc.text(`Attendance Percentage: ${overallStudentStats.percentage}%`, 20, yPos);
//       yPos += 15;
      
//       // Add absent students table
//       doc.setFontSize(14);
//       doc.text('Absent/Sick/Leave Students Details', 14, yPos);
//       yPos += 10;
      
//       const tableData = studentsData.map(student => [
//         student.id,
//         student.name,
//         `${student.class}-${student.section}`,
//         student.rollNo,
//         'Absent',
//         student.phone
//       ]);
      
//       doc.autoTable({
//         startY: yPos,
//         head: [['Student ID', 'Name', 'Class-Section', 'Roll No', 'Status', 'Contact']],
//         body: tableData,
//         theme: 'grid',
//         headStyles: { fillColor: [0, 0, 128] },
//         margin: { top: yPos }
//       });
      
//     } else {
//       // Add statistics for teachers
//       doc.setFontSize(14);
//       doc.setTextColor(0, 0, 0);
//       doc.text('Overall Statistics', 14, yPos);
//       yPos += 10;
      
//       doc.setFontSize(11);
//       doc.text(`Total Teachers: ${overallTeacherStats.total}`, 20, yPos);
//       yPos += 7;
//       doc.text(`Present: ${overallTeacherStats.present}`, 20, yPos);
//       yPos += 7;
//       doc.text(`Absent: ${overallTeacherStats.absent}`, 20, yPos);
//       yPos += 7;
//       doc.text(`Attendance Percentage: ${overallTeacherStats.percentage}%`, 20, yPos);
//       yPos += 15;
      
//       // Add absent teachers table
//       doc.setFontSize(14);
//       doc.text('Absent Teachers Details', 14, yPos);
//       yPos += 10;
      
//       const tableData = teachersData
//         .filter(teacher => teacher.currentLeave)
//         .map(teacher => [
//           teacher.teacherId,
//           teacher.name,
//           teacher.department,
//           teacher.currentLeave?.type || 'N/A',
//           teacher.phone,
//           teacher.leaveBalance
//         ]);
      
//       doc.autoTable({
//         startY: yPos,
//         head: [['Teacher ID', 'Name', 'Department', 'Leave Type', 'Contact', 'Leave Balance']],
//         body: tableData,
//         theme: 'grid',
//         headStyles: { fillColor: [128, 0, 128] },
//         margin: { top: yPos }
//       });
//     }
    
//     const fileName = activeTab === 'students' 
//       ? `Student_Attendance_Report_${new Date().toISOString().split('T')[0]}.pdf`
//       : `Teacher_Attendance_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    
//     doc.save(fileName);
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* SIDEBAR */}
//       <div className="w-64 bg-blue-900 text-white">
//         <PrincipalSidebar />
//       </div>

//       {/* MAIN AREA */}
//       <div className="flex flex-col flex-1">
//         {/* HEADER */}
//         <Header />

//         {/* CONTENT */}
//         <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
//           {/* PAGE HEADER */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
//               <p className="text-gray-600 mt-1">{formatDate(currentTime)} • {formatTime(currentTime)}</p>
//             </div>
            
//             <div className="flex items-center gap-4 mt-4 md:mt-0">
//               {/* SEARCH BAR */}
//               <div className="md:w-64">
//                 <form className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaSearch className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search ID, Name..."
//                     className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
//                   />
//                 </form>
//               </div>
              
//               {/* EXPORT BUTTONS */}
//               <div className="flex gap-2">
//                 <button 
//                   onClick={exportToExcel}
//                   className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                 >
//                   <FaFileExcel />
//                   Excel
//                 </button>
//                 <button 
//                   onClick={exportToPDF}
//                   className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 >
//                   <FaFilePdf />
//                   PDF
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* TABS NAVIGATION */}
//           <div className="mb-6">
//             <div className="flex border-b border-gray-200">
//               <button
//                 onClick={() => handleTabChange('students')}
//                 className={`flex items-center gap-2 px-6 py-3 font-medium text-sm border-b-2 transition-all ${activeTab === 'students' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//               >
//                 <FaUserGraduate />
//                 Students Attendance
//               </button>
//               <button
//                 onClick={() => handleTabChange('staff')}
//                 className={`flex items-center gap-2 px-6 py-3 font-medium text-sm border-b-2 transition-all ${activeTab === 'staff' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//               >
//                 <FaChalkboardTeacher />
//                 Staff Attendance
//               </button>
//             </div>
//           </div>

//           {/* STUDENTS ATTENDANCE TAB */}
//           {activeTab === 'students' && (
//             <div>
//               {/* OVERALL STATS */}
//               <div className="mb-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                     <FaChartBar className="text-blue-600" />
//                     Overall Student Attendance
//                   </h2>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <FaFilter />
//                     <select 
//                       value={selectedClass}
//                       onChange={(e) => setSelectedClass(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="all">All Classes</option>
//                       {classes.map(cls => (
//                         <option key={cls.id} value={cls.id}>
//                           Class {cls.id}
//                         </option>
//                       ))}
//                     </select>
//                     <select 
//                       value={selectedSection}
//                       onChange={(e) => setSelectedSection(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="all">All Sections</option>
//                       {sections.map(section => (
//                         <option key={section} value={section}>
//                           Section {section}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
//                   <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-blue-200">Total Students</p>
//                         <h3 className="text-3xl font-bold mt-1">{overallStudentStats.total}</h3>
//                       </div>
//                       <FaUserGraduate className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-blue-200">
//                       Across all classes and sections
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-green-200">Present Today</p>
//                         <h3 className="text-3xl font-bold mt-1">{overallStudentStats.present}</h3>
//                       </div>
//                       <FaCalendarCheck className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-green-200">
//                       {((overallStudentStats.present / overallStudentStats.total) * 100).toFixed(1)}% Attendance
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-red-200">Absent Today</p>
//                         <h3 className="text-3xl font-bold mt-1">{overallStudentStats.absent}</h3>
//                       </div>
//                       <FaUserInjured className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-red-200">
//                       Without notice
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-yellow-200">Sick Leave</p>
//                         <h3 className="text-3xl font-bold mt-1">{overallStudentStats.sick}</h3>
//                       </div>
//                       <FaBed className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-yellow-200">
//                       Medical leave
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-purple-200">Approved Leave</p>
//                         <h3 className="text-3xl font-bold mt-1">{overallStudentStats.leave}</h3>
//                       </div>
//                       <FaCalendarTimes className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-purple-200">
//                       Official leave
//                     </div>
//                   </div>
//                 </div>

//                 {/* ATTENDANCE PERCENTAGE CARD */}
//                 <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="font-semibold text-gray-800 flex items-center gap-2">
//                       <FaChartBar className="text-blue-600" />
//                       Overall Attendance Percentage: {overallStudentStats.percentage}%
//                     </h2>
//                     <span className="text-sm text-gray-500">Updated: {formatTime(currentTime)}</span>
//                   </div>
//                   <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
//                       style={{ width: `${overallStudentStats.percentage}%` }}
//                     />
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-600 mt-2">
//                     <span>0%</span>
//                     <span>50%</span>
//                     <span>100%</span>
//                   </div>
//                 </div>
//               </div>

//               {/* CLASS-WISE ATTENDANCE */}
//               <div className="mb-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-gray-800">Class-wise Attendance</h2>
//                   <p className="text-gray-600 text-sm">Click on View Details to see student list</p>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {Object.entries(filteredStudentData).map(([className, data]) => (
//                     <div key={className} className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <h3 className="font-bold text-gray-800 text-lg">{className}</h3>
//                           <p className="text-sm text-gray-600">Total: {data.total} students</p>
//                         </div>
//                         <span className={`px-3 py-1 text-xs rounded-full font-semibold ${data.percentage >= 90 ? 'bg-green-100 text-green-800' : data.percentage >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
//                           {data.percentage}%
//                         </span>
//                       </div>
                      
//                       <div className="space-y-2 mb-4">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Present</span>
//                           <span className="font-semibold text-green-600">{data.present}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Absent</span>
//                           <span className="font-semibold text-red-600">{data.absent}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Sick</span>
//                           <span className="font-semibold text-yellow-600">{data.sick}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600">Leave</span>
//                           <span className="font-semibold text-blue-600">{data.leave}</span>
//                         </div>
//                       </div>
                      
//                       <button 
//                         onClick={() => setShowClassDetails(className)}
//                         className="w-full mt-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 transition-colors"
//                       >
//                         View Details <FaChevronRight className="text-xs" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* CLASS DETAILS MODAL */}
//               {showClassDetails && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//                   <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
                  
//                   <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                     <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white rounded-t-2xl flex justify-between items-center">
//                       <h2 className="text-xl font-bold">
//                         Class {showClassDetails} - Student Details
//                       </h2>
//                       <button onClick={() => setShowClassDetails(null)} className="text-white text-2xl hover:text-gray-200">×</button>
//                     </div>
                    
//                     <div className="p-6">
//                       <div className="mb-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Attendance Summary</h3>
//                         <div className="grid grid-cols-4 gap-4">
//                           <div className="bg-green-50 p-3 rounded-lg">
//                             <p className="text-sm text-gray-600">Present</p>
//                             <p className="text-2xl font-bold text-green-600">{studentAttendanceData[showClassDetails]?.present || 0}</p>
//                           </div>
//                           <div className="bg-red-50 p-3 rounded-lg">
//                             <p className="text-sm text-gray-600">Absent</p>
//                             <p className="text-2xl font-bold text-red-600">{studentAttendanceData[showClassDetails]?.absent || 0}</p>
//                           </div>
//                           <div className="bg-yellow-50 p-3 rounded-lg">
//                             <p className="text-sm text-gray-600">Sick</p>
//                             <p className="text-2xl font-bold text-yellow-600">{studentAttendanceData[showClassDetails]?.sick || 0}</p>
//                           </div>
//                           <div className="bg-blue-50 p-3 rounded-lg">
//                             <p className="text-sm text-gray-600">Leave</p>
//                             <p className="text-2xl font-bold text-blue-600">{studentAttendanceData[showClassDetails]?.leave || 0}</p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-3">Student List</h3>
//                         <div className="overflow-x-auto">
//                           <table className="w-full">
//                             <thead>
//                               <tr className="bg-gray-50">
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                               {studentAttendanceData[showClassDetails]?.students?.map((student) => (
//                                 <tr key={student.id} className="hover:bg-gray-50">
//                                   <td className="px-4 py-3">
//                                     <span className="font-medium">{student.rollNo}</span>
//                                   </td>
//                                   <td className="px-4 py-3">
//                                     <div className="flex items-center">
//                                       <div className="ml-4">
//                                         <p className="font-medium text-gray-900">{student.name}</p>
//                                         <p className="text-sm text-gray-500">ID: {student.id}</p>
//                                       </div>
//                                     </div>
//                                   </td>
//                                   <td className="px-4 py-3">
//                                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
//                                       {getStatusText(student.status)}
//                                     </span>
//                                   </td>
//                                   <td className="px-4 py-3">
//                                     <button 
//                                       onClick={() => {
//                                         const foundStudent = studentsData.find(s => s.id === student.id);
//                                         if (foundStudent) setSelectedStudent(foundStudent);
//                                       }}
//                                       className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
//                                     >
//                                       <FaEye />
//                                       View Profile
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* ABSENT STUDENTS LIST */}
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
//                   <h2 className="text-xl font-bold text-white flex items-center gap-3">
//                     <FaUserInjured className="text-2xl" />
//                     Today's Absent Students
//                   </h2>
//                   <div className="text-red-200 text-sm mt-1">
//                     Total: {overallStudentStats.absent + overallStudentStats.sick + overallStudentStats.leave} students
//                   </div>
//                 </div>
                
//                 <div className="p-5">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="bg-gray-50">
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class & Section</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-200">
//                         {studentsData.map((student) => (
//                           <tr key={student.id} className="hover:bg-gray-50">
//                             <td className="px-4 py-3">
//                               <div className="flex items-center">
//                                 <img src={student.profilePhoto} alt={student.name} className="w-10 h-10 rounded-full mr-3" />
//                                 <div>
//                                   <p className="font-medium text-gray-900">{student.name}</p>
//                                   <p className="text-sm text-gray-500">ID: {student.id}</p>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-3">
//                               <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                                 {student.class}-{student.section}
//                               </span>
//                             </td>
//                             <td className="px-4 py-3">
//                               <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
//                                 Absent
//                               </span>
//                             </td>
//                             <td className="px-4 py-3">
//                               <p className="text-sm text-gray-900">{student.phone}</p>
//                               <p className="text-xs text-gray-500">Emergency: {student.emergency}</p>
//                             </td>
//                             <td className="px-4 py-3">
//                               <button 
//                                 onClick={() => setSelectedStudent(student)}
//                                 className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
//                               >
//                                 <FaEye />
//                                 View Profile
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STAFF ATTENDANCE TAB */}
//           {activeTab === 'staff' && (
//             <div>
//               {/* OVERALL STATS */}
//               <div className="mb-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                     <FaChartBar className="text-purple-600" />
//                     Overall Staff Attendance
//                   </h2>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <FaFilter />
//                     <select 
//                       value={selectedDepartment}
//                       onChange={(e) => setSelectedDepartment(e.target.value)}
//                       className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     >
//                       <option value="all">All Departments</option>
//                       {departments.map(dept => (
//                         <option key={dept.id} value={dept.id}>
//                           {dept.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//                   <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-purple-200">Total Teachers</p>
//                         <h3 className="text-3xl font-bold mt-1">{overallTeacherStats.total}</h3>
//                       </div>
//                       <FaChalkboardTeacher className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-purple-200">
//                       Across all departments
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-green-200">Present Today</p>
//                         <h3 className="text-3xl font-bold mt-1">{overallTeacherStats.present}</h3>
//                       </div>
//                       <FaCalendarCheck className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-green-200">
//                       {overallTeacherStats.percentage}% Attendance
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-red-200">Absent Today</p>
//                         <h3 className="text-3xl font-bold mt-1">{overallTeacherStats.absent}</h3>
//                       </div>
//                       <FaUserInjured className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-red-200">
//                       Without notice
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg shadow-lg p-6 text-white">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-orange-200">On Leave</p>
//                         <h3 className="text-3xl font-bold mt-1">{teachersData.filter(t => t.currentLeave).length}</h3>
//                       </div>
//                       <FaCalendarTimes className="text-2xl opacity-80" />
//                     </div>
//                     <div className="mt-4 text-sm text-orange-200">
//                       Approved leave
//                     </div>
//                   </div>
//                 </div>

//                 {/* ATTENDANCE PERCENTAGE CARD */}
//                 <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="font-semibold text-gray-800 flex items-center gap-2">
//                       <FaChartBar className="text-purple-600" />
//                       Overall Staff Attendance Percentage: {overallTeacherStats.percentage}%
//                     </h2>
//                     <span className="text-sm text-gray-500">Updated: {formatTime(currentTime)}</span>
//                   </div>
//                   <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
//                       style={{ width: `${overallTeacherStats.percentage}%` }}
//                     />
//                   </div>
//                   <div className="flex justify-between text-xs text-gray-600 mt-2">
//                     <span>0%</span>
//                     <span>50%</span>
//                     <span>100%</span>
//                   </div>
//                 </div>
//               </div>

//               {/* DEPARTMENT-WISE ATTENDANCE */}
//               <div className="mb-8">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">Department-wise Attendance</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {Object.entries(filteredTeacherData).map(([deptId, data]) => {
//                     const dept = departments.find(d => d.id === deptId);
//                     return (
//                       <div key={deptId} className="bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100">
//                         <div className="flex justify-between items-start mb-3">
//                           <div>
//                             <h3 className="font-bold text-gray-800 text-lg">{dept?.name}</h3>
//                             <p className="text-sm text-gray-600">Total: {data.total} teachers</p>
//                           </div>
//                           <span className={`px-3 py-1 text-xs rounded-full font-semibold ${data.percentage >= 90 ? 'bg-green-100 text-green-800' : data.percentage >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
//                             {data.percentage}%
//                           </span>
//                         </div>
                        
//                         <div className="space-y-2 mb-4">
//                           <div className="flex justify-between text-sm">
//                             <span className="text-gray-600">Present</span>
//                             <span className="font-semibold text-green-600">{data.present}</span>
//                           </div>
//                           <div className="flex justify-between text-sm">
//                             <span className="text-gray-600">Absent</span>
//                             <span className="font-semibold text-red-600">{data.absent}</span>
//                           </div>
//                         </div>
                        
//                         <button 
//                           onClick={() => {
//                             setSelectedDepartment(deptId);
//                           }}
//                           className="w-full mt-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-1 transition-colors"
//                         >
//                           View Department <FaChevronRight className="text-xs" />
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* ABSENT TEACHERS LIST */}
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
//                   <h2 className="text-xl font-bold text-white flex items-center gap-3">
//                     <FaCalendarTimes className="text-2xl" />
//                     Today's Absent Staff
//                   </h2>
//                   <div className="text-orange-200 text-sm mt-1">
//                     Total: {overallTeacherStats.absent} teachers
//                   </div>
//                 </div>
                
//                 <div className="p-5">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="bg-gray-50">
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Balance</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-200">
//                         {teachersData.map((teacher) => (
//                           <tr key={teacher.id} className="hover:bg-gray-50">
//                             <td className="px-4 py-3">
//                               <div className="flex items-center">
//                                 <img src={teacher.profilePhoto} alt={teacher.name} className="w-10 h-10 rounded-full mr-3" />
//                                 <div>
//                                   <p className="font-medium text-gray-900">{teacher.name}</p>
//                                   <p className="text-sm text-gray-500">ID: {teacher.teacherId}</p>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-3">
//                               <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                                 {teacher.department}
//                               </span>
//                             </td>
//                             <td className="px-4 py-3">
//                               <div className="text-center">
//                                 <span className="text-lg font-bold text-blue-600">{teacher.leaveBalance}</span>
//                                 <p className="text-xs text-gray-500">Days Left</p>
//                               </div>
//                             </td>
//                             <td className="px-4 py-3">
//                               {teacher.currentLeave ? (
//                                 <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
//                                   On Leave ({teacher.currentLeave.type})
//                                 </span>
//                               ) : (
//                                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                                   Present
//                                 </span>
//                               )}
//                             </td>
//                             <td className="px-4 py-3">
//                               <button 
//                                 onClick={() => setSelectedTeacher(teacher)}
//                                 className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-1"
//                               >
//                                 <FaEye />
//                                 View Details
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>

//         {/* FOOTER */}
//         <Footer />
//       </div>

//       {/* STUDENT DETAIL MODAL */}
//       {selectedStudent && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//           {/* Blurred background */}
//           <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
          
//           <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-100">
//             <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white rounded-t-2xl flex justify-between items-center">
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                 <FaUserGraduate />
//                 Student Profile & Attendance Details
//               </h2>
//               <button onClick={() => setSelectedStudent(null)} className="text-white text-2xl hover:text-gray-200">×</button>
//             </div>
            
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row gap-6 mb-6">
//                 <div className="md:w-1/3 flex flex-col items-center">
//                   <div className="relative">
//                     <img
//                       src={selectedStudent.profilePhoto}
//                       className="w-48 h-48 rounded-2xl border-4 border-white shadow-lg"
//                       alt={selectedStudent.name}
//                     />
//                     <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
//                       ID: {selectedStudent.id}
//                     </div>
//                   </div>
//                   <div className="mt-8 text-center">
//                     <h3 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h3>
//                     <p className="text-gray-600">Class {selectedStudent.class}-{selectedStudent.section}</p>
//                     <div className="mt-3 flex items-center justify-center gap-2">
//                       <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
//                         Absent Today
//                       </span>
//                       <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                         Roll: {selectedStudent.rollNo}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="md:w-2/3">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg">
//                       <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
//                         <FaIdCard />
//                         Personal Information
//                       </h4>
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Father's Name</label>
//                           <p className="font-semibold text-gray-800">{selectedStudent.father}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Mother's Name</label>
//                           <p className="font-semibold text-gray-800">{selectedStudent.mother}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Aadhar ID</label>
//                           <p className="font-semibold text-gray-800">{selectedStudent.aadharId}</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg">
//                       <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
//                         <FaPhone />
//                         Contact Information
//                       </h4>
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Parent's Phone</label>
//                           <p className="font-semibold text-gray-800">{selectedStudent.phone}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
//                           <p className="font-semibold text-gray-800">{selectedStudent.emergency}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500 flex items-center gap-2">
//                             <FaHome />
//                             Address
//                           </label>
//                           <p className="font-semibold text-gray-800 text-sm">{selectedStudent.address}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* ATTENDANCE STATS */}
//                   <div className="mt-6 bg-gradient-to-r from-green-50 to-white p-4 rounded-lg">
//                     <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
//                       <FaChartBar />
//                       Attendance Statistics
//                     </h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-green-600">{selectedStudent.attendance.present}</div>
//                         <div className="text-sm text-gray-600">Days Present</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-red-600">{selectedStudent.attendance.absent}</div>
//                         <div className="text-sm text-gray-600">Days Absent</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-yellow-600">{selectedStudent.attendance.sick}</div>
//                         <div className="text-sm text-gray-600">Days Sick</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-blue-600">{selectedStudent.attendance.leave}</div>
//                         <div className="text-sm text-gray-600">Days Leave</div>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <div className="flex justify-between text-sm text-gray-600 mb-1">
//                         <span>Attendance Percentage</span>
//                         <span>{selectedStudent.attendance.percentage}%</span>
//                       </div>
//                       <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div 
//                           className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
//                           style={{ width: `${selectedStudent.attendance.percentage}%` }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* LEAVE HISTORY */}
//               <div className="bg-white rounded-lg shadow border border-gray-200">
//                 <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
//                   <h4 className="font-semibold text-gray-700 flex items-center gap-2">
//                     <FaHistory />
//                     Leave History
//                   </h4>
//                   <span className="text-sm text-gray-500">Total Leaves: {selectedStudent.leaveHistory.length}</span>
//                 </div>
//                 <div className="p-4">
//                   {selectedStudent.leaveHistory.length > 0 ? (
//                     <div className="space-y-3">
//                       {selectedStudent.leaveHistory.map((leave, index) => (
//                         <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                           <div>
//                             <p className="font-medium text-gray-800">{leave.reason}</p>
//                             <p className="text-sm text-gray-600">{leave.date}</p>
//                           </div>
//                           <span className={`px-3 py-1 text-xs rounded-full ${leave.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                             {leave.approved ? 'Approved' : 'Pending'}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 text-center py-4">No leave history available</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* TEACHER DETAIL MODAL */}
//       {selectedTeacher && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//           {/* Blurred background */}
//           <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
          
//           <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-100">
//             <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 text-white rounded-t-2xl flex justify-between items-center">
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                 <FaChalkboardTeacher />
//                 Teacher Profile & Attendance Details
//               </h2>
//               <button onClick={() => setSelectedTeacher(null)} className="text-white text-2xl hover:text-gray-200">×</button>
//             </div>
            
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row gap-6 mb-6">
//                 <div className="md:w-1/3 flex flex-col items-center">
//                   <div className="relative">
//                     <img
//                       src={selectedTeacher.profilePhoto}
//                       className="w-48 h-48 rounded-2xl border-4 border-white shadow-lg"
//                       alt={selectedTeacher.name}
//                     />
//                     <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
//                       ID: {selectedTeacher.teacherId}
//                     </div>
//                   </div>
//                   <div className="mt-8 text-center">
//                     <h3 className="text-2xl font-bold text-gray-800">{selectedTeacher.name}</h3>
//                     <p className="text-gray-600">{selectedTeacher.department} Department</p>
//                     <div className="mt-3">
//                       <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 rounded-full text-sm font-medium flex items-center gap-2 justify-center">
//                         <FaCalendarTimes />
//                         ON LEAVE
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="md:w-2/3">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg">
//                       <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
//                         <FaIdCard />
//                         Professional Information
//                       </h4>
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Teacher ID</label>
//                           <p className="font-semibold text-gray-800">{selectedTeacher.teacherId}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Department</label>
//                           <p className="font-semibold text-gray-800">{selectedTeacher.department}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Subject</label>
//                           <p className="font-semibold text-gray-800">{selectedTeacher.subject}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Aadhar ID</label>
//                           <p className="font-semibold text-gray-800">{selectedTeacher.aadharId}</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg">
//                       <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
//                         <FaPhone />
//                         Contact & Leave Info
//                       </h4>
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Phone Number</label>
//                           <p className="font-semibold text-gray-800">{selectedTeacher.phone}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
//                           <p className="font-semibold text-gray-800">{selectedTeacher.emergency}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Leave Balance</label>
//                           <p className="text-2xl font-bold text-blue-600">{selectedTeacher.leaveBalance} days</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500 flex items-center gap-2">
//                             <FaHome />
//                             Address
//                           </label>
//                           <p className="font-semibold text-gray-800 text-sm">{selectedTeacher.address}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* ATTENDANCE STATS */}
//                   <div className="mt-6 bg-gradient-to-r from-green-50 to-white p-4 rounded-lg">
//                     <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
//                       <FaChartBar />
//                       Attendance Statistics
//                     </h4>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-green-600">{selectedTeacher.attendance.present}</div>
//                         <div className="text-sm text-gray-600">Days Present</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-red-600">{selectedTeacher.attendance.absent}</div>
//                         <div className="text-sm text-gray-600">Days Absent</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-blue-600">{selectedTeacher.attendance.percentage}%</div>
//                         <div className="text-sm text-gray-600">Attendance Rate</div>
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <div className="flex justify-between text-sm text-gray-600 mb-1">
//                         <span>Attendance Percentage</span>
//                         <span>{selectedTeacher.attendance.percentage}%</span>
//                       </div>
//                       <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div 
//                           className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
//                           style={{ width: `${selectedTeacher.attendance.percentage}%` }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* CURRENT LEAVE & HISTORY */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* CURRENT LEAVE */}
//                 <div className="bg-white rounded-lg shadow border border-gray-200">
//                   <div className="px-4 py-3 bg-orange-50 border-b border-orange-200">
//                     <h4 className="font-semibold text-orange-700 flex items-center gap-2">
//                       <FaCalendarTimes />
//                       Current Leave Status
//                     </h4>
//                   </div>
//                   <div className="p-4">
//                     {selectedTeacher.currentLeave ? (
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Leave Type</label>
//                           <p className="font-semibold text-gray-800">{selectedTeacher.currentLeave.type}</p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-500">Reason</label>
//                           <p className="font-semibold text-gray-800">{selectedTeacher.currentLeave.reason}</p>
//                         </div>
//                         <div className="grid grid-cols-2 gap-3">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-500">From</label>
//                             <p className="font-semibold text-gray-800">{selectedTeacher.currentLeave.from}</p>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-500">To</label>
//                             <p className="font-semibold text-gray-800">{selectedTeacher.currentLeave.to}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-center py-4">No current leave</p>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* LEAVE HISTORY */}
//                 <div className="bg-white rounded-lg shadow border border-gray-200">
//                   <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
//                     <h4 className="font-semibold text-gray-700 flex items-center gap-2">
//                       <FaHistory />
//                       Leave History
//                     </h4>
//                     <span className="text-sm text-gray-500">Total: {selectedTeacher.leaveHistory.length}</span>
//                   </div>
//                   <div className="p-4">
//                     {selectedTeacher.leaveHistory.length > 0 ? (
//                       <div className="space-y-3 max-h-48 overflow-y-auto">
//                         {selectedTeacher.leaveHistory.map((leave, index) => (
//                           <div key={index} className="p-3 bg-gray-50 rounded-lg">
//                             <div className="flex justify-between items-start">
//                               <div>
//                                 <p className="font-medium text-gray-800">{leave.reason}</p>
//                                 <p className="text-sm text-gray-600">{leave.date} • {leave.days} days</p>
//                               </div>
//                               <span className={`px-2 py-1 text-xs rounded-full ${leave.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                                 {leave.approved ? 'Approved' : 'Pending'}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-center py-4">No leave history available</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AttendanceManagement;

import { useState, useEffect, useRef } from 'react';
import PrincipalSidebar from "../components/PrincipalSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaSearch, 
  FaCalendarCheck, 
  FaCalendarTimes, 
  FaUserInjured, 
  FaEye, 
  FaChevronRight,
  FaChevronLeft,
  FaIdCard,
  FaPhone,
  FaHome,
  FaHistory,
  FaChartBar,
  FaFilter,
  FaDownload,
  FaFileExcel,
  FaFilePdf,
  FaUserMd,
  FaBed,
  FaBook,
  FaUserFriends,
  FaSchool,
  FaClipboardList
} from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AttendanceManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [activeTab, setActiveTab] = useState('students');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showClassDetails, setShowClassDetails] = useState(null);
  
  // Check URL path to set active tab
  useEffect(() => {
    if (location.pathname.includes('/attendance/staff')) {
      setActiveTab('staff');
    } else {
      setActiveTab('students');
    }
  }, [location]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Classes 1-10 with sections A, B
  const classes = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Class ${i + 1}`,
    sections: ['A', 'B']
  }));

  // All sections
  const sections = ['A', 'B'];

  // Departments for teachers
  const departments = [
    { id: 'math', name: 'Mathematics', color: 'from-purple-500 to-purple-600' },
    { id: 'science', name: 'Science', color: 'from-green-500 to-green-600' },
    { id: 'english', name: 'English', color: 'from-blue-500 to-blue-600' },
    { id: 'social', name: 'Social Studies', color: 'from-yellow-500 to-yellow-600' },
    { id: 'hindi', name: 'Hindi', color: 'from-red-500 to-red-600' },
    { id: 'computer', name: 'Computer Science', color: 'from-indigo-500 to-indigo-600' },
    { id: 'phyedu', name: 'Physical Education', color: 'from-pink-500 to-pink-600' },
    { id: 'arts', name: 'Arts & Crafts', color: 'from-teal-500 to-teal-600' }
  ];

  // Enhanced Sample Student Attendance Data with more students
  const studentAttendanceData = {
    '1A': { 
      total: 45, 
      present: 38, 
      absent: 3, 
      sick: 2, 
      leave: 2, 
      percentage: 84.4,
      students: [
        { id: "STU001", name: "Rahul Sharma", status: "absent", rollNo: "001" },
        { id: "STU002", name: "Priya Patel", status: "sick", rollNo: "002" },
        { id: "STU003", name: "Amit Kumar", status: "leave", rollNo: "003" },
        { id: "STU004", name: "Sneha Singh", status: "absent", rollNo: "004" },
        { id: "STU005", name: "Raj Verma", status: "sick", rollNo: "005" },
        { id: "STU006", name: "Meera Nair", status: "absent", rollNo: "006" },
        { id: "STU007", name: "Vikram Reddy", status: "leave", rollNo: "007" }
      ]
    },
    '1B': { 
      total: 42, 
      present: 36, 
      absent: 2, 
      sick: 2, 
      leave: 2, 
      percentage: 85.7,
      students: [
        { id: "STU008", name: "Karan Mehta", status: "sick", rollNo: "001" },
        { id: "STU009", name: "Neha Gupta", status: "leave", rollNo: "002" },
        { id: "STU010", name: "Rohit Sharma", status: "absent", rollNo: "003" },
        { id: "STU011", name: "Pooja Patel", status: "absent", rollNo: "004" },
        { id: "STU012", name: "Arun Singh", status: "sick", rollNo: "005" }
      ]
    },
    '2A': { 
      total: 48, 
      present: 43, 
      absent: 2, 
      sick: 1, 
      leave: 2, 
      percentage: 89.6,
      students: [
        { id: "STU013", name: "Ananya Das", status: "absent", rollNo: "001" },
        { id: "STU014", name: "Rohan Kapoor", status: "leave", rollNo: "002" },
        { id: "STU015", name: "Simran Kaur", status: "sick", rollNo: "003" },
        { id: "STU016", name: "Aditya Rao", status: "absent", rollNo: "004" }
      ]
    },
    '2B': { 
      total: 46, 
      present: 41, 
      absent: 1, 
      sick: 2, 
      leave: 2, 
      percentage: 89.1,
      students: [
        { id: "STU017", name: "Nisha Verma", status: "sick", rollNo: "001" },
        { id: "STU018", name: "Kunal Joshi", status: "leave", rollNo: "002" },
        { id: "STU019", name: "Tanya Malhotra", status: "absent", rollNo: "003" },
        { id: "STU020", name: "Varun Chawla", status: "sick", rollNo: "004" }
      ]
    },
    '3A': { 
      total: 50, 
      present: 45, 
      absent: 2, 
      sick: 1, 
      leave: 2, 
      percentage: 90.0,
      students: [
        { id: "STU021", name: "Priyanka Sharma", status: "absent", rollNo: "001" },
        { id: "STU022", name: "Rajesh Nair", status: "leave", rollNo: "002" },
        { id: "STU023", name: "Sunita Reddy", status: "sick", rollNo: "003" }
      ]
    },
    '3B': { 
      total: 49, 
      present: 44, 
      absent: 2, 
      sick: 1, 
      leave: 2, 
      percentage: 89.8,
      students: [
        { id: "STU024", name: "Manoj Kumar", status: "absent", rollNo: "001" },
        { id: "STU025", name: "Swati Patel", status: "sick", rollNo: "002" },
        { id: "STU026", name: "Ajay Singh", status: "leave", rollNo: "003" }
      ]
    },
    '4A': { 
      total: 47, 
      present: 42, 
      absent: 2, 
      sick: 1, 
      leave: 2, 
      percentage: 89.4,
      students: [
        { id: "STU027", name: "Deepak Mehta", status: "absent", rollNo: "001" },
        { id: "STU028", name: "Ritu Gupta", status: "leave", rollNo: "002" },
        { id: "STU029", name: "Alok Verma", status: "sick", rollNo: "003" }
      ]
    }
  };

  // Enhanced Sample Student Details
  const studentsData = [
    {
      id: "STU001",
      name: "Rahul Sharma",
      class: "1",
      section: "A",
      rollNo: "001",
      father: "Rajesh Sharma",
      mother: "Priya Sharma",
      phone: "9876543210",
      emergency: "9876543211",
      aadharId: "1234 5678 9012",
      address: "Mumbai, Maharashtra",
      attendance: {
        present: 95,
        absent: 3,
        sick: 1,
        leave: 1,
        percentage: 95
      },
      leaveHistory: [
        { date: "2024-01-15", reason: "Medical", approved: true },
        { date: "2024-02-20", reason: "Family Function", approved: true },
        { date: "2024-03-10", reason: "Medical", approved: true }
      ],
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
    },
    {
      id: "STU002",
      name: "Priya Patel",
      class: "1",
      section: "A",
      rollNo: "002",
      father: "Amit Patel",
      mother: "Neha Patel",
      phone: "9876543212",
      emergency: "9876543213",
      aadharId: "2345 6789 0123",
      address: "Ahmedabad, Gujarat",
      attendance: {
        present: 98,
        absent: 1,
        sick: 0,
        leave: 1,
        percentage: 98
      },
      leaveHistory: [
        { date: "2024-02-05", reason: "Personal", approved: true }
      ],
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
      id: "STU003",
      name: "Amit Kumar",
      class: "1",
      section: "A",
      rollNo: "003",
      father: "Sanjay Kumar",
      mother: "Rekha Kumar",
      phone: "9876543214",
      emergency: "9876543215",
      aadharId: "3456 7890 1234",
      address: "Delhi, NCR",
      attendance: {
        present: 90,
        absent: 5,
        sick: 3,
        leave: 2,
        percentage: 90
      },
      leaveHistory: [
        { date: "2024-01-20", reason: "Medical", approved: true },
        { date: "2024-03-15", reason: "Family Emergency", approved: true }
      ],
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit"
    },
    {
      id: "STU008",
      name: "Karan Mehta",
      class: "1",
      section: "B",
      rollNo: "001",
      father: "Ravi Mehta",
      mother: "Sunita Mehta",
      phone: "9876543220",
      emergency: "9876543221",
      aadharId: "4567 8901 2345",
      address: "Bangalore, Karnataka",
      attendance: {
        present: 92,
        absent: 4,
        sick: 2,
        leave: 2,
        percentage: 92
      },
      leaveHistory: [
        { date: "2024-02-10", reason: "Medical", approved: true }
      ],
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan"
    },
    {
      id: "STU013",
      name: "Ananya Das",
      class: "2",
      section: "A",
      rollNo: "001",
      father: "Suresh Das",
      mother: "Mala Das",
      phone: "9876543230",
      emergency: "9876543231",
      aadharId: "5678 9012 3456",
      address: "Kolkata, West Bengal",
      attendance: {
        present: 96,
        absent: 2,
        sick: 1,
        leave: 1,
        percentage: 96
      },
      leaveHistory: [
        { date: "2024-01-25", reason: "Medical", approved: true }
      ],
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
    }
  ];

  // Enhanced Sample Teacher Attendance Data
  const teacherAttendanceData = {
    'math': { 
      total: 15, 
      present: 12, 
      absent: 2, 
      leave: 1,
      percentage: 80.0,
      teachers: [
        { id: "TCH001", name: "Dr. Ravi Kumar", status: "leave" },
        { id: "TCH011", name: "Mrs. Geeta Sharma", status: "absent" },
        { id: "TCH012", name: "Mr. Anil Verma", status: "absent" }
      ]
    },
    'science': { 
      total: 18, 
      present: 16, 
      absent: 1, 
      leave: 1,
      percentage: 88.9,
      teachers: [
        { id: "TCH002", name: "Dr. Anjali Singh", status: "present" },
        { id: "TCH013", name: "Dr. Rajesh Patel", status: "leave" }
      ]
    },
    'english': { 
      total: 12, 
      present: 10, 
      absent: 1, 
      leave: 1,
      percentage: 83.3,
      teachers: [
        { id: "TCH003", name: "Ms. Priya Nair", status: "absent" },
        { id: "TCH014", name: "Mr. David Smith", status: "leave" }
      ]
    },
    'social': { 
      total: 10, 
      present: 8, 
      absent: 1, 
      leave: 1,
      percentage: 80.0,
      teachers: [
        { id: "TCH004", name: "Mr. Arun Joshi", status: "leave" },
        { id: "TCH015", name: "Ms. Sunita Reddy", status: "absent" }
      ]
    },
    'hindi': { 
      total: 8, 
      present: 7, 
      absent: 1, 
      leave: 0,
      percentage: 87.5,
      teachers: [
        { id: "TCH005", name: "Mrs. Lata Sharma", status: "absent" }
      ]
    },
    'computer': { 
      total: 6, 
      present: 5, 
      absent: 1, 
      leave: 0,
      percentage: 83.3,
      teachers: [
        { id: "TCH006", name: "Mr. Sanjay Kumar", status: "absent" }
      ]
    },
    'phyedu': { 
      total: 4, 
      present: 3, 
      absent: 1, 
      leave: 0,
      percentage: 75.0,
      teachers: [
        { id: "TCH007", name: "Mr. Rohan Singh", status: "absent" }
      ]
    },
    'arts': { 
      total: 5, 
      present: 4, 
      absent: 1, 
      leave: 0,
      percentage: 80.0,
      teachers: [
        { id: "TCH008", name: "Ms. Meera Kapoor", status: "absent" }
      ]
    }
  };

  // Enhanced Sample Teacher Details
  const teachersData = [
    {
      id: "TCH001",
      teacherId: "MATH001",
      name: "Dr. Ravi Kumar",
      department: "Mathematics",
      subject: "Mathematics",
      phone: "9000012345",
      emergency: "9000099999",
      aadharId: "3456 7890 1234",
      address: "Delhi, NCR",
      leaveBalance: 12,
      attendance: {
        present: 98,
        absent: 2,
        percentage: 98
      },
      leaveHistory: [
        { date: "2024-01-10", reason: "Medical", days: 2, approved: true },
        { date: "2024-03-05", reason: "Conference", days: 3, approved: true }
      ],
      currentLeave: {
        from: "2024-04-01",
        to: "2024-04-05",
        reason: "Personal",
        type: "Casual Leave"
      },
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi"
    },
    {
      id: "TCH002",
      teacherId: "SCI001",
      name: "Dr. Anjali Singh",
      department: "Science",
      subject: "Physics",
      phone: "9000023456",
      emergency: "9000088888",
      aadharId: "4567 8901 2345",
      address: "Bangalore, Karnataka",
      leaveBalance: 8,
      attendance: {
        present: 100,
        absent: 0,
        percentage: 100
      },
      leaveHistory: [
        { date: "2024-02-15", reason: "Medical", days: 1, approved: true }
      ],
      currentLeave: null,
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali"
    },
    {
      id: "TCH003",
      teacherId: "ENG001",
      name: "Ms. Priya Nair",
      department: "English",
      subject: "English Literature",
      phone: "9000034567",
      emergency: "9000077777",
      aadharId: "5678 9012 3456",
      address: "Chennai, Tamil Nadu",
      leaveBalance: 6,
      attendance: {
        present: 95,
        absent: 3,
        percentage: 95
      },
      leaveHistory: [
        { date: "2024-01-20", reason: "Medical", days: 2, approved: true },
        { date: "2024-03-10", reason: "Personal", days: 1, approved: true }
      ],
      currentLeave: null,
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaN"
    },
    {
      id: "TCH004",
      teacherId: "SOC001",
      name: "Mr. Arun Joshi",
      department: "Social Studies",
      subject: "History",
      phone: "9000045678",
      emergency: "9000066666",
      aadharId: "6789 0123 4567",
      address: "Hyderabad, Telangana",
      leaveBalance: 10,
      attendance: {
        present: 92,
        absent: 5,
        percentage: 92
      },
      leaveHistory: [
        { date: "2024-02-01", reason: "Medical", days: 3, approved: true },
        { date: "2024-03-20", reason: "Family Function", days: 2, approved: true }
      ],
      currentLeave: {
        from: "2024-04-03",
        to: "2024-04-04",
        reason: "Medical Appointment",
        type: "Medical Leave"
      },
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arun"
    },
    {
      id: "TCH005",
      teacherId: "HIN001",
      name: "Mrs. Lata Sharma",
      department: "Hindi",
      subject: "Hindi",
      phone: "9000056789",
      emergency: "9000055555",
      aadharId: "7890 1234 5678",
      address: "Lucknow, Uttar Pradesh",
      leaveBalance: 7,
      attendance: {
        present: 96,
        absent: 2,
        percentage: 96
      },
      leaveHistory: [
        { date: "2024-01-15", reason: "Medical", days: 1, approved: true }
      ],
      currentLeave: null,
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lata"
    }
  ];

  // Filter data based on selections
  const filteredStudentData = selectedClass === 'all' 
    ? studentAttendanceData 
    : Object.keys(studentAttendanceData).reduce((acc, key) => {
        if (selectedSection === 'all') {
          if (key.startsWith(selectedClass)) {
            acc[key] = studentAttendanceData[key];
          }
        } else {
          if (key === `${selectedClass}${selectedSection}`) {
            acc[key] = studentAttendanceData[key];
          }
        }
        return acc;
      }, {});

  const filteredTeacherData = selectedDepartment === 'all'
    ? teacherAttendanceData
    : { [selectedDepartment]: teacherAttendanceData[selectedDepartment] };

  // Calculate overall statistics
  const overallStudentStats = Object.values(studentAttendanceData).reduce((acc, curr) => ({
    total: acc.total + curr.total,
    present: acc.present + curr.present,
    absent: acc.absent + curr.absent,
    sick: acc.sick + curr.sick,
    leave: acc.leave + curr.leave
  }), { total: 0, present: 0, absent: 0, sick: 0, leave: 0 });

  overallStudentStats.percentage = overallStudentStats.total > 0 
    ? ((overallStudentStats.present / overallStudentStats.total) * 100).toFixed(1)
    : 0;

  const overallTeacherStats = Object.values(teacherAttendanceData).reduce((acc, curr) => ({
    total: acc.total + curr.total,
    present: acc.present + curr.present,
    absent: acc.absent + (curr.absent || 0),
    leave: acc.leave + (curr.leave || 0)
  }), { total: 0, present: 0, absent: 0, leave: 0 });

  overallTeacherStats.percentage = overallTeacherStats.total > 0
    ? ((overallTeacherStats.present / overallTeacherStats.total) * 100).toFixed(1)
    : 0;

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'absent': return 'bg-red-100 text-red-800 border border-red-200';
      case 'sick': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'leave': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'present': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'absent': return 'Absent';
      case 'sick': return 'Sick';
      case 'leave': return 'On Leave';
      case 'present': return 'Present';
      default: return 'Unknown';
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'students') {
      navigate('/principal/attendance/students');
    } else {
      navigate('/principal/attendance/staff');
    }
  };

  // Export to Excel function
  const exportToExcel = () => {
    const data = [];
    
    if (activeTab === 'students') {
      // Add headers
      data.push(['Student ID', 'Name', 'Class', 'Section', 'Roll No', 'Status', 'Father Name', 'Mother Name', 'Phone', 'Emergency Contact', 'Aadhar ID', 'Address']);
      
      // Add absent/sick/leave students
      studentsData.forEach(student => {
        data.push([
          student.id,
          student.name,
          student.class,
          student.section,
          student.rollNo,
          'Absent',
          student.father,
          student.mother,
          student.phone,
          student.emergency,
          student.aadharId,
          student.address
        ]);
      });
      
      // Add attendance statistics
      data.push([]);
      data.push(['Overall Statistics']);
      data.push(['Total Students', overallStudentStats.total]);
      data.push(['Present', overallStudentStats.present]);
      data.push(['Absent', overallStudentStats.absent]);
      data.push(['Sick', overallStudentStats.sick]);
      data.push(['On Leave', overallStudentStats.leave]);
      data.push(['Attendance %', `${overallStudentStats.percentage}%`]);
      
    } else {
      // Add headers for teachers
      data.push(['Teacher ID', 'Name', 'Department', 'Subject', 'Status', 'Phone', 'Emergency Contact', 'Leave Balance', 'Aadhar ID', 'Address']);
      
      // Add absent teachers
      teachersData.forEach(teacher => {
        if (teacher.currentLeave) {
          data.push([
            teacher.teacherId,
            teacher.name,
            teacher.department,
            teacher.subject,
            'On Leave',
            teacher.phone,
            teacher.emergency,
            teacher.leaveBalance,
            teacher.aadharId,
            teacher.address
          ]);
        }
      });
      
      // Add attendance statistics
      data.push([]);
      data.push(['Overall Statistics']);
      data.push(['Total Teachers', overallTeacherStats.total]);
      data.push(['Present', overallTeacherStats.present]);
      data.push(['Absent', overallTeacherStats.absent]);
      data.push(['On Leave', overallTeacherStats.leave]);
      data.push(['Attendance %', `${overallTeacherStats.percentage}%`]);
    }
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
    
    const fileName = activeTab === 'students' 
      ? `Student_Attendance_Report_${new Date().toISOString().split('T')[0]}.xlsx`
      : `Teacher_Attendance_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    XLSX.writeFile(wb, fileName);
  };

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 128);
    doc.text(activeTab === 'students' ? 'Student Attendance Report' : 'Teacher Attendance Report', pageWidth / 2, 15, { align: 'center' });
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} ${formatTime(new Date())}`, pageWidth / 2, 22, { align: 'center' });
    
    let yPos = 35;
    
    if (activeTab === 'students') {
      // Add statistics
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Overall Statistics', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.text(`Total Students: ${overallStudentStats.total}`, 20, yPos);
      yPos += 7;
      doc.text(`Present: ${overallStudentStats.present}`, 20, yPos);
      yPos += 7;
      doc.text(`Absent: ${overallStudentStats.absent}`, 20, yPos);
      yPos += 7;
      doc.text(`Sick: ${overallStudentStats.sick}`, 20, yPos);
      yPos += 7;
      doc.text(`On Leave: ${overallStudentStats.leave}`, 20, yPos);
      yPos += 7;
      doc.text(`Attendance Percentage: ${overallStudentStats.percentage}%`, 20, yPos);
      yPos += 15;
      
      // Add absent students table
      doc.setFontSize(14);
      doc.text('Absent/Sick/Leave Students Details', 14, yPos);
      yPos += 10;
      
      const tableData = studentsData.map(student => [
        student.id,
        student.name,
        `${student.class}-${student.section}`,
        student.rollNo,
        'Absent',
        student.phone
      ]);
      
      doc.autoTable({
        startY: yPos,
        head: [['Student ID', 'Name', 'Class-Section', 'Roll No', 'Status', 'Contact']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [0, 0, 128] },
        margin: { top: yPos }
      });
      
    } else {
      // Add statistics for teachers
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Overall Statistics', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.text(`Total Teachers: ${overallTeacherStats.total}`, 20, yPos);
      yPos += 7;
      doc.text(`Present: ${overallTeacherStats.present}`, 20, yPos);
      yPos += 7;
      doc.text(`Absent: ${overallTeacherStats.absent}`, 20, yPos);
      yPos += 7;
      doc.text(`On Leave: ${overallTeacherStats.leave}`, 20, yPos);
      yPos += 7;
      doc.text(`Attendance Percentage: ${overallTeacherStats.percentage}%`, 20, yPos);
      yPos += 15;
      
      // Add absent teachers table
      doc.setFontSize(14);
      doc.text('Absent Teachers Details', 14, yPos);
      yPos += 10;
      
      const tableData = teachersData
        .filter(teacher => teacher.currentLeave)
        .map(teacher => [
          teacher.teacherId,
          teacher.name,
          teacher.department,
          teacher.currentLeave?.type || 'N/A',
          teacher.phone,
          teacher.leaveBalance
        ]);
      
      doc.autoTable({
        startY: yPos,
        head: [['Teacher ID', 'Name', 'Department', 'Leave Type', 'Contact', 'Leave Balance']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [128, 0, 128] },
        margin: { top: yPos }
      });
    }
    
    const fileName = activeTab === 'students' 
      ? `Student_Attendance_Report_${new Date().toISOString().split('T')[0]}.pdf`
      : `Teacher_Attendance_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    
    doc.save(fileName);
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white">
        <PrincipalSidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1">
        {/* HEADER */}
        <Header />

        {/* CONTENT */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {/* PAGE HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                  {formatDate(currentTime)}
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                  {formatTime(currentTime)}
                </span>
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* SEARCH BAR */}
              <div className="md:w-64">
                <form className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search ID, Name..."
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm bg-white shadow-sm"
                  />
                </form>
              </div>
              
              {/* EXPORT BUTTONS */}
              <div className="flex gap-2">
                <button 
                  onClick={exportToExcel}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                >
                  <FaFileExcel />
                  Excel
                </button>
                <button 
                  onClick={exportToPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  <FaFilePdf />
                  PDF
                </button>
              </div>
            </div>
          </div>

          {/* TABS NAVIGATION */}
          <div className="mb-8">
            <div className="flex border-b border-gray-200 bg-white rounded-t-lg shadow-sm">
              <button
                onClick={() => handleTabChange('students')}
                className={`flex items-center gap-3 px-8 py-4 font-medium text-sm border-b-2 transition-all ${activeTab === 'students' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                <FaUserGraduate className="text-lg" />
                Students Attendance
                {activeTab === 'students' && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {overallStudentStats.total} Students
                  </span>
                )}
              </button>
              <button
                onClick={() => handleTabChange('staff')}
                className={`flex items-center gap-3 px-8 py-4 font-medium text-sm border-b-2 transition-all ${activeTab === 'staff' ? 'border-purple-600 text-purple-600 bg-purple-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                <FaChalkboardTeacher className="text-lg" />
                Staff Attendance
                {activeTab === 'staff' && (
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                    {overallTeacherStats.total} Staff
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* STUDENTS ATTENDANCE TAB */}
          {activeTab === 'students' && (
            <div>
              {/* DASHBOARD OVERVIEW */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FaChartBar className="text-blue-600 text-xl" />
                    </div>
                    Student Attendance Dashboard
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <FaFilter />
                      <select 
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="border-0 focus:outline-none focus:ring-0 bg-transparent"
                      >
                        <option value="all">All Classes</option>
                        {classes.map(cls => (
                          <option key={cls.id} value={cls.id}>
                            Class {cls.id}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <FaSchool />
                      <select 
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        className="border-0 focus:outline-none focus:ring-0 bg-transparent"
                      >
                        <option value="all">All Sections</option>
                        {sections.map(section => (
                          <option key={section} value={section}>
                            Section {section}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* OVERALL STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6 border border-blue-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-blue-600 font-medium">Total Students</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallStudentStats.total}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-blue-100 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <span className="text-sm text-blue-600 font-medium">100%</span>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FaUserFriends className="text-2xl text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 border border-green-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-green-600 font-medium">Present Today</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallStudentStats.present}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-green-100 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(overallStudentStats.present / overallStudentStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-green-600 font-medium">
                            {((overallStudentStats.present / overallStudentStats.total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <FaCalendarCheck className="text-2xl text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-6 border border-red-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-red-600 font-medium">Absent Today</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallStudentStats.absent}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-red-100 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${(overallStudentStats.absent / overallStudentStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-red-600 font-medium">
                            {((overallStudentStats.absent / overallStudentStats.total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-red-100 rounded-lg">
                        <FaUserInjured className="text-2xl text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-lg p-6 border border-yellow-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-yellow-600 font-medium">Sick Leave</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallStudentStats.sick}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-yellow-100 rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full" 
                              style={{ width: `${(overallStudentStats.sick / overallStudentStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-yellow-600 font-medium">
                            {((overallStudentStats.sick / overallStudentStats.total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <FaBed className="text-2xl text-yellow-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-6 border border-purple-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-purple-600 font-medium">Approved Leave</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallStudentStats.leave}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-purple-100 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{ width: `${(overallStudentStats.leave / overallStudentStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-purple-600 font-medium">
                            {((overallStudentStats.leave / overallStudentStats.total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FaCalendarTimes className="text-2xl text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ATTENDANCE PERCENTAGE CARD */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                          <FaChartBar className="text-white" />
                        </div>
                        Overall Attendance Percentage
                      </h2>
                      <p className="text-gray-600 mt-1">Current attendance rate across all classes</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-gray-800">{overallStudentStats.percentage}%</span>
                      <p className="text-sm text-gray-500">Updated: {formatTime(currentTime)}</p>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
                      <div 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full"
                        style={{ width: `${overallStudentStats.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded ${overallStudentStats.percentage < 75 ? 'bg-red-100 text-red-800' : overallStudentStats.percentage < 85 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {overallStudentStats.percentage < 75 ? 'Needs Improvement' : overallStudentStats.percentage < 85 ? 'Good' : 'Excellent'}
                      </span>
                      <div className="flex gap-4">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CLASS-WISE ATTENDANCE */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Class-wise Attendance Details</h2>
                  <p className="text-gray-600 text-sm bg-white px-3 py-2 rounded-lg shadow-sm">
                    Click on View Details to see student list for each class
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(filteredStudentData).map(([className, data]) => (
                    <div key={className} className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-gray-800 text-xl">{className}</h3>
                          <p className="text-sm text-gray-600">Total: {data.total} students</p>
                        </div>
                        <div className={`px-4 py-2 rounded-lg ${data.percentage >= 90 ? 'bg-green-100 text-green-800' : data.percentage >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          <span className="font-bold text-lg">{data.percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">Present</span>
                          </div>
                          <span className="font-bold text-green-700 text-lg">{data.present}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-gray-700">Absent</span>
                          </div>
                          <span className="font-bold text-red-700 text-lg">{data.absent}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-700">Sick</span>
                          </div>
                          <span className="font-bold text-yellow-700 text-lg">{data.sick}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">Leave</span>
                          </div>
                          <span className="font-bold text-blue-700 text-lg">{data.leave}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setShowClassDetails(className)}
                        className="w-full mt-4 py-3 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                      >
                        <FaClipboardList />
                        View Details
                        <FaChevronRight className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CLASS DETAILS MODAL */}
              {showClassDetails && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                  <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
                  
                  <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white rounded-t-2xl flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold">
                          Class {showClassDetails} - Student Details
                        </h2>
                        <p className="text-blue-200 mt-1">Total {studentAttendanceData[showClassDetails]?.total} students</p>
                      </div>
                      <button onClick={() => setShowClassDetails(null)} className="text-white text-3xl hover:text-gray-200 transition-colors">×</button>
                    </div>
                    
                    <div className="p-8">
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FaChartBar className="text-blue-600" />
                          </div>
                          Attendance Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Present</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{studentAttendanceData[showClassDetails]?.present || 0}</p>
                              </div>
                              <div className="p-3 bg-green-100 rounded-lg">
                                <FaCalendarCheck className="text-xl text-green-600" />
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-red-50 to-white p-5 rounded-xl border border-red-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Absent</p>
                                <p className="text-3xl font-bold text-red-600 mt-2">{studentAttendanceData[showClassDetails]?.absent || 0}</p>
                              </div>
                              <div className="p-3 bg-red-100 rounded-lg">
                                <FaUserInjured className="text-xl text-red-600" />
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-yellow-50 to-white p-5 rounded-xl border border-yellow-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Sick</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">{studentAttendanceData[showClassDetails]?.sick || 0}</p>
                              </div>
                              <div className="p-3 bg-yellow-100 rounded-lg">
                                <FaBed className="text-xl text-yellow-600" />
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Leave</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{studentAttendanceData[showClassDetails]?.leave || 0}</p>
                              </div>
                              <div className="p-3 bg-blue-100 rounded-lg">
                                <FaCalendarTimes className="text-xl text-blue-600" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FaUserFriends className="text-blue-600" />
                          </div>
                          Student List ({studentAttendanceData[showClassDetails]?.students?.length || 0} Students)
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Roll No</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {studentAttendanceData[showClassDetails]?.students?.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4">
                                    <span className="font-bold text-gray-800 text-lg">#{student.rollNo}</span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center">
                                      <div className="ml-4">
                                        <p className="font-semibold text-gray-900">{student.name}</p>
                                        <p className="text-sm text-gray-500">ID: {student.id}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(student.status)}`}>
                                      {getStatusText(student.status)}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <button 
                                      onClick={() => {
                                        const foundStudent = studentsData.find(s => s.id === student.id);
                                        if (foundStudent) setSelectedStudent(foundStudent);
                                      }}
                                      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                      <FaEye />
                                      View Profile
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ABSENT STUDENTS LIST */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <FaUserInjured className="text-2xl" />
                        </div>
                        Today's Absent Students
                      </h2>
                      <div className="text-red-100 text-sm mt-2">
                        Total: {overallStudentStats.absent + overallStudentStats.sick + overallStudentStats.leave} students
                      </div>
                    </div>
                    <div className="text-white">
                      <span className="text-3xl font-bold">{overallStudentStats.absent + overallStudentStats.sick + overallStudentStats.leave}</span>
                      <p className="text-red-100 text-sm">Students Not Present</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Student</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Class & Section</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {studentsData.map((student) => (
                          <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img src={student.profilePhoto} alt={student.name} className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200" />
                                <div>
                                  <p className="font-semibold text-gray-900">{student.name}</p>
                                  <p className="text-sm text-gray-500">ID: {student.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {student.class}-{student.section}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                                Absent
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">{student.phone}</p>
                                <p className="text-xs text-gray-500">Emergency: {student.emergency}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => setSelectedStudent(student)}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                <FaEye />
                                View Profile
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAFF ATTENDANCE TAB */}
          {activeTab === 'staff' && (
            <div>
              {/* DASHBOARD OVERVIEW */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FaChartBar className="text-purple-600 text-xl" />
                    </div>
                    Staff Attendance Dashboard
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm">
                      <FaFilter />
                      <select 
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="border-0 focus:outline-none focus:ring-0 bg-transparent"
                      >
                        <option value="all">All Departments</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* OVERALL STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-6 border border-purple-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-purple-600 font-medium">Total Staff</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallTeacherStats.total}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-purple-100 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <span className="text-sm text-purple-600 font-medium">100%</span>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FaChalkboardTeacher className="text-2xl text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 border border-green-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-green-600 font-medium">Present Today</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallTeacherStats.present}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-green-100 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(overallTeacherStats.present / overallTeacherStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-green-600 font-medium">
                            {overallTeacherStats.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <FaCalendarCheck className="text-2xl text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-6 border border-red-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-red-600 font-medium">Absent Today</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallTeacherStats.absent}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-red-100 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${(overallTeacherStats.absent / overallTeacherStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-red-600 font-medium">
                            {((overallTeacherStats.absent / overallTeacherStats.total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-red-100 rounded-lg">
                        <FaUserInjured className="text-2xl text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg p-6 border border-orange-100 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-orange-600 font-medium">On Leave</p>
                        <h3 className="text-4xl font-bold text-gray-800 mt-2">{overallTeacherStats.leave}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-full bg-orange-100 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${(overallTeacherStats.leave / overallTeacherStats.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-orange-600 font-medium">
                            {((overallTeacherStats.leave / overallTeacherStats.total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <FaCalendarTimes className="text-2xl text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ATTENDANCE PERCENTAGE CARD */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                          <FaChartBar className="text-white" />
                        </div>
                        Overall Staff Attendance Percentage
                      </h2>
                      <p className="text-gray-600 mt-1">Current attendance rate across all departments</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-gray-800">{overallTeacherStats.percentage}%</span>
                      <p className="text-sm text-gray-500">Updated: {formatTime(currentTime)}</p>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
                      <div 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full"
                        style={{ width: `${overallTeacherStats.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded ${overallTeacherStats.percentage < 75 ? 'bg-red-100 text-red-800' : overallTeacherStats.percentage < 85 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {overallTeacherStats.percentage < 75 ? 'Needs Improvement' : overallTeacherStats.percentage < 85 ? 'Good' : 'Excellent'}
                      </span>
                      <div className="flex gap-4">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DEPARTMENT-WISE ATTENDANCE */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Department-wise Attendance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(filteredTeacherData).map(([deptId, data]) => {
                    const dept = departments.find(d => d.id === deptId);
                    return (
                      <div key={deptId} className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-gray-800 text-xl">{dept?.name}</h3>
                            <p className="text-sm text-gray-600">Total: {data.total} teachers</p>
                          </div>
                          <div className={`px-4 py-2 rounded-lg ${data.percentage >= 90 ? 'bg-green-100 text-green-800' : data.percentage >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            <span className="font-bold text-lg">{data.percentage}%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-gray-700">Present</span>
                            </div>
                            <span className="font-bold text-green-700 text-lg">{data.present}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-gray-700">Absent</span>
                            </div>
                            <span className="font-bold text-red-700 text-lg">{data.absent || 0}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700">On Leave</span>
                            </div>
                            <span className="font-bold text-blue-700 text-lg">{data.leave || 0}</span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setSelectedDepartment(deptId);
                          }}
                          className="w-full mt-4 py-3 text-sm font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                        >
                          <FaBook />
                          View Department
                          <FaChevronRight className="text-xs" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ABSENT TEACHERS LIST */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <FaCalendarTimes className="text-2xl" />
                        </div>
                        Today's Absent Staff
                      </h2>
                      <div className="text-orange-100 text-sm mt-2">
                        Total: {overallTeacherStats.absent + overallTeacherStats.leave} staff members
                      </div>
                    </div>
                    <div className="text-white">
                      <span className="text-3xl font-bold">{overallTeacherStats.absent + overallTeacherStats.leave}</span>
                      <p className="text-orange-100 text-sm">Staff Not Present</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Teacher</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Leave Balance</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {teachersData.map((teacher) => (
                          <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img src={teacher.profilePhoto} alt={teacher.name} className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200" />
                                <div>
                                  <p className="font-semibold text-gray-900">{teacher.name}</p>
                                  <p className="text-sm text-gray-500">ID: {teacher.teacherId}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                {teacher.department}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-center">
                                <span className="text-2xl font-bold text-blue-600">{teacher.leaveBalance}</span>
                                <p className="text-xs text-gray-500">Days Left</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {teacher.currentLeave ? (
                                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                                  On Leave ({teacher.currentLeave.type})
                                </span>
                              ) : (
                                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                  Present
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => setSelectedTeacher(teacher)}
                                className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                              >
                                <FaEye />
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <Footer />
      </div>

      {/* STUDENT DETAIL MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Blurred background */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
          
          <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-200">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaUserGraduate />
                  </div>
                  Student Profile & Attendance Details
                </h2>
                <p className="text-blue-200 text-sm mt-1">Complete student information and attendance history</p>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-white text-3xl hover:text-gray-200 transition-colors">×</button>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={selectedStudent.profilePhoto}
                      className="w-56 h-56 rounded-2xl border-4 border-white shadow-xl"
                      alt={selectedStudent.name}
                    />
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      ID: {selectedStudent.id}
                    </div>
                  </div>
                  <div className="mt-10 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h3>
                    <p className="text-gray-600 mt-1">Class {selectedStudent.class}-{selectedStudent.section}</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Absent Today
                      </span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Roll: {selectedStudent.rollNo}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-4 flex items-center gap-3 text-lg">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FaIdCard className="text-blue-600" />
                        </div>
                        Personal Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Father's Name</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedStudent.father}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Mother's Name</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedStudent.mother}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Aadhar ID</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedStudent.aadharId}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-4 flex items-center gap-3 text-lg">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FaPhone className="text-blue-600" />
                        </div>
                        Contact Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Parent's Phone</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedStudent.phone}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedStudent.emergency}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 flex items-center gap-2">
                            <FaHome />
                            Address
                          </label>
                          <p className="font-semibold text-gray-800 text-sm mt-1">{selectedStudent.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* ATTENDANCE STATS */}
                  <div className="mt-6 bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-200">
                    <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-3 text-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FaChartBar className="text-green-600" />
                      </div>
                      Attendance Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-green-100 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">{selectedStudent.attendance.present}</div>
                        <div className="text-sm text-gray-600 mt-1">Days Present</div>
                      </div>
                      <div className="text-center p-4 bg-red-100 rounded-lg">
                        <div className="text-3xl font-bold text-red-600">{selectedStudent.attendance.absent}</div>
                        <div className="text-sm text-gray-600 mt-1">Days Absent</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-100 rounded-lg">
                        <div className="text-3xl font-bold text-yellow-600">{selectedStudent.attendance.sick}</div>
                        <div className="text-sm text-gray-600 mt-1">Days Sick</div>
                      </div>
                      <div className="text-center p-4 bg-blue-100 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{selectedStudent.attendance.leave}</div>
                        <div className="text-sm text-gray-600 mt-1">Days Leave</div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="font-medium">Attendance Percentage</span>
                        <span className="font-bold">{selectedStudent.attendance.percentage}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                          style={{ width: `${selectedStudent.attendance.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* LEAVE HISTORY */}
              <div className="bg-white rounded-xl shadow border border-gray-200">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex items-center justify-between rounded-t-xl">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <FaHistory className="text-gray-600" />
                    </div>
                    Leave History
                  </h4>
                  <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">Total Leaves: {selectedStudent.leaveHistory.length}</span>
                </div>
                <div className="p-6">
                  {selectedStudent.leaveHistory.length > 0 ? (
                    <div className="space-y-4">
                      {selectedStudent.leaveHistory.map((leave, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div>
                            <p className="font-medium text-gray-800 text-lg">{leave.reason}</p>
                            <p className="text-sm text-gray-600 mt-1">{leave.date}</p>
                          </div>
                          <span className={`px-4 py-2 text-sm rounded-full font-medium ${leave.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {leave.approved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No leave history available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEACHER DETAIL MODAL */}
      {selectedTeacher && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Blurred background */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>
          
          <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-200">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 text-white rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FaChalkboardTeacher />
                  </div>
                  Teacher Profile & Attendance Details
                </h2>
                <p className="text-purple-200 text-sm mt-1">Complete teacher information and attendance history</p>
              </div>
              <button onClick={() => setSelectedTeacher(null)} className="text-white text-3xl hover:text-gray-200 transition-colors">×</button>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={selectedTeacher.profilePhoto}
                      className="w-56 h-56 rounded-2xl border-4 border-white shadow-xl"
                      alt={selectedTeacher.name}
                    />
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      ID: {selectedTeacher.teacherId}
                    </div>
                  </div>
                  <div className="mt-10 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">{selectedTeacher.name}</h3>
                    <p className="text-gray-600 mt-1">{selectedTeacher.department} Department</p>
                    <div className="mt-4">
                      <span className="px-6 py-3 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 rounded-full text-sm font-medium flex items-center gap-2 justify-center">
                        <FaCalendarTimes />
                        ON LEAVE
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-4 flex items-center gap-3 text-lg">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FaIdCard className="text-purple-600" />
                        </div>
                        Professional Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Teacher ID</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.teacherId}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Department</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.department}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Subject</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.subject}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Aadhar ID</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.aadharId}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-4 flex items-center gap-3 text-lg">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FaPhone className="text-purple-600" />
                        </div>
                        Contact & Leave Info
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.phone}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.emergency}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Leave Balance</label>
                          <p className="text-3xl font-bold text-blue-600 mt-1">{selectedTeacher.leaveBalance} days</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 flex items-center gap-2">
                            <FaHome />
                            Address
                          </label>
                          <p className="font-semibold text-gray-800 text-sm mt-1">{selectedTeacher.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* ATTENDANCE STATS */}
                  <div className="mt-6 bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-200">
                    <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-3 text-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FaChartBar className="text-green-600" />
                      </div>
                      Attendance Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-green-100 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">{selectedTeacher.attendance.present}</div>
                        <div className="text-sm text-gray-600 mt-1">Days Present</div>
                      </div>
                      <div className="text-center p-4 bg-red-100 rounded-lg">
                        <div className="text-3xl font-bold text-red-600">{selectedTeacher.attendance.absent}</div>
                        <div className="text-sm text-gray-600 mt-1">Days Absent</div>
                      </div>
                      <div className="text-center p-4 bg-blue-100 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{selectedTeacher.attendance.percentage}%</div>
                        <div className="text-sm text-gray-600 mt-1">Attendance Rate</div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="font-medium">Attendance Percentage</span>
                        <span className="font-bold">{selectedTeacher.attendance.percentage}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                          style={{ width: `${selectedTeacher.attendance.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CURRENT LEAVE & HISTORY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CURRENT LEAVE */}
                <div className="bg-white rounded-xl shadow border border-gray-200">
                  <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200 rounded-t-xl">
                    <h4 className="font-semibold text-orange-700 flex items-center gap-3 text-lg">
                      <div className="p-2 bg-orange-200 rounded-lg">
                        <FaCalendarTimes className="text-orange-600" />
                      </div>
                      Current Leave Status
                    </h4>
                  </div>
                  <div className="p-6">
                    {selectedTeacher.currentLeave ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Leave Type</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.currentLeave.type}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Reason</label>
                          <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.currentLeave.reason}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500">From</label>
                            <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.currentLeave.from}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500">To</label>
                            <p className="font-semibold text-gray-800 text-lg mt-1">{selectedTeacher.currentLeave.to}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No current leave</p>
                    )}
                  </div>
                </div>
                
                {/* LEAVE HISTORY */}
                <div className="bg-white rounded-xl shadow border border-gray-200">
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 rounded-t-xl flex items-center justify-between">
                    <h4 className="font-semibold text-gray-700 flex items-center gap-3 text-lg">
                      <div className="p-2 bg-gray-200 rounded-lg">
                        <FaHistory className="text-gray-600" />
                      </div>
                      Leave History
                    </h4>
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">Total: {selectedTeacher.leaveHistory.length}</span>
                  </div>
                  <div className="p-6">
                    {selectedTeacher.leaveHistory.length > 0 ? (
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {selectedTeacher.leaveHistory.map((leave, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800 text-lg">{leave.reason}</p>
                                <p className="text-sm text-gray-600 mt-1">{leave.date} • {leave.days} days</p>
                              </div>
                              <span className={`px-3 py-1 text-sm rounded-full font-medium ${leave.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {leave.approved ? 'Approved' : 'Pending'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No leave history available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;