import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import BackButton from "../components/BackButton";
import html2pdf from "html2pdf.js";



import { 
  Camera, User, CheckCircle, QrCode, Download, Printer, 
  Phone, Mail, MapPin, Calendar, Clock,
  Shield, Users, FileText,
  Smartphone, Briefcase, AlertCircle,
  Upload, X, ArrowRight, ArrowLeft,
  Search, Clock4, CalendarDays, GraduationCap,
  UserCheck, Building2, Heart,
  Users2, ShieldCheck, MailCheck,
  Copy, Check, Home, Building, PhoneCall,
  ChevronDown, Plus, Edit, Trash2, Save, Eye, EyeOff
} from 'lucide-react';

// Color Scheme Configuration
const COLOR_SCHEME = {
  primary: {
    main: '#3B82F6',
    light: '#60A5FA',
    lighter: '#93C5FD',
    dark: '#2563EB',
    darker: '#1D4ED8',
  },
  secondary: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
  },
  background: {
    main: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    light: '#F8FAFC',
    card: 'rgba(255, 255, 255, 0.95)',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  }
};

// ✅ Clean mobile number for storage (keep only 10 digits)
const cleanMobile = (number) => {
  return number.replace(/\D/g, "").slice(0, 10);
};

// ✅ Format Aadhar number (XXXX XXXX XXXX)
const formatAadhar = (number) => {
  const digitsOnly = number.replace(/\D/g, "").slice(0, 12);
  if (digitsOnly.length <= 4) return digitsOnly;
  if (digitsOnly.length <= 8) return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4)}`;
  return `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4, 8)} ${digitsOnly.slice(8)}`;
};

// ✅ Validate Aadhar has exactly 12 digits
const isValidAadhar = (aadhar) => {
  const digitsOnly = aadhar.replace(/\D/g, "");
  return digitsOnly.length === 12;
};

// Default mobile number for all students and guardians
const DEFAULT_MOBILE_NUMBER = '';




const GUARDIAN_TYPES = [
  { id: 'parent', label: 'Parent', description: 'Father/Mother' },
  { id: 'relative', label: 'Relative', description: 'Uncle/Aunt/Grandparent' },
  { id: 'sibling', label: 'Sibling', description: 'Brother/Sister' },
  { id: 'family_friend', label: 'Family Friend', description: 'Trusted family friend' },
  { id: 'other', label: 'Other', description: 'Specify relationship' },
];

const PURPOSE_OPTIONS = [
  { id: 'medical', label: 'Medical Leave' },
  { id: 'family_function', label: 'Family Function' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'personal', label: 'Personal Reason' },
  { id: 'vacation', label: 'Vacation' },
  { id: 'other', label: 'Other' },
];

// School Information
const SCHOOL_INFO = {
  name: 'RESIDENTIAL SCHOOL',
  address: '123 Education Road, Knowledge City, Tamil Nadu - 600001',
  phone: '+91 44 1234 5678',
  emergencyPhone: '+91 9876543210',
  email: 'info@residentialschool.edu.in',
  principal: 'Dr. Ramesh Kumar',
  website: 'www.residentialschool.edu.in',
  principalPhone: '+91 9876543212'
};

// Camera Component - Generic for both student and guardian
const CameraCapture = ({ onCapture, onClose, title = "Capture Photo", type = "guardian" }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [isFrontCamera]);

  const startCamera = async () => {
    try {
      stopCamera(); // Stop any existing stream

      const constraints = {
        video: {
          facingMode: isFrontCamera ? 'user' : 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Failed to access camera. Please check permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      stopCamera();
      onCapture(imageDataUrl);
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full" style={{ backgroundColor: COLOR_SCHEME.background.card }}>
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5" style={{ 
              color: type === 'student' ? COLOR_SCHEME.primary.main : COLOR_SCHEME.secondary.main 
            }} />
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          {error ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${COLOR_SCHEME.status.error}20` }}>
                <X className="w-8 h-8" style={{ color: COLOR_SCHEME.status.error }} />
              </div>
              <p className="mb-4" style={{ color: COLOR_SCHEME.status.error }}>{error}</p>
            </div>
          ) : (
            <>
              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={toggleCamera}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    title="Switch Camera"
                  >
                    <Camera className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              <button
                onClick={capturePhoto}
                className="w-full py-3 text-white rounded-lg font-medium transition-all hover:shadow-lg"
                style={{ 
                  backgroundColor: type === 'student' ? COLOR_SCHEME.primary.main : COLOR_SCHEME.secondary.main 
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = type === 'student' ? COLOR_SCHEME.primary.dark : COLOR_SCHEME.secondary.dark}
                onMouseLeave={(e) => e.target.style.backgroundColor = type === 'student' ? COLOR_SCHEME.primary.main : COLOR_SCHEME.secondary.main}
              >
                Capture Photo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
const StudentLeaveRequest = () => {
  const [step, setStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [guardianType, setGuardianType] = useState('');
  const [guardianPhoto, setGuardianPhoto] = useState(null);
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  const [verificationStatus, setVerificationStatus] = useState('');
  const [gatePass, setGatePass] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [gatePassPrinted, setGatePassPrinted] = useState({ school: false, parent: false });
  const [showCamera, setShowCamera] = useState(false);
  const [cameraType, setCameraType] = useState('guardian'); // 'student' or 'guardian'
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
 const schoolCopyRef = useRef(null);
const parentCopyRef = useRef(null);

 
  const [students, setStudents] = useState([]);
const [filteredStudents, setFilteredStudents] = useState([]);
const [loadingStudents, setLoadingStudents] = useState(true);
const [studentError, setStudentError] = useState("");

  // Validation states
  const [mobileError, setMobileError] = useState('');
  const [aadharError, setAadharError] = useState('');
  
  // Guardian management states
  const [guardianList, setGuardianList] = useState([]);
  const [selectedGuardian, setSelectedGuardian] = useState(null);
  
  // New guardian form state
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    mobile: DEFAULT_MOBILE_NUMBER, // Set default mobile number
    aadhar: '',
    address: '',
    email: '',
    relationship: ''
  });

  const uniqueClasses = [...new Set(students.map(s => s.class))];
  const uniqueSections = [...new Set(students.map(s => s.section))];
useEffect(() => {
  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);

      const res = await fetch("/api/students");
      const data = await res.json();

      const formatted = data.map((s) => ({
        id: s._id,
        name: s.name,
        class: s.class,
        section: s.section,
        rollNo: s.roll,
        photo: null,
        parentName: s.fatherName,
        parentMobile: s.fathermobile,
        parentEmail: s.email,
        aadhar: s.fatheraadhar || "",
        address: s.address,
        dob: s.dob,
        bloodGroup: "N/A",
        hostelWing: s.daysschoolarhostel === "hostel" ? "Hostel Wing" : "",
        roomNo: s.roomno || "",
        emergencyContact: s.phone,
        localGuardian: s.fatherName,
        localGuardianContact: s.fathermobile,
      }));

      setStudents(formatted);
      setFilteredStudents(formatted);
    } catch {
      setStudentError("Failed to load students");
    } finally {
      setLoadingStudents(false);
    }
  };

  fetchStudents();
}, []);

  useEffect(() => {
    let filtered = students;
    
    if (selectedClass) {
      filtered = filtered.filter(s => s.class === selectedClass);
    }
    
    if (selectedSection) {
      filtered = filtered.filter(s => s.section === selectedSection);
    }
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toString().includes(searchTerm)
      );
    }
    
    setFilteredStudents(filtered);
 }, [students, selectedClass, selectedSection, searchTerm]);


  useEffect(() => {
    if (selectedStudent) {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      setDepartureDate(today);
      setDepartureTime('10:00');
      setReturnDate(tomorrowStr);
      setReturnTime('17:00');
      
      // Load student photo if exists
      if (selectedStudent.photo) {
        setStudentPhoto(selectedStudent.photo);
      }
    }
  }, [selectedStudent]);

  const handleImageError = (studentId) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [studentId]: true
    }));
  };

  const getStudentPhoto = (student) => {
    if (studentPhoto && selectedStudent?.id === student.id) {
      return studentPhoto;
    }
    if (imageLoadErrors[student.id]) {
      return 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    }
    return student.photo || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    if (student.photo) {
      setStudentPhoto(student.photo);
    } else {
      setStudentPhoto(null);
    }
  };

  const handlePhotoUpload = (e, type = 'guardian') => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'student') {
          setStudentPhoto(e.target.result);
        } else {
          setGuardianPhoto(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (type = 'guardian') => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Camera access is not supported in your browser');
      return;
    }
    setCameraType(type);
    setShowCamera(true);
  };

  const handleCapturePhoto = (photoDataUrl) => {
    if (cameraType === 'student') {
      setStudentPhoto(photoDataUrl);
    } else {
      setGuardianPhoto(photoDataUrl);
    }
    setShowCamera(false);
  };

  // Handle mobile number input with validation
  const handleMobileChange = (value) => {
    // Only allow digits and limit to 10
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setNewGuardian({...newGuardian, mobile: digitsOnly});
    
    // Validate
    if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setMobileError('Mobile number must be exactly 10 digits');
    } else {
      setMobileError('');
    }
  };
const handleDownloadGatePass = async (type) => {
  const ref = type === "school" ? schoolCopyRef : parentCopyRef;

  await waitForElement(ref);

  const element = ref.current;

  if (!element) {
    alert("Gate pass not ready yet");
    return;
  }

  html2pdf()
    .set({
      margin: 0.3,
      filename: `${gatePass.id}-${type}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(element)
    .save();
};

  // Handle Aadhar number input with validation
  const handleAadharChange = (value) => {
    // Format the Aadhar number as user types
    const formatted = formatAadhar(value);
    
    setNewGuardian({...newGuardian, aadhar: formatted});
    
    // Validate Aadhar number
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length > 0 && digitsOnly.length !== 12) {
      setAadharError('Aadhar number must be exactly 12 digits');
    } else {
      setAadharError('');
    }
  };
const waitForElement = (ref) =>
  new Promise((resolve) => {
    const check = () => {
      if (ref.current) resolve();
      else requestAnimationFrame(check);
    };
    check();
  });

  const handleSaveGuardian = () => {
    // Check if all required fields are filled
    if (!newGuardian.name || !newGuardian.mobile || !newGuardian.aadhar || !newGuardian.address || !newGuardian.relationship) {
      alert('Please fill all required fields');
      return;
    }

    // Validate mobile number has exactly 10 digits
    if (newGuardian.mobile.length !== 10) {
      setMobileError('Mobile number must be exactly 10 digits');
      return;
    }

    // Validate Aadhar number has exactly 12 digits
    const aadharDigits = newGuardian.aadhar.replace(/\D/g, "");
    if (aadharDigits.length !== 12) {
      setAadharError('Aadhar number must be exactly 12 digits');
      return;
    }

    // Format Aadhar for storage
    const formattedAadhar = `${aadharDigits.slice(0, 4)} ${aadharDigits.slice(4, 8)} ${aadharDigits.slice(8)}`;

    const guardianData = {
      ...newGuardian,
      aadhar: formattedAadhar,
      id: Date.now(),
      type: guardianType
    };

    setGuardianList(prev => [...prev, guardianData]);
    setSelectedGuardian(guardianData);
    
    // Reset form with default mobile
    setNewGuardian({
      name: '',
      mobile: DEFAULT_MOBILE_NUMBER,
      aadhar: '',
      address: '',
      email: '',
      relationship: ''
    });
    setGuardianType('');
    setMobileError('');
    setAadharError('');
  };

  const handleEditGuardian = () => {
    if (!selectedGuardian) return;
    
    setNewGuardian({
      name: selectedGuardian.name,
      mobile: selectedGuardian.mobile,
      aadhar: selectedGuardian.aadhar,
      address: selectedGuardian.address,
      email: selectedGuardian.email || '',
      relationship: selectedGuardian.relationship
    });
    setGuardianType(selectedGuardian.type || '');
    setSelectedGuardian(null);
    setMobileError('');
    setAadharError('');
  };

  const handleDeleteGuardian = (guardianId) => {
    if (window.confirm('Are you sure you want to delete this guardian?')) {
      const updatedList = guardianList.filter(g => g.id !== guardianId);
      setGuardianList(updatedList);
      
      // If the deleted guardian was selected, clear the selection
      if (selectedGuardian?.id === guardianId) {
        setSelectedGuardian(null);
      }
    }
  };

const handleSendOTP = async () => {
  if (!selectedGuardian?.mobile) {
    alert("Guardian mobile required");
    return;
  }


  const loadWidget = () =>
    new Promise((resolve, reject) => {
      if (window.initSendOTP) return resolve();
      const s = document.createElement("script");
      s.src = "https://verify.msg91.com/otp-provider.js";
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });

  try {
    await loadWidget();


window.initSendOTP({
widgetId: "3661676e3670303334363635",
tokenAuth: "486607T1fMxmGl695e7554P1",
  identifier: `+91${selectedStudent.parentMobile}`,
  country: "IN",
  success: () => {
    setOtpSent(true);
    setVerificationStatus("verified");
   
  },
  failure: (err) => {
    console.error(err);
    alert("OTP verification failed");
  },
    });
  } catch (err) {
    console.error(err);
    alert("OTP service failed");
  }
};



  // Helper to convert data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    try {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    } catch (e) {
      console.error('Error converting data URL to blob:', e);
      return null;
    }
  };

  const handleGenerateGatePass = async () => {
    const timestamp = new Date();
    const passId = `GP${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}${String(timestamp.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
    const newGatePass = {
      id: passId,
      studentName: selectedStudent.name,
      studentPhoto: studentPhoto || getStudentPhoto(selectedStudent),
      studentClass: `${selectedStudent.class} - ${selectedStudent.section}`,
      rollNo: selectedStudent.rollNo,
      guardianName: selectedGuardian.name,
      guardianType: selectedGuardian.relationship,
      guardianPhoto: guardianPhoto,
      contact: selectedGuardian.mobile,
      aadhar: selectedGuardian.aadhar,
      email: selectedGuardian.email,
      address: selectedGuardian.address,
      emergencyContact: selectedStudent.emergencyContact,
      localGuardian: selectedStudent.localGuardian,
      localGuardianContact: selectedStudent.localGuardianContact,
      departure: departureDate,
      departureTime: departureTime,
      return: returnDate,
      returnTime: returnTime,
      purpose: PURPOSE_OPTIONS.find(p => p.id === purpose)?.label || purpose,
      additionalNotes: notes,
      issuedBy: 'Saranya',
      issuedTime: timestamp.toLocaleTimeString('en-IN', { hour12: true }),
      issuedDate: timestamp.toLocaleDateString('en-IN'),
      schoolInfo: SCHOOL_INFO,
      studentDetails: {
        dob: selectedStudent.dob,
        bloodGroup: selectedStudent.bloodGroup,
        hostelWing: selectedStudent.hostelWing,
        roomNo: selectedStudent.roomNo
      }
    };

    // Prepare FormData for backend submission
    const formData = new FormData();
    formData.append('studentId', selectedStudent.rollNo);
    formData.append('studentName', selectedStudent.name);
    formData.append('staffId', 'STAFF001'); // Placeholder
    formData.append('leaveReason', PURPOSE_OPTIONS.find(p => p.id === purpose)?.label || purpose);
    formData.append('startDate', departureDate);
    formData.append('endDate', returnDate);
  formData.append("studentClass", selectedStudent.class);
formData.append("studentSection", selectedStudent.section);

    // Append photos if they are new (base64 data URLs)
    if (studentPhoto && studentPhoto.startsWith('data:')) {
      const blob = dataURLtoBlob(studentPhoto);
      if (blob) formData.append('studentPhoto', blob, 'student.jpg');
    }

    if (guardianPhoto && guardianPhoto.startsWith('data:')) {
      const blob = dataURLtoBlob(guardianPhoto);
      if (blob) formData.append('guardianPhoto', blob, 'guardian.jpg');
    }

    try {
      // Send to backend
      const response = await fetch('/api/leave-request/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        console.log('Backend submission successful:', data);
        setGatePass(newGatePass);
        setStep(4);
      } else {
        alert('Failed to submit leave request: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting to backend:', error);
      alert('Error connecting to server. Please ensure the backend is running.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-IN', { hour12: true, hour: '2-digit', minute: '2-digit' });
  };

  const handlePrintGatePass = (type) => {
    if (type === 'school') {
      setGatePassPrinted(prev => ({ ...prev, school: true }));
    } else {
      setGatePassPrinted(prev => ({ ...prev, parent: true }));
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleCopyToClipboard = () => {
    const passText = `
Gate Pass ID: ${gatePass?.id}
Student: ${gatePass?.studentName}
Class: ${gatePass?.studentClass}
Guardian: ${gatePass?.guardianName}
Departure: ${formatDate(gatePass?.departure)} at ${formatTime(gatePass?.departureTime)}
Return: ${formatDate(gatePass?.return)} at ${formatTime(gatePass?.returnTime)}
Purpose: ${gatePass?.purpose}
    `;
    
    navigator.clipboard.writeText(passText).then(() => {
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    });
  };

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: COLOR_SCHEME.background.card }}>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Select Student</h2>
          <p className="text-gray-600 mb-6">Search and select student for gate pass</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or roll no"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map(cls => (
                <option key={cls} value={cls}>Class {cls}</option>
              ))}
            </select>
            
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">All Sections</option>
              {uniqueSections.map(sec => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedStudent?.id === student.id 
                    ? 'border-blue-500 ring-1 ring-blue-500' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleSelectStudent(student)}
                style={{ 
                  backgroundColor: selectedStudent?.id === student.id 
                    ? `${COLOR_SCHEME.primary.main}15` 
                    : 'white' 
                }}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={getStudentPhoto(student)}
                    alt={student.name}
                    className="w-12 h-12 rounded-lg border border-gray-200"
                    onError={() => handleImageError(student.id)}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{student.name}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600">Class {student.class} - {student.section}</span>
                          <span className="text-sm text-gray-500">Roll No: {student.rollNo}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{student.parentMobile}</span>
                        </div>
                      </div>
                      {selectedStudent?.id === student.id && (
                        <CheckCircle className="w-5 h-5" style={{ color: COLOR_SCHEME.secondary.main }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" style={{ backgroundColor: `${COLOR_SCHEME.primary.main}05` }}>
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No students found</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => selectedStudent && setStep(2)}
            disabled={!selectedStudent}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              selectedStudent 
                ? 'text-white hover:shadow-lg' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            style={{ 
              backgroundColor: selectedStudent ? COLOR_SCHEME.primary.main : undefined 
            }}
            onMouseEnter={(e) => {
              if (selectedStudent) {
                e.target.style.backgroundColor = COLOR_SCHEME.primary.dark;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedStudent) {
                e.target.style.backgroundColor = COLOR_SCHEME.primary.main;
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: COLOR_SCHEME.background.card }}>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Guardian & Leave Details</h2>
          
          <div className="space-y-6">
            {/* Selected Student Info with Photo Capture */}
            {selectedStudent && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: `${COLOR_SCHEME.primary.main}10` }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Student Information</h3>
                  <button
                    onClick={() => handleCameraCapture('student')}
                    className="px-3 py-1 text-sm text-white rounded-lg font-medium transition-all hover:shadow-md"
                    style={{ backgroundColor: COLOR_SCHEME.primary.main }}
                  >
                    <Camera className="w-4 h-4 inline mr-1" />
                    Capture Student Photo
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={studentPhoto || getStudentPhoto(selectedStudent)}
                      alt={selectedStudent.name}
                      className="w-20 h-20 rounded-lg border-2 border-gray-300 object-cover"
                      style={{ borderColor: COLOR_SCHEME.primary.main }}
                    />
                    {!studentPhoto && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                        <span className="text-white text-xs text-center px-1">Capture Required</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{selectedStudent.name}</h3>
                    <p className="text-sm text-gray-600">Class {selectedStudent.class} - {selectedStudent.section} | Roll No: {selectedStudent.rollNo}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div>
                        <span className="text-xs text-gray-500">DOB:</span>
                        <span className="text-sm font-medium ml-1">{formatDate(selectedStudent.dob)}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Blood Group:</span>
                        <span className="text-sm font-medium ml-1">{selectedStudent.bloodGroup}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">Emergency Contact: {selectedStudent.emergencyContact}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'student')}
                      className="hidden"
                    />
                    <div className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-center text-sm font-medium transition-all">
                      Upload Student Photo
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Guardian Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Type *</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {GUARDIAN_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setGuardianType(type.id);
                      // Set default relationship based on type
                      if (type.id !== 'other') {
                        setNewGuardian(prev => ({
                          ...prev,
                          relationship: type.label
                        }));
                      } else {
                        setNewGuardian(prev => ({
                          ...prev,
                          relationship: ''
                        }));
                      }
                    }}
                    className={`p-3 border rounded-lg text-sm transition-all ${
                      guardianType === type.id
                        ? 'text-white'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                    style={{ 
                      backgroundColor: guardianType === type.id ? COLOR_SCHEME.secondary.main : 'white',
                      borderColor: guardianType === type.id ? COLOR_SCHEME.secondary.main : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (guardianType !== type.id) {
                        e.target.style.backgroundColor = `${COLOR_SCHEME.secondary.main}10`;
                        e.target.style.borderColor = COLOR_SCHEME.secondary.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (guardianType !== type.id) {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#D1D5DB';
                      }
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guardian Form - Show only when guardian type is selected */}
            {guardianType && !selectedGuardian && (
              <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">
                    {GUARDIAN_TYPES.find(t => t.id === guardianType)?.label} Details
                    <span className="text-xs text-gray-500 ml-2">
                      ({GUARDIAN_TYPES.find(t => t.id === guardianType)?.description})
                    </span>
                  </h3>
                  <button
                    onClick={() => {
                      setGuardianType('');
                      setNewGuardian({
                        name: '',
                        mobile: DEFAULT_MOBILE_NUMBER,
                        aadhar: '',
                        address: '',
                        email: '',
                        relationship: ''
                      });
                      setMobileError('');
                      setAadharError('');
                    }}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={newGuardian.name || ''}
                        onChange={(e) => setNewGuardian({...newGuardian, name: e.target.value})}
                        placeholder="Enter guardian's full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                      {guardianType === 'other' ? (
                        <input
                          type="text"
                          value={newGuardian.relationship || ''}
                          onChange={(e) => setNewGuardian({...newGuardian, relationship: e.target.value})}
                          placeholder="Specify relationship"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          value={GUARDIAN_TYPES.find(t => t.id === guardianType)?.label}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        value={newGuardian.mobile || DEFAULT_MOBILE_NUMBER}
                        onChange={(e) => handleMobileChange(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          mobileError ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {mobileError && (
                        <div className="mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" style={{ color: COLOR_SCHEME.status.error }} />
                          <span className="text-xs" style={{ color: COLOR_SCHEME.status.error }}>{mobileError}</span>
                        </div>
                      )}
                      <div className="mt-1 text-xs text-gray-500">
                        {newGuardian.mobile.length}/10 digits entered
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={newGuardian.email || ''}
                        onChange={(e) => setNewGuardian({...newGuardian, email: e.target.value})}
                        placeholder="guardian@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number *</label>
                      <input
                        type="text"
                        value={newGuardian.aadhar || ''}
                        onChange={(e) => handleAadharChange(e.target.value)}
                        placeholder="Enter 12-digit Aadhar"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          aadharError ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      {aadharError && (
                        <div className="mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" style={{ color: COLOR_SCHEME.status.error }} />
                          <span className="text-xs" style={{ color: COLOR_SCHEME.status.error }}>{aadharError}</span>
                        </div>
                      )}
                      <div className="mt-1 text-xs text-gray-500">
                        {newGuardian.aadhar.replace(/\D/g, "").length}/12 digits entered
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                      <textarea
                        value={newGuardian.address || ''}
                        onChange={(e) => setNewGuardian({...newGuardian, address: e.target.value})}
                        rows="3"
                        placeholder="Full address with city, state, and pincode"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => {
                        setGuardianType('');
                        setNewGuardian({
                          name: '',
                          mobile: DEFAULT_MOBILE_NUMBER,
                          aadhar: '',
                          address: '',
                          email: '',
                          relationship: ''
                        });
                        setMobileError('');
                        setAadharError('');
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveGuardian}
                      disabled={
                        !newGuardian.name || 
                        !newGuardian.relationship || 
                        !newGuardian.mobile || 
                        !newGuardian.aadhar || 
                        !newGuardian.address ||
                        newGuardian.mobile.length !== 10 ||
                        newGuardian.aadhar.replace(/\D/g, "").length !== 12
                      }
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        newGuardian.name && 
                        newGuardian.relationship && 
                        newGuardian.mobile && 
                        newGuardian.aadhar && 
                        newGuardian.address &&
                        newGuardian.mobile.length === 10 &&
                        newGuardian.aadhar.replace(/\D/g, "").length === 12
                          ? 'text-white hover:shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      style={{ 
                        backgroundColor: newGuardian.name && 
                        newGuardian.relationship && 
                        newGuardian.mobile && 
                        newGuardian.aadhar && 
                        newGuardian.address &&
                        newGuardian.mobile.length === 10 &&
                        newGuardian.aadhar.replace(/\D/g, "").length === 12
                          ? COLOR_SCHEME.secondary.main 
                          : undefined 
                      }}
                      onMouseEnter={(e) => {
                        if (newGuardian.name && 
                            newGuardian.relationship && 
                            newGuardian.mobile && 
                            newGuardian.aadhar && 
                            newGuardian.address &&
                            newGuardian.mobile.length === 10 &&
                            newGuardian.aadhar.replace(/\D/g, "").length === 12) {
                          e.target.style.backgroundColor = COLOR_SCHEME.secondary.dark;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (newGuardian.name && 
                            newGuardian.relationship && 
                            newGuardian.mobile && 
                            newGuardian.aadhar && 
                            newGuardian.address &&
                            newGuardian.mobile.length === 10 &&
                            newGuardian.aadhar.replace(/\D/g, "").length === 12) {
                          e.target.style.backgroundColor = COLOR_SCHEME.secondary.main;
                        }
                      }}
                    >
                      Save Guardian Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            
            {/* Display selected guardian details */}
            {selectedGuardian && (
              <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-800">
                    Selected Guardian Details
                  </h3>
                  <div className="flex space-x-2"> 
                    <button
                      onClick={handleEditGuardian}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGuardian(selectedGuardian.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="col-span-2">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium ml-2 text-lg">{selectedGuardian.name}</span>
                      <span className="text-gray-500 ml-2">({selectedGuardian.relationship})</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Mobile:</span>
                      <span className="font-medium ml-2">{selectedGuardian.mobile}</span>
                      <div className="text-xs text-green-600 mt-1">
                        ✓ Valid 10-digit mobile
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium ml-2">{selectedGuardian.email || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Aadhar:</span>
                      <span className="font-medium ml-2">{selectedGuardian.aadhar}</span>
                      <div className="text-xs text-green-600 mt-1">
                        ✓ Valid 12-digit Aadhar
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Address:</span>
                      <div className="font-medium ml-2 mt-1">{selectedGuardian.address.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Guardian Photo - Show only when guardian is selected or being added */}
            {(selectedGuardian || guardianType) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Photo *</label>
                <div className="flex items-center space-x-4">
                  {guardianPhoto ? (
                    <div className="relative">
                      <img
                        src={guardianPhoto}
                        alt="Guardian"
                        className="w-24 h-24 rounded-lg border border-gray-300 object-cover"
                        style={{ borderColor: COLOR_SCHEME.secondary.main }}
                      />
                      <button
                        onClick={() => setGuardianPhoto(null)}
                        className="absolute -top-2 -right-2 text-white rounded-full p-1 hover:shadow-md transition-all"
                        style={{ backgroundColor: COLOR_SCHEME.status.error }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center" style={{ 
                      backgroundColor: `${COLOR_SCHEME.secondary.main}05`,
                      borderColor: COLOR_SCHEME.secondary.light
                    }}>
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCameraCapture('guardian')}
                      className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-all hover:shadow-md"
                      style={{ backgroundColor: COLOR_SCHEME.secondary.main }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = COLOR_SCHEME.secondary.dark}
                      onMouseLeave={(e) => e.target.style.backgroundColor = COLOR_SCHEME.secondary.main}
                    >
                      <Camera className="w-4 h-4 inline mr-1" />
                      Capture Photo
                    </button>
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-sm font-medium transition-all">
                        Upload Photo
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Leave Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  min={departureDate}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Leave *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {PURPOSE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPurpose(option.id)}
                    className={`p-3 border rounded-lg text-sm transition-all ${
                      purpose === option.id
                        ? 'text-white'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                    style={{ 
                      backgroundColor: purpose === option.id ? COLOR_SCHEME.primary.main : 'white',
                      borderColor: purpose === option.id ? COLOR_SCHEME.primary.main : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (purpose !== option.id) {
                        e.target.style.backgroundColor = `${COLOR_SCHEME.primary.main}10`;
                        e.target.style.borderColor = COLOR_SCHEME.primary.light;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (purpose !== option.id) {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#D1D5DB';
                      }
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                placeholder="Any additional information..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
          >
            Back
          </button>
          <button
            onClick={() => setStep(3)}
            disabled={
              !selectedGuardian || 
              !guardianPhoto || 
              !studentPhoto || 
              !departureDate || 
              !departureTime || 
              !returnDate || 
              !returnTime || 
              !purpose
            }
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              selectedGuardian && 
              guardianPhoto && 
              studentPhoto && 
              departureDate && 
              departureTime && 
              returnDate && 
              returnTime && 
              purpose
                ? 'text-white hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            style={{ 
              backgroundColor: selectedGuardian && 
              guardianPhoto && 
              studentPhoto && 
              departureDate && 
              departureTime && 
              returnDate && 
              returnTime && 
              purpose
                ? COLOR_SCHEME.primary.main 
                : undefined 
            }}
            onMouseEnter={(e) => {
              if (selectedGuardian && 
                  guardianPhoto && 
                  studentPhoto && 
                  departureDate && 
                  departureTime && 
                  returnDate && 
                  returnTime && 
                  purpose) {
                e.target.style.backgroundColor = COLOR_SCHEME.primary.dark;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedGuardian && 
                  guardianPhoto && 
                  studentPhoto && 
                  departureDate && 
                  departureTime && 
                  returnDate && 
                  returnTime && 
                  purpose) {
                e.target.style.backgroundColor = COLOR_SCHEME.primary.main;
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-md mx-auto">
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: COLOR_SCHEME.background.card }}>
        <div className="mb-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${COLOR_SCHEME.primary.main}20` }}>
              <CheckCircle className="w-8 h-8" style={{ color: COLOR_SCHEME.primary.main }} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">OTP Verification</h2>
            <p className="text-gray-600">OTP will be sent to parent mobile number only</p>
          </div>

          <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: `${COLOR_SCHEME.primary.main}10` }}>
            <h3 className="font-medium text-gray-800 mb-2">Guardian Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Guardian:</span>
                <span className="font-medium">{selectedGuardian?.name} ({selectedGuardian?.relationship})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mobile:</span>
                <span className="font-medium">{selectedGuardian?.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Aadhar:</span>
                <span className="font-medium">{selectedGuardian?.aadhar}</span>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleSendOTP}
            
              className={`w-full py-3 rounded-lg font-medium mb-4 transition-all ${
                otpSent 
                  ? 'bg-gray-100 text-gray-500'
                  : 'text-white hover:shadow-md'
              }`}
              style={{ 
                backgroundColor: !otpSent ? COLOR_SCHEME.primary.main : undefined 
              }}
              onMouseEnter={(e) => {
                if (!otpSent) {
                  e.target.style.backgroundColor = COLOR_SCHEME.primary.dark;
                }
              }}
              onMouseLeave={(e) => {
                if (!otpSent) {
                  e.target.style.backgroundColor = COLOR_SCHEME.primary.main;
                }
              }}
            >
              {otpSent ? 'OTP Sent to Parent' : 'Send OTP to parent'}
            </button>
            
           
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStep(2)}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleGenerateGatePass}
            disabled={!verificationStatus.includes("verified")}


            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              verificationStatus.includes('verified')
                ? 'text-white hover:shadow-md'
                : 'bg-gray-100 text-gray-400'
            }`}
            style={{ 
              backgroundColor: verificationStatus.includes('verified') ? COLOR_SCHEME.secondary.main : undefined 
            }}
            onMouseEnter={(e) => {
              if (verificationStatus.includes('verified')) {
                e.target.style.backgroundColor = COLOR_SCHEME.secondary.dark;
              }
            }}
            onMouseLeave={(e) => {
              if (verificationStatus.includes('verified')) {
                e.target.style.backgroundColor = COLOR_SCHEME.secondary.main;
              }
            }}
          >
            Generate Gate Pass
          </button>
        </div>
      </div>
    </div>
  );

  const GatePassPreview = ({ isParentCopy = false }) => {
    if (!gatePass) return null;
    
    const isPrinted = isParentCopy ? gatePassPrinted.parent : gatePassPrinted.school;

    return (
      <div 
        className="rounded-xl shadow-lg overflow-hidden border border-gray-200 print:shadow-none print:border-0"
        style={{ 
          maxWidth: '500px', 
          margin: '0 auto',
          backgroundColor: COLOR_SCHEME.background.card 
        }}
      >
        {/* Header */}
        <Header/>
        <div className="p-6 text-center text-white" style={{ backgroundColor: COLOR_SCHEME.primary.main }}>
          <div className="mb-4">
            <Building2 className="w-10 h-10 mx-auto mb-2" />
            <h1 className="text-2xl font-bold">RESIDENTIAL SCHOOL</h1>
            <p className="text-sm opacity-90 mt-1">
              OFFICIAL GATE PASS ({isParentCopy ? 'PARENT COPY' : 'SCHOOL COPY'})
            </p>
          </div>
          
          <div className="inline-block backdrop-blur-sm px-4 py-2 rounded-lg" style={{ backgroundColor: `${COLOR_SCHEME.primary.dark}80` }}>
            <div className="font-mono font-bold text-lg">{gatePass.id}</div>
            <div className="text-xs opacity-80">SCAN AT GATE</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Student and Guardian Photos Side by Side */}
          <div className="mb-6">
            <div className="flex items-center mb-4 pb-2 border-b" style={{ borderColor: `${COLOR_SCHEME.primary.main}40` }}>
              <User className="w-5 h-5 mr-2" style={{ color: COLOR_SCHEME.primary.main }} />
              <h2 className="text-lg font-semibold text-gray-800">Student & Guardian Profile</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Student Profile */}
              <div className="text-center p-4 rounded-lg border" style={{ 
                borderColor: COLOR_SCHEME.primary.light,
                backgroundColor: `${COLOR_SCHEME.primary.main}10` 
              }}>
                <div className="w-20 h-20 mx-auto mb-3 overflow-hidden rounded-lg border-2" style={{ 
                  borderColor: COLOR_SCHEME.primary.main 
                }}>
                  <img
                    src={gatePass.studentPhoto}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{gatePass.studentName}</h3>
                <p className="text-sm text-gray-600 mb-2">Class: {gatePass.studentClass}</p>
                <div className="text-xs text-gray-500">
                  <div>Roll No: {gatePass.rollNo}</div>
                  <div>DOB: {formatDate(gatePass.studentDetails.dob)}</div>
                </div>
              </div>

              {/* Guardian Profile */}
              <div className="text-center p-4 rounded-lg border" style={{ 
                borderColor: COLOR_SCHEME.secondary.light,
                backgroundColor: `${COLOR_SCHEME.secondary.main}10` 
              }}>
                <div className="w-20 h-20 mx-auto mb-3 overflow-hidden rounded-lg border-2" style={{ 
                  borderColor: COLOR_SCHEME.secondary.main 
                }}>
                  {gatePass.guardianPhoto ? (
                    <img
                      src={gatePass.guardianPhoto}
                      alt="Guardian"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ 
                      backgroundColor: `${COLOR_SCHEME.secondary.main}20` 
                    }}>
                      <User className="w-10 h-10" style={{ color: COLOR_SCHEME.secondary.main }} />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{gatePass.guardianName}</h3>
                <p className="text-sm text-gray-600 mb-2">{gatePass.guardianType}</p>
                <div className="text-xs text-gray-500">
                  <div>Contact: {gatePass.contact}</div>
                  <div>Aadhar: {gatePass.aadhar}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="mb-6">
            <div className="flex items-center mb-4 pb-2 border-b" style={{ borderColor: `${COLOR_SCHEME.primary.main}40` }}>
              <User className="w-5 h-5 mr-2" style={{ color: COLOR_SCHEME.primary.main }} />
              <h2 className="text-lg font-semibold text-gray-800">Student Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Full Name</span>
                <span className="font-semibold text-gray-800">{gatePass.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class & Section</span>
                <span className="font-semibold text-gray-800">{gatePass.studentClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Roll Number</span>
                <span className="font-semibold text-gray-800">{gatePass.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date of Birth</span>
                <span className="font-semibold text-gray-800">{formatDate(gatePass.studentDetails.dob)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Blood Group</span>
                <span className="font-semibold text-gray-800">{gatePass.studentDetails.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hostel Wing</span>
                <span className="font-semibold text-gray-800">{gatePass.studentDetails.hostelWing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room No</span>
                <span className="font-semibold text-gray-800">{gatePass.studentDetails.roomNo}</span>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="mb-6">
            <div className="flex items-center mb-4 pb-2 border-b" style={{ borderColor: `${COLOR_SCHEME.primary.main}40` }}>
              <Shield className="w-5 h-5 mr-2" style={{ color: COLOR_SCHEME.primary.main }} />
              <h2 className="text-lg font-semibold text-gray-800">Guardian Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Guardian Name</span>
                <span className="font-semibold text-gray-800">{gatePass.guardianName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Relationship</span>
                <span className="font-semibold text-gray-800">{gatePass.guardianType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact Number</span>
                <span className="font-semibold text-gray-800">{gatePass.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email Address</span>
                <span className="font-semibold text-gray-800">{gatePass.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Aadhar Number</span>
                <span className="font-semibold text-gray-800">{gatePass.aadhar}</span>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <div className="p-3 rounded-lg border" style={{ borderColor: COLOR_SCHEME.primary.light, backgroundColor: `${COLOR_SCHEME.primary.main}10` }}>
              <h4 className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2" style={{ color: COLOR_SCHEME.primary.main }} />
                Guardian Address
              </h4>
              <div className="text-gray-700 text-sm">
                {gatePass.address.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Leave Details */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg border" style={{ borderColor: COLOR_SCHEME.primary.light, backgroundColor: `${COLOR_SCHEME.primary.main}10` }}>
              <div className="text-sm text-gray-600 mb-1">Departure</div>
              <div className="font-bold text-gray-900 text-lg mb-1">{formatDate(gatePass.departure)}</div>
              <div className="text-sm font-medium text-gray-800">{formatTime(gatePass.departureTime)}</div>
            </div>
            <div className="text-center p-3 rounded-lg border" style={{ borderColor: COLOR_SCHEME.secondary.light, backgroundColor: `${COLOR_SCHEME.secondary.main}10` }}>
              <div className="text-sm text-gray-600 mb-1">Return</div>
              <div className="font-bold text-gray-900 text-lg mb-1">{formatDate(gatePass.return)}</div>
              <div className="text-sm font-medium text-gray-800">{formatTime(gatePass.returnTime)}</div>
            </div>
          </div>

          {/* Purpose */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Briefcase className="w-4 h-4 mr-2" style={{ color: COLOR_SCHEME.primary.main }} />
              <span className="text-gray-600">Purpose</span>
            </div>
            <div className="p-3 rounded-lg font-medium border" style={{ borderColor: COLOR_SCHEME.primary.light, backgroundColor: `${COLOR_SCHEME.primary.main}10` }}>
              {gatePass.purpose}
            </div>
            {gatePass.additionalNotes && (
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium">Notes:</span> {gatePass.additionalNotes}
              </div>
            )}
          </div>

        

          {/* Identification Section with QR Code */}
          <div className="mb-6 p-4 border rounded-lg" style={{ 
            borderColor: COLOR_SCHEME.primary.light, 
            backgroundColor: `${COLOR_SCHEME.primary.main}05` 
          }}>
            <h4 className="font-bold text-gray-800 mb-4 text-center text-sm">IDENTIFICATION & VERIFICATION</h4>
            <div className="flex justify-between items-center">
              {/* Student Section */}
              <div className="text-center flex-1">
                <div className="w-16 h-16 mx-auto mb-2 overflow-hidden rounded-lg border-2" style={{ 
                  borderColor: COLOR_SCHEME.primary.main 
                }}>
                  <img
                    src={gatePass.studentPhoto}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs font-medium text-gray-700">STUDENT</div>
                <div className="text-xs text-gray-500 truncate">{gatePass.studentName}</div>
              </div>

              {/* QR Code Section */}
              <div className="text-center flex-1">
                <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center rounded-lg" style={{ 
                  backgroundColor: COLOR_SCHEME.primary.main 
                }}>
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <div className="text-xs font-medium text-gray-700">GATE PASS</div>
                <div className="text-xs text-gray-500 font-mono">{gatePass.id}</div>
              </div>

              {/* Guardian Section */}
              <div className="text-center flex-1">
                <div className="w-16 h-16 mx-auto mb-2 overflow-hidden rounded-lg border-2" style={{ 
                  borderColor: COLOR_SCHEME.secondary.main 
                }}>
                  {gatePass.guardianPhoto ? (
                    <img
                      src={gatePass.guardianPhoto}
                      alt="Guardian"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ 
                      backgroundColor: `${COLOR_SCHEME.secondary.main}20` 
                    }}>
                      <User className="w-6 h-6" style={{ color: COLOR_SCHEME.secondary.main }} />
                    </div>
                  )}
                </div>
                <div className="text-xs font-medium text-gray-700">GUARDIAN</div>
                <div className="text-xs text-gray-500 truncate">{gatePass.guardianName}</div>
              </div>
            </div>
          </div>

          {/* Footer */}
        
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-600">Issued by</div>
                <div className="font-medium text-gray-800">{gatePass.issuedBy}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{gatePass.issuedDate}</div>
                <div className="text-sm text-gray-600">{gatePass.issuedTime}</div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-block px-4 py-1 rounded text-xs font-medium text-white" style={{ 
                backgroundColor: COLOR_SCHEME.primary.dark 
              }}>
                {isParentCopy ? 'KEEP FOR YOUR RECORDS' : 'SCHOOL COPY - RETAIN AT GATE'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="max-w-6xl mx-auto">
      {/* Success Message */}
      <div className="rounded-xl shadow-lg p-6 mb-6" style={{ backgroundColor: COLOR_SCHEME.background.card }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLOR_SCHEME.secondary.main}20` }}>
              <CheckCircle className="w-6 h-6" style={{ color: COLOR_SCHEME.secondary.main }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Leave Approved Successfully</h2>
              <p className="text-gray-600">OTP verified and guardian confirmed.</p>
            </div>
          </div>
          
          <button
            onClick={handleCopyToClipboard}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2"
          >
            {copiedToClipboard ? (
              <>
                <Check className="w-5 h-5" style={{ color: COLOR_SCHEME.secondary.main }} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy Details</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Gate Pass Copies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">School Copy</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePrintGatePass('school')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  gatePassPrinted.school
                    ? 'text-white'
                    : 'text-white hover:shadow-md'
                }`}
                style={{ 
                  backgroundColor: gatePassPrinted.school ? COLOR_SCHEME.secondary.main : COLOR_SCHEME.primary.main 
                }}
                onMouseEnter={(e) => {
                  if (!gatePassPrinted.school) {
                    e.target.style.backgroundColor = COLOR_SCHEME.primary.dark;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!gatePassPrinted.school) {
                    e.target.style.backgroundColor = COLOR_SCHEME.primary.main;
                  }
                }}
              >
                {gatePassPrinted.school ? '✓ Printed' : 'Print'}
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm transition-all "  onClick={() => handleDownloadGatePass("school")}>
                Download
              </button>
            </div>
          </div>
          <div ref={schoolCopyRef}>
  <GatePassPreview isParentCopy={false} />
</div>

        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Parent Copy</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePrintGatePass('parent')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  gatePassPrinted.parent
                    ? 'text-white'
                    : 'text-white hover:shadow-md'
                }`}
                style={{ 
                  backgroundColor: gatePassPrinted.parent ? COLOR_SCHEME.secondary.main : COLOR_SCHEME.secondary.main 
                }}
                onMouseEnter={(e) => {
                  if (!gatePassPrinted.parent) {
                    e.target.style.backgroundColor = COLOR_SCHEME.secondary.dark;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!gatePassPrinted.parent) {
                    e.target.style.backgroundColor = COLOR_SCHEME.secondary.main;
                  }
                }}
              >
                {gatePassPrinted.parent ? '✓ Printed' : 'Print'}
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm transition-all">
                SMS
              </button>
            </div>
          </div>
         <div ref={parentCopyRef}>
  <GatePassPreview isParentCopy={true} />
</div>

        </div>
      </div>

      {/* New Request Button */}
      <div className="text-center">
        <button
          onClick={() => {
            setGatePass(null);
            setStep(1);
            setSelectedStudent(null);
            setSelectedGuardian(null);
            setGuardianPhoto(null);
            setStudentPhoto(null);
            setOtpSent(false);
         
            setVerificationStatus('');
            setGatePassPrinted({ school: false, parent: false });
            setGuardianType('');
            setNewGuardian({
              name: '',
              mobile: DEFAULT_MOBILE_NUMBER,
              aadhar: '',
              address: '',
              email: '',
              relationship: ''
            });
            setMobileError('');
            setAadharError('');
          }}
          className="px-6 py-3 text-white rounded-lg hover:shadow-md font-medium transition-all"
          style={{ backgroundColor: COLOR_SCHEME.primary.main }}
          onMouseEnter={(e) => e.target.style.backgroundColor = COLOR_SCHEME.primary.dark}
          onMouseLeave={(e) => e.target.style.backgroundColor = COLOR_SCHEME.primary.main}
        >
          Create New Leave Request
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-6"
      style={{ background: COLOR_SCHEME.background.main }}
    >
      <BackButton to="/staff/dashboard" />
      {showCamera && (
        <CameraCapture
          onCapture={handleCapturePhoto}
          onClose={() => setShowCamera(false)}
          title={cameraType === 'student' ? "Capture Student Photo" : "Capture Guardian Photo"}
          type={cameraType}
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: COLOR_SCHEME.primary.main }}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Residential School Gate Pass</h1>
          </div>
          <p className="text-white/90">Secure leave management system with live photo capture</p>
        </header>
        
        <div className="mb-6">
          <div className="flex justify-center space-x-1 mb-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className={`flex flex-col items-center ${
                  stepNum <= step ? 'text-white' : 'text-white/70'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    stepNum <= step 
                      ? stepNum === step 
                        ? 'ring-2 ring-white ring-offset-2' 
                        : ''
                      : ''
                  }`}
                  style={{ 
                    backgroundColor: stepNum <= step 
                      ? stepNum === step 
                        ? COLOR_SCHEME.primary.main
                        : stepNum < step
                        ? COLOR_SCHEME.secondary.main
                        : 'white'
                      : 'rgba(255,255,255,0.2)',
                    color: stepNum <= step 
                      ? stepNum === step || stepNum < step
                        ? 'white'
                        : COLOR_SCHEME.primary.main
                      : 'white'
                  }}
                  >
                    {stepNum < step ? '✓' : stepNum}
                  </div>
                  <span className="text-xs mt-1">
                    {stepNum === 1 && 'Select Student'}
                    {stepNum === 2 && 'Details & Photos'}
                    {stepNum === 3 && 'OTP Verify'}
                    {stepNum === 4 && 'Gate Pass'}
                  </span>
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-0.5 self-center transition-all ${
                    stepNum < step ? 'bg-white' : 'bg-white/30'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default StudentLeaveRequest;
