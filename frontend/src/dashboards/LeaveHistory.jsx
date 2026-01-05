import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BackButton from "../components/BackButton";

import { 
  Search, Calendar, Clock, User, Phone, Mail, MapPin,
  BookOpen, Home, Award, Shield, CheckCircle, XCircle,
  Download, Filter, ChevronDown, ChevronUp, Eye,
  Printer, FileText, History, School, Hash, Users,
  TrendingUp, BarChart, PieChart, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// Mock leave history data
const LEAVE_HISTORY_DATA = [
  {
    id: 'GP2025-0115-001',
    studentId: 1,
    studentName: 'Lithish',
    class: '6',
    section: 'A',
    rollNo: '101',
    guardianName: 'Kannani',
    contact: '+91 98765 43210',
    purpose: 'Medical Leave',
    departureDate: '2025-01-15',
    departureTime: '10:30 AM',
    returnDate: '2025-01-16',
    returnTime: '05:00 PM',
    status: 'completed',
    issuedBy: 'saranya',
    issuedDate: '2025-01-14',
    issuedTime: '11:02:39 PM',
    gatePassPrinted: true,
    notes: 'Fever and doctor appointment'
  },
  {
    id: 'GP2025-0203-002',
    studentId: 1,
    studentName: 'Lithish',
    class: '6',
    section: 'A',
    rollNo: '101',
    guardianName: 'Kannani',
    contact: '+91 98765 43210',
    purpose: 'Family Function',
    departureDate: '2025-02-03',
    departureTime: '02:00 PM',
    returnDate: '2025-02-05',
    returnTime: '06:00 PM',
    status: 'completed',
    issuedBy: 'saranya',
    issuedDate: '2025-02-02',
    issuedTime: '10:15:22 AM',
    gatePassPrinted: true,
    notes: 'Cousin wedding'
  },
  {
    id: 'GP2025-0310-003',
    studentId: 1,
    studentName: 'Lithish',
    class: '6',
    section: 'A',
    rollNo: '101',
    guardianName: 'Mr. Kannani',
    contact: '+91 98765 43210',
    purpose: 'Emergency',
    departureDate: '2025-03-10',
    departureTime: '11:00 AM',
    returnDate: '2025-03-11',
    returnTime: '04:30 PM',
    status: 'completed',
    issuedBy: 'saranya',
    issuedDate: '2025-03-10',
    issuedTime: '09:45:10 AM',
    gatePassPrinted: true,
    notes: 'Family emergency'
  },
  {
    id: 'GP2025-0412-004',
    studentId: 2,
    studentName: 'Priya Sharma',
    class: '9',
    section: 'B',
    rollNo: '205',
    guardianName: 'Mrs. Sharma',
    contact: '+91 98765 43211',
    purpose: 'Medical Leave',
    departureDate: '2025-04-12',
    departureTime: '09:00 AM',
    returnDate: '2025-04-13',
    returnTime: '05:00 PM',
    status: 'completed',
    issuedBy: 'saranya',
    issuedDate: '2025-04-11',
    issuedTime: '03:20:15 PM',
    gatePassPrinted: true,
    notes: 'Dental appointment'
  },
  {
    id: 'GP2025-0518-005',
    studentId: 2,
    studentName: 'Priya Sharma',
    class: '9',
    section: 'B',
    rollNo: '205',
    guardianName: 'Mrs. Sharma',
    contact: '+91 98765 43211',
    purpose: 'Vacation',
    departureDate: '2025-05-18',
    departureTime: '03:00 PM',
    returnDate: '2025-05-25',
    returnTime: '06:00 PM',
    status: 'completed',
    issuedBy: 'saranya',
    issuedDate: '2025-05-17',
    issuedTime: '11:30:45 AM',
    gatePassPrinted: true,
    notes: 'Summer vacation trip'
  },
  {
    id: 'GP2025-0605-006',
    studentId: 3,
    studentName: 'Amit Patel',
    class: '11',
    section: 'C',
    rollNo: '312',
    guardianName: 'Mr. Patel',
    contact: '+91 98765 43212',
    purpose: 'Personal Reason',
    departureDate: '2025-06-05',
    departureTime: '04:00 PM',
    returnDate: '2025-06-06',
    returnTime: '05:30 PM',
    status: 'completed',
    issuedBy: 'saranya',
    issuedDate: '2025-06-05',
    issuedTime: '02:15:30 PM',
    gatePassPrinted: true,
    notes: 'Personal work'
  },
  {
    id: 'GP2025-0710-007',
    studentId: 3,
    studentName: 'Amit Patel',
    class: '11',
    section: 'C',
    rollNo: '312',
    guardianName: 'Mr. Patel',
    contact: '+91 98765 43212',
    purpose: 'Family Function',
    departureDate: '2025-07-10',
    departureTime: '10:00 AM',
    returnDate: '2025-07-12',
    returnTime: '06:00 PM',
    status: 'completed',
    issuedBy: 'saranya',
    issuedDate: '2025-07-09',
    issuedTime: '04:45:20 PM',
    gatePassPrinted: true,
    notes: 'Brother engagement'
  },
  {
    id: 'GP2025-0815-008',
    studentId: 1,
    studentName: 'Lithish',
    class: '6',
    section: 'A',
    rollNo: '101',
    guardianName: 'Kannani',
    contact: '+91 98765 43210',
    purpose: 'Medical Leave',
    departureDate: '2025-08-15',
    departureTime: '11:00 AM',
    returnDate: '2025-08-16',
    returnTime: '04:00 PM',
    status: 'completed',
    issuedBy: 'saranya',
    issuedDate: '2025-08-14',
    issuedTime: '10:30:15 AM',
    gatePassPrinted: true,
    notes: 'Eye checkup'
  },
  {
    id: 'GP2025-0912-009',
    studentId: 2,
    studentName: 'Priya Sharma',
    class: '9',
    section: 'B',
    rollNo: '205',
    guardianName: 'Mrs. Sharma',
    contact: '+91 98765 43211',
    purpose: 'Medical Leave',
    departureDate: '2025-09-12',
    departureTime: '09:30 AM',
    returnDate: '2025-09-13',
    returnTime: '05:30 PM',
    status: 'active',
    issuedBy: 'saranya',
    issuedDate: '2025-09-11',
    issuedTime: '03:15:45 PM',
    gatePassPrinted: true,
    notes: 'Fever'
  },
  {
    id: 'GP2025-1020-010',
    studentId: 3,
    studentName: 'Amit Patel',
    class: '11',
    section: 'C',
    rollNo: '312',
    guardianName: 'Mr. Patel',
    contact: '+91 98765 43212',
    purpose: 'Vacation',
    departureDate: '2025-10-20',
    departureTime: '02:00 PM',
    returnDate: '2025-10-27',
    returnTime: '06:00 PM',
    status: 'upcoming',
    issuedBy: 'saranya',
    issuedDate: '2025-10-19',
    issuedTime: '11:20:30 AM',
    gatePassPrinted: false,
    notes: 'Diwali vacation'
  },
];

// Student complete information
const STUDENT_COMPLETE_DATA = [
  {
    id: 1,
    name: 'Lithish',
    admissionNo: '2024001',
    class: '6',
    section: 'A',
    rollNo: '101',
    photo: 'https://randomuser.me/api/portraits/boys/32.jpg',
    dob: '2013-05-15',
    age: '12',
    gender: 'Male',
    bloodGroup: 'O+',
    religion: 'Hindu',
    nationality: 'Indian',
    
    // Parent Information
    fatherName: 'Kannani',
    fatherOccupation: 'Software Engineer',
    fatherContact: '+91 98765 43210',
    fatherEmail: 'kannani.father@email.com',
    fatherAadhar: '1234 5678 9012',
    
    motherName: 'Lakshmi',
    motherOccupation: 'Teacher',
    motherContact: '+91 98765 43213',
    motherEmail: 'lakshmi.mother@email.com',
    motherAadhar: '2345 6789 0123',
    
    // Contact Information
    primaryContact: '+91 98765 43210',
    secondaryContact: '+91 98765 43213',
    email: 'lithish.student@school.edu.in',
    emergencyContact: '+91 98765 43214',
    
    // Address Information
    address: '123 Gandhi Nagar, Chennai, Tamil Nadu - 600001',
    permanentAddress: '123 Gandhi Nagar, Chennai, Tamil Nadu - 600001',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600001',
    
    // School Information
    dateOfJoining: '2020-06-01',
    academicYear: '2025-2026',
    hostelWing: 'North Wing',
    roomNo: '201',
    house: 'Unity House',
    busRoute: 'Route A - Stop 3',
    
    // Medical Information
    medicalHistory: 'No major illness',
    allergies: 'None',
    doctorName: 'Dr. Ramesh',
    doctorContact: '+91 98765 43215',
    insuranceProvider: 'ABC Insurance',
    insurancePolicyNo: 'INS2024001',
    
    // Academic Information
    lastYearPercentage: '92%',
    attendancePercentage: '96%',
    disciplinaryRecord: 'Good',
    achievements: '1st in Science Fair 2024',
    
    totalLeaves: 4,
    leavesCompleted: 4,
    leavesUpcoming: 0,
    leavesActive: 0
  },
  {
    id: 2,
    name: 'Priya Sharma',
    admissionNo: '2024002',
    class: '9',
    section: 'B',
    rollNo: '205',
    photo: 'https://randomuser.me/api/portraits/girls/44.jpg',
    dob: '2010-08-22',
    age: '14',
    gender: 'Female',
    bloodGroup: 'A+',
    religion: 'Hindu',
    nationality: 'Indian',
    
    // Parent Information
    fatherName: 'Mr. Sharma',
    fatherOccupation: 'Businessman',
    fatherContact: '+91 98765 43216',
    fatherEmail: 'sharma.father@email.com',
    fatherAadhar: '3456 7890 1234',
    
    motherName: 'Mrs. Sharma',
    motherOccupation: 'Doctor',
    motherContact: '+91 98765 43211',
    motherEmail: 'sharma.mother@email.com',
    motherAadhar: '4567 8901 2345',
    
    // Contact Information
    primaryContact: '+91 98765 43211',
    secondaryContact: '+91 98765 43216',
    email: 'priya.student@school.edu.in',
    emergencyContact: '+91 98765 43217',
    
    // Address Information
    address: '456 Park Street, Mumbai, Maharashtra - 400001',
    permanentAddress: '456 Park Street, Mumbai, Maharashtra - 400001',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    
    // School Information
    dateOfJoining: '2021-06-15',
    academicYear: '2025-2026',
    hostelWing: 'South Wing',
    roomNo: '105',
    house: 'Peace House',
    busRoute: 'Route B - Stop 5',
    
    // Medical Information
    medicalHistory: 'Asthma',
    allergies: 'Dust Allergy',
    doctorName: 'Dr. Mehta',
    doctorContact: '+91 98765 43218',
    insuranceProvider: 'XYZ Insurance',
    insurancePolicyNo: 'INS2024002',
    
    // Academic Information
    lastYearPercentage: '88%',
    attendancePercentage: '94%',
    disciplinaryRecord: 'Excellent',
    achievements: '2nd in State Math Olympiad',
    
    totalLeaves: 3,
    leavesCompleted: 2,
    leavesUpcoming: 0,
    leavesActive: 1
  },
  {
    id: 3,
    name: 'Amit Patel',
    admissionNo: '2024003',
    class: '11',
    section: 'C',
    rollNo: '312',
    photo: 'https://randomuser.me/api/portraits/boys/67.jpg',
    dob: '2008-03-10',
    age: '16',
    gender: 'Male',
    bloodGroup: 'B+',
    religion: 'Hindu',
    nationality: 'Indian',
    
    // Parent Information
    fatherName: 'Mr. Patel',
    fatherOccupation: 'CA',
    fatherContact: '+91 98765 43212',
    fatherEmail: 'patel.father@email.com',
    fatherAadhar: '5678 9012 3456',
    
    motherName: 'Mrs. Patel',
    motherOccupation: 'Homemaker',
    motherContact: '+91 98765 43219',
    motherEmail: 'patel.mother@email.com',
    motherAadhar: '6789 0123 4567',
    
    // Contact Information
    primaryContact: '+91 98765 43212',
    secondaryContact: '+91 98765 43219',
    email: 'amit.student@school.edu.in',
    emergencyContact: '+91 98765 43220',
    
    // Address Information
    address: '789 Nehru Road, Delhi - 110001',
    permanentAddress: '789 Nehru Road, Delhi - 110001',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    
    // School Information
    dateOfJoining: '2019-06-10',
    academicYear: '2025-2026',
    hostelWing: 'East Wing',
    roomNo: '308',
    house: 'Progress House',
    busRoute: 'Route C - Stop 2',
    
    // Medical Information
    medicalHistory: 'No major illness',
    allergies: 'None',
    doctorName: 'Dr. Verma',
    doctorContact: '+91 98765 43221',
    insuranceProvider: 'PQR Insurance',
    insurancePolicyNo: 'INS2024003',
    
    // Academic Information
    lastYearPercentage: '95%',
    attendancePercentage: '98%',
    disciplinaryRecord: 'Very Good',
    achievements: 'School Cricket Captain',
    
    totalLeaves: 3,
    leavesCompleted: 2,
    leavesUpcoming: 1,
    leavesActive: 0
  },
];

// Main Component
const StudentLeaveHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState(STUDENT_COMPLETE_DATA);
  const [filteredLeaves, setFilteredLeaves] = useState(LEAVE_HISTORY_DATA);
  const [showDetails, setShowDetails] = useState(false);
  const [showLeaveDetails, setShowLeaveDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get unique classes and sections
  const uniqueClasses = [...new Set(STUDENT_COMPLETE_DATA.map(s => s.class))].sort();
  const uniqueSections = [...new Set(STUDENT_COMPLETE_DATA.map(s => s.section))].sort();

  // Filter students
  useEffect(() => {
    let filtered = STUDENT_COMPLETE_DATA;
    
    if (selectedClass) {
      filtered = filtered.filter(s => s.class === selectedClass);
    }
    
    if (selectedSection) {
      filtered = filtered.filter(s => s.section === selectedSection);
    }
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toString().includes(searchTerm) ||
        student.admissionNo.includes(searchTerm)
      );
    }
    
    setFilteredStudents(filtered);
  }, [selectedClass, selectedSection, searchTerm]);

  // Filter leaves based on selected student and filters
  useEffect(() => {
    let filtered = LEAVE_HISTORY_DATA;
    
    if (selectedStudent) {
      filtered = filtered.filter(leave => leave.studentId === selectedStudent.id);
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(leave => {
        const leaveDate = new Date(leave.departureDate);
        switch (dateFilter) {
          case 'today':
            return leaveDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return leaveDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return leaveDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            return leaveDate >= quarterAgo;
          default:
            return true;
        }
      });
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(leave => leave.status === statusFilter);
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate));
    
    setFilteredLeaves(filtered);
  }, [selectedStudent, dateFilter, statusFilter]);

  // Handle student selection
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSelectedLeave(null);
    setShowDetails(true);
  };

  // Handle leave selection
  const handleSelectLeave = (leave) => {
    setSelectedLeave(leave);
    setShowLeaveDetails(true);
  };

  // Calculate statistics
  const calculateStats = () => {
    if (!selectedStudent) return null;
    
    const studentLeaves = LEAVE_HISTORY_DATA.filter(l => l.studentId === selectedStudent.id);
    const completedLeaves = studentLeaves.filter(l => l.status === 'completed').length;
    const activeLeaves = studentLeaves.filter(l => l.status === 'active').length;
    const upcomingLeaves = studentLeaves.filter(l => l.status === 'upcoming').length;
    const totalLeaves = studentLeaves.length;
    
    // Calculate average leave duration
    let totalDays = 0;
    studentLeaves.forEach(leave => {
      const start = new Date(leave.departureDate);
      const end = new Date(leave.returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      totalDays += diffDays;
    });
    const avgDuration = totalLeaves > 0 ? (totalDays / totalLeaves).toFixed(1) : 0;
    
    // Most common purpose
    const purposeCount = {};
    studentLeaves.forEach(leave => {
      purposeCount[leave.purpose] = (purposeCount[leave.purpose] || 0) + 1;
    });
    const mostCommonPurpose = Object.keys(purposeCount).length > 0 
      ? Object.keys(purposeCount).reduce((a, b) => purposeCount[a] > purposeCount[b] ? a : b)
      : 'N/A';
    
    return {
      totalLeaves,
      completedLeaves,
      activeLeaves,
      upcomingLeaves,
      avgDuration,
      mostCommonPurpose
    };
  };

  const stats = selectedStudent ? calculateStats() : null;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Render Student Details Modal
  const renderStudentDetails = () => {
    if (!selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={selectedStudent.photo}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-full border-4 border-blue-100"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h2>
                <p className="text-gray-600">
                  Class {selectedStudent.class} - {selectedStudent.section} | Roll No: {selectedStudent.rollNo}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XCircle className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="px-6">
              <nav className="flex space-x-8">
                {['overview', 'personal', 'academic', 'medical', 'family', 'leaves'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Leaves</p>
                          <p className="text-2xl font-bold text-gray-800">{stats?.totalLeaves || 0}</p>
                        </div>
                        <History className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Completed</p>
                          <p className="text-2xl font-bold text-gray-800">{stats?.completedLeaves || 0}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active</p>
                          <p className="text-2xl font-bold text-gray-800">{stats?.activeLeaves || 0}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-yellow-500" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Upcoming</p>
                          <p className="text-2xl font-bold text-gray-800">{stats?.upcomingLeaves || 0}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-500" />
                        Personal Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date of Birth</span>
                          <span className="font-medium">{formatDate(selectedStudent.dob)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Age</span>
                          <span className="font-medium">{selectedStudent.age} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gender</span>
                          <span className="font-medium">{selectedStudent.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Blood Group</span>
                          <span className="font-medium">{selectedStudent.bloodGroup}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Religion</span>
                          <span className="font-medium">{selectedStudent.religion}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <School className="w-5 h-5 mr-2 text-green-500" />
                        School Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Admission No</span>
                          <span className="font-medium">{selectedStudent.admissionNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date of Joining</span>
                          <span className="font-medium">{formatDate(selectedStudent.dateOfJoining)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Academic Year</span>
                          <span className="font-medium">{selectedStudent.academicYear}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hostel</span>
                          <span className="font-medium">{selectedStudent.hostelWing} - Room {selectedStudent.roomNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">House</span>
                          <span className="font-medium">{selectedStudent.house}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Leaves */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <History className="w-5 h-5 mr-2 text-purple-500" />
                      Recent Leave History
                    </h3>
                    <div className="space-y-3">
                      {filteredLeaves.slice(0, 3).map((leave) => (
                        <div
                          key={leave.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectLeave(leave)}
                        >
                          <div>
                            <div className="font-medium">{leave.purpose}</div>
                            <div className="text-sm text-gray-600">
                              {formatDate(leave.departureDate)} - {formatDate(leave.returnDate)}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              leave.status === 'completed' ? 'bg-green-100 text-green-800' :
                              leave.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {leave.status}
                            </span>
                            <Eye className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats & Contact */}
                <div className="space-y-6">
                  {/* Leave Stats */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4">Leave Statistics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Average Duration</span>
                          <span className="font-medium">{stats?.avgDuration || 0} days</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${Math.min((stats?.avgDuration || 0) * 20, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Most Common Purpose</span>
                          <span className="font-medium">{stats?.mostCommonPurpose}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-red-500" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">{selectedStudent.primaryContact}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{selectedStudent.secondaryContact}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{selectedStudent.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-red-600">Emergency: {selectedStudent.emergencyContact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                      Address
                    </h3>
                    <p className="text-sm text-gray-600">{selectedStudent.address}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InfoCard label="Full Name" value={selectedStudent.name} />
                  <InfoCard label="Admission Number" value={selectedStudent.admissionNo} />
                  <InfoCard label="Date of Birth" value={formatDate(selectedStudent.dob)} />
                  <InfoCard label="Age" value={`${selectedStudent.age} years`} />
                  <InfoCard label="Gender" value={selectedStudent.gender} />
                  <InfoCard label="Blood Group" value={selectedStudent.bloodGroup} />
                  <InfoCard label="Religion" value={selectedStudent.religion} />
                  <InfoCard label="Nationality" value={selectedStudent.nationality} />
                  <InfoCard label="Academic Year" value={selectedStudent.academicYear} />
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">Address Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Current Address</h4>
                      <p className="text-gray-600">{selectedStudent.address}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedStudent.city}, {selectedStudent.state} - {selectedStudent.pincode}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Permanent Address</h4>
                      <p className="text-gray-600">{selectedStudent.permanentAddress || selectedStudent.address}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedStudent.city}, {selectedStudent.state} - {selectedStudent.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InfoCard label="Class" value={selectedStudent.class} />
                  <InfoCard label="Section" value={selectedStudent.section} />
                  <InfoCard label="Roll Number" value={selectedStudent.rollNo} />
                  <InfoCard label="Date of Joining" value={formatDate(selectedStudent.dateOfJoining)} />
                  <InfoCard label="Academic Year" value={selectedStudent.academicYear} />
                  <InfoCard label="Hostel Wing" value={selectedStudent.hostelWing} />
                  <InfoCard label="Room Number" value={selectedStudent.roomNo} />
                  <InfoCard label="House" value={selectedStudent.house} />
                  <InfoCard label="Bus Route" value={selectedStudent.busRoute} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4">Academic Performance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last Year Percentage</span>
                        <span className="font-bold text-green-600">{selectedStudent.lastYearPercentage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Attendance Percentage</span>
                        <span className="font-bold text-blue-600">{selectedStudent.attendancePercentage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Disciplinary Record</span>
                        <span className={`font-medium ${
                          selectedStudent.disciplinaryRecord === 'Excellent' ? 'text-green-600' :
                          selectedStudent.disciplinaryRecord === 'Good' ? 'text-blue-600' :
                          'text-yellow-600'
                        }`}>
                          {selectedStudent.disciplinaryRecord}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4">Achievements</h3>
                    <div className="space-y-2">
                      {selectedStudent.achievements.split('|').map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <Award className="w-4 h-4 text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{achievement.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'medical' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4">Medical Information</h3>
                    <div className="space-y-4">
                      <InfoCard label="Blood Group" value={selectedStudent.bloodGroup} />
                      <div>
                        <label className="text-sm font-medium text-gray-700">Medical History</label>
                        <p className="text-gray-600 mt-1">{selectedStudent.medicalHistory}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Allergies</label>
                        <p className="text-gray-600 mt-1">{selectedStudent.allergies}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4">Doctor & Insurance</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Doctor Name</label>
                        <p className="text-gray-600 mt-1">{selectedStudent.doctorName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Doctor Contact</label>
                        <p className="text-gray-600 mt-1">{selectedStudent.doctorContact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Insurance Provider</label>
                        <p className="text-gray-600 mt-1">{selectedStudent.insuranceProvider}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Insurance Policy No</label>
                        <p className="text-gray-600 mt-1">{selectedStudent.insurancePolicyNo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'family' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-500" />
                      Father's Information
                    </h3>
                    <div className="space-y-3">
                      <InfoCard label="Name" value={selectedStudent.fatherName} />
                      <InfoCard label="Occupation" value={selectedStudent.fatherOccupation} />
                      <InfoCard label="Contact Number" value={selectedStudent.fatherContact} />
                      <InfoCard label="Email" value={selectedStudent.fatherEmail} />
                      <InfoCard label="Aadhar Number" value={selectedStudent.fatherAadhar} />
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-pink-500" />
                      Mother's Information
                    </h3>
                    <div className="space-y-3">
                      <InfoCard label="Name" value={selectedStudent.motherName} />
                      <InfoCard label="Occupation" value={selectedStudent.motherOccupation} />
                      <InfoCard label="Contact Number" value={selectedStudent.motherContact} />
                      <InfoCard label="Email" value={selectedStudent.motherEmail} />
                      <InfoCard label="Aadhar Number" value={selectedStudent.motherAadhar} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'leaves' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave History</h3>
                  
                  {/* Filters */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">Last 3 Months</option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="active">Active</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>

                  {/* Leave List */}
                  <div className="space-y-4">
                    {filteredLeaves.length > 0 ? (
                      filteredLeaves.map((leave) => (
                        <div
                          key={leave.id}
                          className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handleSelectLeave(leave)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center space-x-3">
                                <h4 className="font-semibold text-lg text-gray-800">{leave.purpose}</h4>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  leave.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  leave.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {leave.status}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {formatDate(leave.departureDate)} - {formatDate(leave.returnDate)}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {leave.departureTime} to {leave.returnTime}
                                </span>
                                <span>Guardian: {leave.guardianName}</span>
                              </div>
                              {leave.notes && (
                                <p className="text-sm text-gray-600 mt-2">{leave.notes}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Pass ID: {leave.id}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Issued on {formatDate(leave.issuedDate)} at {leave.issuedTime}
                              </div>
                              <div className="mt-2">
                                <span className={`px-3 py-1 text-xs rounded-full ${
                                  leave.gatePassPrinted 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {leave.gatePassPrinted ? 'Gate Pass Printed' : 'Pending Print'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No leave records found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Last Updated:</span>
              <span className="text-sm font-medium">{formatDate(new Date().toISOString())}</span>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Printer className="w-4 h-4" />
                <span>Print Profile</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Leave Details Modal
  const renderLeaveDetails = () => {
    if (!selectedLeave) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full">
          {/* Header */}
          <Header/>
          <div className="border-b border-gray-200 p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedLeave.purpose}</h2>
              <p className="text-gray-600">Gate Pass ID: {selectedLeave.id}</p>
            </div>
            <button
              onClick={() => setShowLeaveDetails(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <XCircle className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Student Information</h3>
                  <div className="space-y-2">
                    <InfoRow label="Name" value={selectedLeave.studentName} />
                    <InfoRow label="Class" value={`${selectedLeave.class} - ${selectedLeave.section}`} />
                    <InfoRow label="Roll Number" value={selectedLeave.rollNo} />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Leave Details</h3>
                  <div className="space-y-2">
                    <InfoRow label="Purpose" value={selectedLeave.purpose} />
                    <InfoRow label="Status" value={
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedLeave.status === 'completed' ? 'bg-green-100 text-green-800' :
                        selectedLeave.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedLeave.status}
                      </span>
                    } />
                    <InfoRow label="Gate Pass" value={
                      selectedLeave.gatePassPrinted ? (
                        <span className="text-green-600 font-medium">Printed ✓</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Pending Print</span>
                      )
                    } />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Dates & Times</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Departure</h4>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{formatDate(selectedLeave.departureDate)}</span>
                        <span className="text-gray-600">{selectedLeave.departureTime}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Return</h4>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{formatDate(selectedLeave.returnDate)}</span>
                        <span className="text-gray-600">{selectedLeave.returnTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Guardian Information</h3>
                  <div className="space-y-2">
                    <InfoRow label="Name" value={selectedLeave.guardianName} />
                    <InfoRow label="Contact" value={selectedLeave.contact} />
                    <InfoRow label="Issued By" value={selectedLeave.issuedBy} />
                    <InfoRow label="Issued On" value={`${formatDate(selectedLeave.issuedDate)} at ${selectedLeave.issuedTime}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedLeave.notes && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Additional Notes</h3>
                <p className="text-yellow-700">{selectedLeave.notes}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              View Gate Pass
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Reprint Gate Pass
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Helper Components
  const InfoCard = ({ label, value }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <BackButton to="/staff/dashboard" />
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Leave History</h1>
          <p className="text-gray-600">Track and manage student leave records with detailed analytics</p>
        </header>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Class Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <School className="inline w-4 h-4 mr-2" />
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Classes</option>
                {uniqueClasses.map(cls => (
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
            </div>

            {/* Section Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2" />
                Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sections</option>
                {uniqueSections.map(sec => (
                  <option key={sec} value={sec}>Section {sec}</option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline w-4 h-4 mr-2" />
                Search Student
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, roll number, or admission number..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Total Students</p>
                <p className="text-3xl font-bold mt-2">{STUDENT_COMPLETE_DATA.length}</p>
              </div>
              <Users className="w-12 h-12 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Total Leaves</p>
                <p className="text-3xl font-bold mt-2">{LEAVE_HISTORY_DATA.length}</p>
              </div>
              <History className="w-12 h-12 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Active Leaves</p>
                <p className="text-3xl font-bold mt-2">
                  {LEAVE_HISTORY_DATA.filter(l => l.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">Upcoming Leaves</p>
                <p className="text-3xl font-bold mt-2">
                  {LEAVE_HISTORY_DATA.filter(l => l.status === 'upcoming').length}
                </p>
              </div>
              <Calendar className="w-12 h-12 opacity-80" />
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Students List</h2>
            <p className="text-sm text-gray-600">
              {filteredStudents.length} students found
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class & Section
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave History
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const studentLeaves = LEAVE_HISTORY_DATA.filter(l => l.studentId === student.id);
                  const completedLeaves = studentLeaves.filter(l => l.status === 'completed').length;
                  const activeLeaves = studentLeaves.filter(l => l.status === 'active').length;
                  const upcomingLeaves = studentLeaves.filter(l => l.status === 'upcoming').length;

                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">Roll No: {student.rollNo}</div>
                            <div className="text-sm text-gray-500">Admission: {student.admissionNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">Class {student.class} - {student.section}</div>
                        <div className="text-sm text-gray-500">Hostel: {student.hostelWing} - Room {student.roomNo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.primaryContact}</div>
                        <div className="text-sm text-gray-500">{student.fatherName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{studentLeaves.length}</div>
                            <div className="text-xs text-gray-500">Total</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{completedLeaves}</div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-yellow-600">{activeLeaves}</div>
                            <div className="text-xs text-gray-500">Active</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{upcomingLeaves}</div>
                            <div className="text-xs text-gray-500">Upcoming</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleSelectStudent(student)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No students found</h3>
              <p className="text-gray-500">Try changing your search criteria</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Leave Activity</h2>
          <div className="space-y-4">
            {LEAVE_HISTORY_DATA.slice(0, 5).map((leave) => (
              <div
                key={leave.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    leave.status === 'completed' ? 'bg-green-500' :
                    leave.status === 'active' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <div className="font-medium">{leave.studentName}</div>
                    <div className="text-sm text-gray-600">
                      {leave.purpose} • Class {leave.class} - {leave.section}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{formatDate(leave.departureDate)}</div>
                  <div className="text-xs text-gray-500">{leave.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showDetails && renderStudentDetails()}
      {showLeaveDetails && renderLeaveDetails()}
    </div>
  );
};

export default StudentLeaveHistory;