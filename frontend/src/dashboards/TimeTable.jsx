import React, { useState, useEffect, useRef } from 'react';
import BackButton from "../components/BackButton";


// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-red-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">Something went wrong</h2>
              <p className="text-red-600 mb-4">There was an error loading the timetable system</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
              <p className="text-sm font-medium text-red-800 mb-2">Error Details:</p>
              <p className="text-sm text-red-700">{this.state.error?.toString()}</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Reload Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Icons for the components
const Icons = {
  Calendar: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clock: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Users: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  BookOpen: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Building: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Bell: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  CheckCircle: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 01118 0z" />
    </svg>
  ),
  Edit: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Save: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
  X: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Plus: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash2: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Upload: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
  ),
  Download: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Printer: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  ),
  RefreshCw: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  AlertCircle: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Lock: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Unlock: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  ),
  Eye: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Grid: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  ChevronLeft: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  ChevronDown: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Settings: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  BellRing: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9m6-10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  FileText: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  User: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Search: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Filter: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  BarChart3: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  TrendingUp: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  PieChart: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  ArrowUpRight: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
    </svg>
  ),
  ArrowDownRight: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10M7 17h10V7" />
    </svg>
  ),
};

// Mock data for timetable structure
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  { id: 1, start: '08:30', end: '09:20', period: '1st' },
  { id: 2, start: '09:20', end: '10:10', period: '2nd' },
  { id: 3, start: '10:10', end: '11:00', period: '3rd' },
  { id: 4, start: '11:00', end: '11:20', period: 'Break' },
  { id: 5, start: '11:20', end: '12:10', period: '4th' },
  { id: 6, start: '12:10', end: '13:00', period: '5th' },
  { id: 7, start: '13:00', end: '13:50', period: '6th' },
  { id: 8, start: '13:50', end: '14:20', period: 'Lunch' },
  { id: 9, start: '14:20', end: '15:10', period: '7th' },
  { id: 10, start: '15:10', end: '16:00', period: '8th' },
];

const CLASSES = ['6-A', '6-B', '7-A', '7-B', '8-A', '8-B', '9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];
const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'English', 'Hindi', 'Social Science', 'Computer Science',
  'Physical Education', 'Art', 'Music', 'Library', 'Assembly'
];
const TEACHERS = [
  'Dr. Ramesh Kumar', 'Mrs. Priya Sharma', 'Mr. Amit Patel', 
  'Dr. Sunita Verma', 'Mr. Rajesh Singh', 'Mrs. Anjali Gupta',
  'Mr. Sanjay Kumar', 'Ms. Neha Sharma', 'Dr. Arvind Joshi',
  'Mrs. Kavita Singh', 'Mr. Deepak Kumar', 'Ms. Swati Mishra'
];

// Rooms/Labs
const ROOMS = [
  'Room 101', 'Room 102', 'Room 103', 'Room 104',
  'Room 201', 'Room 202', 'Room 203', 'Room 204',
  'Science Lab', 'Computer Lab', 'Physics Lab', 'Chemistry Lab',
  'Library', 'Auditorium', 'Sports Ground'
];

// School Display Component - Simplified view for display boards
const SchoolDisplayView = ({ timetableData, activeClass, currentWeek }) => {
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [nextPeriod, setNextPeriod] = useState(null);
  const [currentDay, setCurrentDay] = useState('Monday');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    // Set current day
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const dayName = today === 0 ? 'Monday' : days[today]; // Default to Monday for Sunday
    setCurrentDay(dayName);

    // Find current and next period
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    let current = null;
    let next = null;
    
    TIME_SLOTS.forEach((slot, index) => {
      const start = parseInt(slot.start.replace(':', ''));
      const end = parseInt(slot.end.replace(':', ''));
      
      if (currentTime >= start && currentTime < end) {
        current = slot;
        if (index < TIME_SLOTS.length - 1) {
          next = TIME_SLOTS[index + 1];
        }
      }
    });
    
    setCurrentPeriod(current);
    setNextPeriod(next);
  }, []);

  // Get subject color
  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': '#93c5fd',
      'Physics': '#86efac',
      'Chemistry': '#fbbf24',
      'Biology': '#f9a8d4',
      'English': '#c7d2fe',
      'Hindi': '#d8b4fe',
      'Social Science': '#fca5a5',
      'Computer Science': '#6ee7b7',
      'Physical Education': '#fcd34d',
      'Art': '#f0abfc',
      'Music': '#7dd3fc',
      'Library': '#bbf7d0',
      'Assembly': '#fed7aa',
      'Break': '#fef3c7',
      'Lunch': '#fef3c7'
    };
    return colors[subject] || '#f3f4f6';
  };

  // Toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Get current period information
  const getCurrentPeriodInfo = () => {
    if (!currentPeriod || !timetableData[currentDay]) return null;
    
    const periodData = timetableData[currentDay]?.[currentPeriod.id];
    if (!periodData) return null;
    
    return {
      period: currentPeriod.period,
      time: `${currentPeriod.start} - ${currentPeriod.end}`,
      subject: periodData.subject,
      teacher: periodData.teacher,
      room: periodData.room,
      color: getSubjectColor(periodData.subject)
    };
  };

  const currentPeriodInfo = getCurrentPeriodInfo();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 ${isFullScreen ? 'p-0' : 'p-4'}`}>
      <BackButton to="/staff/dashboard" />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-lg">
        <div className="max-w-8xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg">
                  <Icons.Building className="w-8 h-8 text-blue-800" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">RESIDENTIAL SCHOOL TIMETABLE</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-blue-200">Class: {activeClass}</span>
                    <span className="text-blue-200">•</span>
                    <span className="text-blue-200">Week: {currentWeek.start} - {currentWeek.end}</span>
                    <span className="text-blue-200">•</span>
                    <span className="text-blue-200">Today: {currentDay}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-blue-200">Current Time</div>
                <div className="text-xl font-bold">
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <button
                onClick={toggleFullScreen}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg"
                title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullScreen ? (
                  <Icons.ArrowDownRight className="w-5 h-5" />
                ) : (
                  <Icons.ArrowUpRight className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Period Banner */}
      {currentPeriodInfo && (
        <div className="max-w-8xl mx-auto px-6 py-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div 
                className="p-6 md:w-1/3 text-white flex items-center justify-center"
                style={{ backgroundColor: currentPeriodInfo.color }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">NOW</div>
                  <div className="text-2xl font-bold">{currentPeriodInfo.period} Period</div>
                  <div className="text-lg mt-2">{currentPeriodInfo.time}</div>
                </div>
              </div>
              
              <div className="p-6 md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Subject</div>
                    <div className="text-2xl font-bold text-gray-800">{currentPeriodInfo.subject}</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Teacher</div>
                    <div className="text-xl font-bold text-gray-800">{currentPeriodInfo.teacher}</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Room</div>
                    <div className="text-2xl font-bold text-gray-800">{currentPeriodInfo.room}</div>
                  </div>
                </div>
                
                {nextPeriod && timetableData[currentDay]?.[nextPeriod.id] && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Icons.Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600">Next: </span>
                      <span className="font-medium">
                        {nextPeriod.start} - {timetableData[currentDay][nextPeriod.id]?.subject} 
                        {' '}in {timetableData[currentDay][nextPeriod.id]?.room}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timetable Grid */}
      <div className="max-w-8xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Grid Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Weekly Timetable for {activeClass}</h2>
              <button
                onClick={() => setShowLegend(!showLegend)}
                className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30"
              >
                {showLegend ? 'Hide Legend' : 'Show Legend'}
              </button>
            </div>
          </div>

          {/* Subject Legend */}
          {showLegend && (
            <div className="p-4 bg-blue-50 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map(subject => (
                  <div key={subject} className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    />
                    <span className="text-sm text-gray-700">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timetable Grid */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-gray-100 p-4 border-r border-b border-gray-300 min-w-[140px]">
                    <div className="text-center">
                      <Icons.Clock className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                      <div className="font-bold text-gray-800">TIME SLOT</div>
                    </div>
                  </th>
                  {DAYS.map(day => (
                    <th key={day} className="p-4 border-b border-gray-300 min-w-[220px] bg-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">{day}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {day === currentDay ? (
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                              TODAY
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map(slot => {
                  const isCurrentPeriod = currentPeriod?.id === slot.id;
                  
                  return (
                    <tr key={slot.id} className="border-b border-gray-200 last:border-b-0">
                      <td className={`sticky left-0 z-10 p-4 border-r border-gray-200 ${
                        isCurrentPeriod ? 'bg-blue-50' : 'bg-gray-50'
                      }`}>
                        <div className="text-center">
                          <div className={`font-bold text-lg ${
                            isCurrentPeriod ? 'text-blue-700' : 'text-gray-800'
                          }`}>
                            {slot.period}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{slot.start} - {slot.end}</div>
                          {isCurrentPeriod && (
                            <div className="mt-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                              IN PROGRESS
                            </div>
                          )}
                        </div>
                      </td>
                      {DAYS.map(day => {
                        const cell = timetableData[day]?.[slot.id] || {
                          subject: '',
                          teacher: '',
                          room: '',
                          type: 'regular'
                        };
                        const isBreak = slot.period === 'Break' || slot.period === 'Lunch';
                        const isToday = day === currentDay;
                        const isCurrentCell = isToday && isCurrentPeriod;
                        
                        return (
                          <td
                            key={`${day}-${slot.id}`}
                            className={`p-4 min-h-[100px] ${
                              isCurrentCell ? 'ring-2 ring-blue-500 ring-inset' : ''
                            }`}
                            style={{ 
                              backgroundColor: getSubjectColor(cell.subject),
                              opacity: isToday ? 1 : 0.9
                            }}
                          >
                            <div className="h-full flex flex-col justify-between">
                              {isBreak ? (
                                <div className="text-center py-6">
                                  <div className="text-lg font-bold text-yellow-800">{slot.period}</div>
                                  <div className="text-sm text-yellow-700">{slot.start} - {slot.end}</div>
                                </div>
                              ) : (
                                <>
                                  <div className="mb-2">
                                    <div className="text-lg font-bold text-gray-800">{cell.subject}</div>
                                    <div className="text-sm text-gray-700 mt-1">{cell.teacher}</div>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="flex justify-between items-end">
                                      <div>
                                        <div className="text-sm font-medium text-gray-800">{cell.room}</div>
                                        {isToday && (
                                          <div className="text-xs text-gray-600">{slot.start}</div>
                                        )}
                                      </div>
                                      {isToday && (
                                        <div className="text-right">
                                          {isCurrentPeriod && (
                                            <div className="inline-block px-2 py-1 bg-white bg-opacity-20 text-white text-xs font-bold rounded-full">
                                              LIVE
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Current Period</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Today</span>
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="font-medium">Last Updated: </span>
                <span>{new Date().toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Icons.Bell className="w-5 h-5 mr-2 text-blue-600" />
              Daily Schedule
            </h3>
            <div className="space-y-3">
              {TIME_SLOTS.slice(0, 5).map(slot => (
                <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{slot.period}</div>
                  <div className="text-gray-600">{slot.start} - {slot.end}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Icons.Users className="w-5 h-5 mr-2 text-blue-600" />
              Key Information
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Class Teacher</div>
                <div className="font-bold text-lg text-gray-800">Mrs. Priya Sharma</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Class Room</div>
                <div className="font-bold text-lg text-gray-800">Room 201</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Periods</div>
                <div className="font-bold text-lg text-gray-800">8 Academic Periods</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Principal Dashboard Component
const PrincipalTimetableDashboard = () => {
  const [activeClass, setActiveClass] = useState('6-A');
  const [timetable, setTimetable] = useState(() => {
    const initialTimetable = {};
    CLASSES.forEach(className => {
      initialTimetable[className] = {};
      DAYS.forEach(day => {
        initialTimetable[className][day] = {};
        TIME_SLOTS.forEach(slot => {
          initialTimetable[className][day][slot.id] = {
            subject: '',
            teacher: '',
            room: '',
            type: 'regular',
            color: '#f3f4f6'
          };
        });
      });
    });
    return initialTimetable;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState('cell');
  const [bulkEditData, setBulkEditData] = useState({ subject: '', teacher: '', room: '' });
  const [selectedCell, setSelectedCell] = useState(null);
  const [notification, setNotification] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [editHistory, setEditHistory] = useState([]);
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'display'

  // Safely get timetable data
  const getTimetableData = () => {
    if (!timetable[activeClass]) {
      setTimetable(prev => {
        const updated = { ...prev };
        if (!updated[activeClass]) {
          updated[activeClass] = {};
          DAYS.forEach(day => {
            updated[activeClass][day] = {};
            TIME_SLOTS.forEach(slot => {
              updated[activeClass][day][slot.id] = {
                subject: '',
                teacher: '',
                room: '',
                type: 'regular',
                color: '#f3f4f6'
              };
            });
          });
        }
        return updated;
      });
    }
    return timetable[activeClass] || {};
  };

  const timetableData = getTimetableData();

  // Get current week
  const getCurrentWeek = () => {
    try {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() + 1);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return {
        start: startOfWeek.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        end: endOfWeek.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
    } catch (error) {
      console.error('Error getting current week:', error);
      return { start: 'Error', end: 'Error' };
    }
  };

  const currentWeek = getCurrentWeek();

  // If in display mode, show school display view
  if (viewMode === 'display') {
    return <SchoolDisplayView timetableData={timetableData} activeClass={activeClass} currentWeek={currentWeek} />;
  }

  // Rest of the principal dashboard code (same as before, but with view mode toggle)
  const handleCellClick = (day, slotId) => {
    if (!isEditing) return;
    
    setSelectedCell({ day, slotId });
    const cellData = timetableData[day]?.[slotId] || {
      subject: '',
      teacher: '',
      room: '',
      type: 'regular',
      color: '#f3f4f6'
    };
    setBulkEditData(cellData);
  };

  const saveCellEdit = () => {
    if (!selectedCell) return;
    
    const { day, slotId } = selectedCell;
    
    try {
      const updatedTimetable = { ...timetable };
      
      if (!updatedTimetable[activeClass]) updatedTimetable[activeClass] = {};
      if (!updatedTimetable[activeClass][day]) updatedTimetable[activeClass][day] = {};
      
      updatedTimetable[activeClass][day][slotId] = {
        ...updatedTimetable[activeClass][day][slotId],
        ...bulkEditData
      };
      
      setTimetable(updatedTimetable);
      
      const historyEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        class: activeClass,
        day,
        period: TIME_SLOTS.find(s => s.id === slotId)?.period || 'Unknown',
        changes: bulkEditData,
        user: 'Principal'
      };
      setEditHistory(prev => [historyEntry, ...prev.slice(0, 49)]);
      
      sendNotification(`Timetable updated for ${activeClass} - ${day} (${historyEntry.period})`);
      
      setSelectedCell(null);
      setBulkEditData({ subject: '', teacher: '', room: '' });
    } catch (error) {
      console.error('Error saving cell edit:', error);
      setNotification('Error saving changes. Please try again.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const sendNotification = (message) => {
    try {
      const notification = {
        id: Date.now(),
        message,
        timestamp: new Date().toISOString(),
        type: 'update',
        read: false,
        class: activeClass
      };
      
      setNotifications(prev => [notification, ...prev.slice(0, 19)]);
      
      if (autoSave) {
        console.log('Notification sent to staff:', message);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const publishTimetable = () => {
    try {
      const confirmation = window.confirm(`Publish timetable for ${activeClass}? This will notify all staff members.`);
      if (confirmation) {
        sendNotification(`Timetable for ${activeClass} has been published`);
        setNotification('Timetable published successfully! Staff have been notified.');
        setTimeout(() => setNotification(''), 3000);
      }
    } catch (error) {
      console.error('Error publishing timetable:', error);
      setNotification('Error publishing timetable');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const exportTimetable = () => {
    try {
      const data = {
        class: activeClass,
        timetable: timetableData,
        exportedAt: new Date().toISOString(),
        week: currentWeek
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `timetable-${activeClass}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      sendNotification(`Timetable exported for ${activeClass}`);
    } catch (error) {
      console.error('Error exporting timetable:', error);
      setNotification('Error exporting timetable');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const clearDay = (day) => {
    try {
      if (window.confirm(`Clear all entries for ${day}?`)) {
        const updatedTimetable = { ...timetable };
        
        if (!updatedTimetable[activeClass]) updatedTimetable[activeClass] = {};
        if (!updatedTimetable[activeClass][day]) updatedTimetable[activeClass][day] = {};
        
        TIME_SLOTS.forEach(slot => {
          updatedTimetable[activeClass][day][slot.id] = {
            subject: '',
            teacher: '',
            room: '',
            type: 'regular',
            color: '#f3f4f6'
          };
        });
        
        setTimetable(updatedTimetable);
        sendNotification(`${day} cleared for ${activeClass}`);
      }
    } catch (error) {
      console.error('Error clearing day:', error);
    }
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': '#93c5fd',
      'Physics': '#86efac',
      'Chemistry': '#fbbf24',
      'Biology': '#f9a8d4',
      'English': '#c7d2fe',
      'Hindi': '#d8b4fe',
      'Social Science': '#fca5a5',
      'Computer Science': '#6ee7b7',
      'Physical Education': '#fcd34d',
      'Art': '#f0abfc',
      'Music': '#7dd3fc',
      'Library': '#bbf7d0',
      'Assembly': '#fed7aa'
    };
    return colors[subject] || '#f3f4f6';
  };

  const renderCellContent = (day, slotId) => {
    try {
      const cell = timetableData[day]?.[slotId] || {
        subject: '',
        teacher: '',
        room: '',
        type: 'regular',
        color: '#f3f4f6'
      };
      
      const slot = TIME_SLOTS.find(s => s.id === slotId);
      if (!slot) return null;
      
      if (slot.period === 'Break' || slot.period === 'Lunch') {
        return (
          <div className="flex flex-col items-center justify-center h-full p-2">
            <div className="text-xs font-semibold text-yellow-700">{slot.period}</div>
            <div className="text-xs text-yellow-600">
              {slot.start} - {slot.end}
            </div>
          </div>
        );
      }

      return (
        <div className="h-full p-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-sm text-gray-800">{cell.subject}</div>
              <div className="text-xs text-gray-600 mt-1">{cell.teacher}</div>
            </div>
            {isEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCellClick(day, slotId);
                }}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
              >
                <Icons.Edit className="w-3 h-3 text-gray-500" />
              </button>
            )}
          </div>
          <div className="mt-2">
            <div className="text-xs text-gray-500 flex items-center justify-between">
              <span>{cell.room}</span>
              <span className="font-medium">{slot.start}</span>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error('Error rendering cell:', error);
      return (
        <div className="h-full p-2 text-xs text-red-500">
          Error loading cell
        </div>
      );
    }
  };

  const calculateStats = () => {
    try {
      const stats = {
        scheduledPeriods: 0,
        teachersAssigned: new Set(),
        roomsUsed: new Set()
      };
      
      Object.values(timetableData).forEach(day => {
        Object.values(day).forEach(cell => {
          if (cell.subject && cell.subject !== 'Break' && cell.subject !== 'Lunch') {
            stats.scheduledPeriods++;
            if (cell.teacher) stats.teachersAssigned.add(cell.teacher);
            if (cell.room) stats.roomsUsed.add(cell.room);
          }
        });
      });
      
      return {
        scheduledPeriods: stats.scheduledPeriods,
        teachersAssigned: stats.teachersAssigned.size,
        roomsUsed: stats.roomsUsed.size
      };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return { scheduledPeriods: 0, teachersAssigned: 0, roomsUsed: 0 };
    }
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6">
        <div className="max-w-8xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Timetable Management System</h1>
              <p className="text-blue-200 mt-1">Principal Dashboard - Edit & Preview Mode</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setViewMode('display')}
                className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 font-medium flex items-center space-x-2"
              >
                <Icons.Eye className="w-4 h-4" />
                <span>View Display Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowClassSelector(!showClassSelector)}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 flex items-center space-x-2"
                >
                  <Icons.Building className="w-4 h-4" />
                  <span>{activeClass}</span>
                  <Icons.ChevronDown className="w-4 h-4" />
                </button>
                
                {showClassSelector && (
                  <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {CLASSES.map(cls => (
                        <button
                          key={cls}
                          onClick={() => {
                            setActiveClass(cls);
                            setShowClassSelector(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                            activeClass === cls ? 'bg-blue-50 text-blue-700' : ''
                          }`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                    isEditing 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isEditing ? <Icons.CheckCircle className="w-4 h-4" /> : <Icons.Edit className="w-4 h-4" />}
                  <span>{isEditing ? 'Editing Mode ON' : 'Edit Timetable'}</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={publishTimetable}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center space-x-2"
              >
                <Icons.Bell className="w-4 h-4" />
                <span>Publish to Staff</span>
              </button>
              
              <button
                onClick={exportTimetable}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Icons.Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          {notification && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">{notification}</span>
              </div>
              <button onClick={() => setNotification('')}>
                <Icons.X className="w-4 h-4 text-green-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-6">
        {/* Timetable Grid */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {activeClass} - Weekly Timetable (Edit Mode)
                </h2>
                <p className="text-gray-600">Week of {currentWeek.start} - {currentWeek.end}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${isEditing ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {isEditing ? 'Editing Mode' : 'View Mode'}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-gray-50 p-4 border-r border-b border-gray-200 min-w-[120px]">
                    <div className="text-center">
                      <Icons.Clock className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                      <div className="text-xs font-semibold text-gray-600">Time / Day</div>
                    </div>
                  </th>
                  {DAYS.map(day => (
                    <th key={day} className="p-4 border-b border-gray-200 min-w-[200px] bg-gray-50">
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">{day}</div>
                        {isEditing && (
                          <button
                            onClick={() => clearDay(day)}
                            className="mt-1 text-xs text-red-600 hover:text-red-700"
                          >
                            Clear Day
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map(slot => (
                  <tr key={slot.id} className="border-b border-gray-200 last:border-b-0">
                    <td className="sticky left-0 z-10 bg-gray-50 p-4 border-r border-gray-200">
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">{slot.period}</div>
                        <div className="text-xs text-gray-600">{slot.start} - {slot.end}</div>
                      </div>
                    </td>
                    {DAYS.map(day => {
                      const cell = timetableData[day]?.[slot.id] || {
                        subject: '',
                        teacher: '',
                        room: '',
                        type: 'regular',
                        color: '#f3f4f6'
                      };
                      
                      return (
                        <td
                          key={`${day}-${slot.id}`}
                          onClick={() => handleCellClick(day, slot.id)}
                          className={`p-0 min-h-[80px] cursor-pointer transition-all ${
                            isEditing ? 'hover:bg-gray-50' : ''
                          } ${
                            selectedCell?.day === day && selectedCell?.slotId === slot.id
                              ? 'ring-2 ring-blue-500 ring-inset'
                              : ''
                          }`}
                          style={{ backgroundColor: getSubjectColor(cell.subject) }}
                        >
                          {renderCellContent(day, slot.id)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.scheduledPeriods}
                </div>
                <div className="text-sm text-gray-600">Scheduled Periods</div>
              </div>
              <Icons.Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.teachersAssigned}
                </div>
                <div className="text-sm text-gray-600">Teachers Assigned</div>
              </div>
              <Icons.Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.roomsUsed}
                </div>
                <div className="text-sm text-gray-600">Rooms Used</div>
              </div>
              <Icons.Building className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const TimetableApp = () => {
  return (
    <ErrorBoundary>
     <PrincipalTimetableDashboard/>
    </ErrorBoundary>
  );
};

export default TimetableApp;