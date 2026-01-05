// Timetable.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const Timetable = () => {
  // Days of the week
  const days = [
    { id: 'mon', name: 'Monday', short: 'Mon' },
    { id: 'tue', name: 'Tuesday', short: 'Tue' },
    { id: 'wed', name: 'Wednesday', short: 'Wed' },
    { id: 'thu', name: 'Thursday', short: 'Thu' },
    { id: 'fri', name: 'Friday', short: 'Fri' },
    { id: 'sat', name: 'Saturday', short: 'Sat' },
    { id: 'sun', name: 'Sunday', short: 'Sun' }
  ];

  // Time periods with names
  const periods = [
    { id: 'p1', time: '8:00 - 9:00', name: 'Period 1' },
    { id: 'p2', time: '9:00 - 10:00', name: 'Period 2' },
    { id: 'p3', time: '10:00 - 11:00', name: 'Period 3' },
    { id: 'p4', time: '11:00 - 12:00', name: 'Period 4' },
    { id: 'p5', time: '12:00 - 13:00', name: 'Period 5' },
    { id: 'p6', time: '13:00 - 14:00', name: 'Period 6' },
    { id: 'p7', time: '14:00 - 15:00', name: 'Period 7' },
    { id: 'p8', time: '15:00 - 16:00', name: 'Period 8' },
    { id: 'p9', time: '16:00 - 17:00', name: 'Period 9' }
  ];

  // Available subjects
  const availableSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Business Studies',
    'Art', 'Music', 'Physical Education', 'Languages', 'Elective'
  ];

  // Color schemes for subjects
  const subjectColors = {
    'Mathematics': 'bg-red-50 border-red-200 text-red-800',
    'Physics': 'bg-blue-50 border-blue-200 text-blue-800',
    'Chemistry': 'bg-green-50 border-green-200 text-green-800',
    'Biology': 'bg-emerald-50 border-emerald-200 text-emerald-800',
    'Computer Science': 'bg-purple-50 border-purple-200 text-purple-800',
    'English': 'bg-amber-50 border-amber-200 text-amber-800',
    'History': 'bg-orange-50 border-orange-200 text-orange-800',
    'Geography': 'bg-teal-50 border-teal-200 text-teal-800',
    'Economics': 'bg-indigo-50 border-indigo-200 text-indigo-800',
    'Business Studies': 'bg-pink-50 border-pink-200 text-pink-800',
    'Art': 'bg-yellow-50 border-yellow-200 text-yellow-800',
    'Music': 'bg-cyan-50 border-cyan-200 text-cyan-800',
    'Physical Education': 'bg-lime-50 border-lime-200 text-lime-800',
    'Languages': 'bg-violet-50 border-violet-200 text-violet-800',
    'Elective': 'bg-gray-50 border-gray-200 text-gray-800',
    'default': 'bg-gray-50 border-gray-200 text-gray-800'
  };

  // Initial schedule data
  const initialSchedule = {
    mon: {
      p1: { subject: 'Mathematics', teacher: 'Mr. Smith', room: '301' },
      p3: { subject: 'Physics', teacher: 'Ms. Johnson', room: 'Lab 1' },
      p5: { subject: 'English', teacher: 'Mrs. Wilson', room: '105' },
      p7: { subject: 'Computer Science', teacher: 'Dr. Brown', room: 'Lab 2' }
    },
    tue: {
      p2: { subject: 'Chemistry', teacher: 'Dr. Taylor', room: 'Lab 3' },
      p4: { subject: 'Biology', teacher: 'Ms. Davis', room: '204' },
      p6: { subject: 'History', teacher: 'Mr. Clark', room: '108' },
      p8: { subject: 'Art', teacher: 'Mrs. Lee', room: 'Studio' }
    },
    wed: {
      p1: { subject: 'Mathematics', teacher: 'Mr. Smith', room: '301' },
      p3: { subject: 'Physical Education', teacher: 'Coach Miller', room: 'Ground' },
      p5: { subject: 'Geography', teacher: 'Mr. White', room: '207' },
      p7: { subject: 'Music', teacher: 'Mrs. Harris', room: 'Music Room' }
    },
    thu: {
      p2: { subject: 'Economics', teacher: 'Mr. Moore', room: '209' },
      p4: { subject: 'Business Studies', teacher: 'Ms. Thompson', room: '210' },
      p6: { subject: 'Languages', teacher: 'Mrs. Garcia', room: '211' },
      p8: { subject: 'Elective', teacher: 'Various', room: 'Various' }
    },
    fri: {
      p1: { subject: 'Physics', teacher: 'Ms. Johnson', room: 'Lab 1' },
      p3: { subject: 'Chemistry', teacher: 'Dr. Taylor', room: 'Lab 3' },
      p5: { subject: 'Computer Science', teacher: 'Dr. Brown', room: 'Lab 2' },
      p7: { subject: 'Project Work', teacher: 'Various', room: 'Various' }
    },
    sat: {
      p2: { subject: 'Club Activities', teacher: 'Various', room: 'Various' },
      p4: { subject: 'Sports', teacher: 'Coaches', room: 'Field' }
    },
    sun: {} // Sunday is typically off
  };

  // State management
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('timetableData');
    return saved ? JSON.parse(saved) : initialSchedule;
  });
  
  const [isPublished, setIsPublished] = useState(() => {
    const saved = localStorage.getItem('timetablePublished');
    return saved === 'true';
  });
  
  const [editingCell, setEditingCell] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [highlightPeriod, setHighlightPeriod] = useState(null);
  const [newClass, setNewClass] = useState({
    day: 'mon',
    period: 'p1',
    subject: '',
    teacher: '',
    room: ''
  });

  // Save to localStorage whenever schedule changes
  useEffect(() => {
    localStorage.setItem('timetableData', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('timetablePublished', isPublished.toString());
  }, [isPublished]);

  // Auto-highlight current period based on time
  useEffect(() => {
    const checkCurrentPeriod = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute;

      const period = periods.find(p => {
        const [start, end] = p.time.split(' - ');
        const [startHour, startMin] = start.split(':').map(Number);
        const [endHour, endMin] = end.split(':').map(Number);
        const startTime = startHour * 60 + startMin;
        const endTime = endHour * 60 + endMin;
        return currentTime >= startTime && currentTime < endTime;
      });

      setHighlightPeriod(period ? period.id : null);
    };

    checkCurrentPeriod();
    const interval = setInterval(checkCurrentPeriod, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Handle cell click for editing
  const handleCellClick = (dayId, periodId) => {
    const existingClass = schedule[dayId]?.[periodId];
    if (existingClass) {
      setEditingCell({
        day: dayId,
        period: periodId,
        ...existingClass,
        originalDay: dayId,
        originalPeriod: periodId
      });
    } else {
      setNewClass({
        day: dayId,
        period: periodId,
        subject: '',
        teacher: '',
        room: ''
      });
      setShowAddForm(true);
    }
  };

  // Save edited class
  const handleSaveEdit = () => {
    if (!editingCell.subject.trim()) {
      alert('Please enter a subject');
      return;
    }

    const updatedSchedule = { ...schedule };
    
    // Remove from original slot if day or period changed
    if (editingCell.originalDay && editingCell.originalPeriod) {
      if (updatedSchedule[editingCell.originalDay]?.[editingCell.originalPeriod]) {
        delete updatedSchedule[editingCell.originalDay][editingCell.originalPeriod];
      }
    }

    // Add to new slot
    if (!updatedSchedule[editingCell.day]) {
      updatedSchedule[editingCell.day] = {};
    }

    updatedSchedule[editingCell.day][editingCell.period] = {
      subject: editingCell.subject,
      teacher: editingCell.teacher,
      room: editingCell.room
    };

    setSchedule(updatedSchedule);
    setEditingCell(null);
  };

  // Add new class
  const handleAddClass = () => {
    if (!newClass.subject.trim()) {
      alert('Please select a subject');
      return;
    }

    const updatedSchedule = { ...schedule };
    if (!updatedSchedule[newClass.day]) {
      updatedSchedule[newClass.day] = {};
    }

    updatedSchedule[newClass.day][newClass.period] = {
      subject: newClass.subject,
      teacher: newClass.teacher,
      room: newClass.room
    };

    setSchedule(updatedSchedule);
    setShowAddForm(false);
    setNewClass({
      day: 'mon',
      period: 'p1',
      subject: '',
      teacher: '',
      room: ''
    });
  };

  // Delete class
  const handleDeleteClass = (dayId, periodId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      const updatedSchedule = { ...schedule };
      if (updatedSchedule[dayId]?.[periodId]) {
        delete updatedSchedule[dayId][periodId];
        setSchedule(updatedSchedule);
      }
    }
  };

  // Handle publish/unpublish
  const handlePublishToggle = () => {
    const newStatus = !isPublished;
    setIsPublished(newStatus);
    alert(`Timetable ${newStatus ? 'published' : 'unpublished'} successfully!`);
  };

  // Export timetable
  const handleExport = () => {
    const dataStr = JSON.stringify(schedule, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'timetable-schedule.json';
    link.click();
  };

  // Import timetable
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSchedule = JSON.parse(e.target.result);
        setSchedule(importedSchedule);
        alert('Timetable imported successfully!');
      } catch (error) {
        alert('Error importing file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default schedule?')) {
      setSchedule(initialSchedule);
      setIsPublished(false);
    }
  };

  // Get subject color
  const getSubjectColor = (subject) => {
    return subjectColors[subject] || subjectColors.default;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header/>
        <div className="mt-4">
          <BackButton />
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Academic Timetable</h1>
          <p className="text-gray-600 mt-2">Manage your weekly schedule efficiently</p>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Left side controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search subjects, teachers, rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </div>
              </div>

              {/* Publish Status */}
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-lg font-medium ${isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {isPublished ? '✅ Published' : '📝 Draft'}
                </div>
                <button
                  onClick={handlePublishToggle}
                  className={`px-4 py-2 rounded-lg font-medium text-white ${isPublished ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {isPublished ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center gap-2"
              >
                <span>+ Add Class</span>
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium flex items-center gap-2"
              >
                <span>💾 Export</span>
              </button>
              <label className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium flex items-center gap-2 cursor-pointer">
                <span>📁 Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium flex items-center gap-2"
              >
                <span>🔄 Reset</span>
              </button>
            </div>
          </div>

          {/* Current Time Highlight */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Current period highlighted in blue</span>
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-8">
          {/* Header Row - Periods */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-4 bg-gray-50 font-semibold text-gray-700">Day/Period</div>
            {periods.map(period => (
              <div
                key={period.id}
                className={`p-4 text-center border-l border-gray-200 ${highlightPeriod === period.id ? 'bg-blue-50' : 'bg-gray-50'}`}
              >
                <div className="font-semibold text-gray-800">{period.name}</div>
                <div className="text-sm text-gray-600 mt-1">{period.time}</div>
              </div>
            ))}
          </div>

          {/* Days Rows */}
          {days.map(day => (
            <div key={day.id} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
              {/* Day Column */}
              <div className="p-4 bg-gray-50 border-r border-gray-200">
                <div className="font-semibold text-gray-800">{day.name}</div>
                <div className="text-sm text-gray-600">{day.short}</div>
              </div>

              {/* Period Cells */}
              {periods.map(period => {
                const classInfo = schedule[day.id]?.[period.id];
                const isCurrentPeriod = highlightPeriod === period.id;
                
                return (
                  <div
                    key={`${day.id}-${period.id}`}
                    className={`p-3 border-l border-gray-200 min-h-[100px] flex items-center justify-center cursor-pointer transition-all duration-200 ${isCurrentPeriod ? 'bg-blue-50' : ''}`}
                    onClick={() => handleCellClick(day.id, period.id)}
                  >
                    {classInfo ? (
                      <div className={`w-full h-full p-3 rounded-lg border ${getSubjectColor(classInfo.subject)} flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow`}>
                        <div className="font-semibold text-sm md:text-base">{classInfo.subject}</div>
                        <div className="text-xs text-gray-600 mt-1">{classInfo.teacher}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{classInfo.room}</div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCell({
                              day: day.id,
                              period: period.id,
                              ...classInfo,
                              originalDay: day.id,
                              originalPeriod: period.id
                            });
                          }}
                          className="mt-2 text-xs px-2 py-1 bg-white bg-opacity-80 rounded hover:bg-opacity-100"
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-600">
                        <span className="text-2xl">+</span>
                        <span className="text-xs mt-1">Add Class</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Color Legend */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Subject Colors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {availableSubjects.slice(0, 10).map(subject => (
              <div key={subject} className="flex items-center">
                <div className={`w-4 h-4 rounded mr-2 ${getSubjectColor(subject).split(' ')[0]}`}></div>
                <span className="text-sm text-gray-600">{subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Form Modal */}
        {editingCell && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-800">Edit Class</h3>
                <button
                  onClick={() => setEditingCell(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                  <select
                    value={editingCell.day}
                    onChange={(e) => setEditingCell({...editingCell, day: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {days.map(day => (
                      <option key={day.id} value={day.id}>{day.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <select
                    value={editingCell.period}
                    onChange={(e) => setEditingCell({...editingCell, period: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {periods.map(period => (
                      <option key={period.id} value={period.id}>{period.name} ({period.time})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    value={editingCell.subject}
                    onChange={(e) => setEditingCell({...editingCell, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    {availableSubjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
                  <input
                    type="text"
                    value={editingCell.teacher}
                    onChange={(e) => setEditingCell({...editingCell, teacher: e.target.value})}
                    placeholder="Teacher's name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                  <input
                    type="text"
                    value={editingCell.room}
                    onChange={(e) => setEditingCell({...editingCell, room: e.target.value})}
                    placeholder="Room number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => handleDeleteClass(editingCell.originalDay, editingCell.originalPeriod)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
                >
                  Delete Class
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingCell(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Class Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Class</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                  <select
                    value={newClass.day}
                    onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {days.map(day => (
                      <option key={day.id} value={day.id}>{day.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <select
                    value={newClass.period}
                    onChange={(e) => setNewClass({...newClass, period: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {periods.map(period => (
                      <option key={period.id} value={period.id}>{period.name} ({period.time})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    value={newClass.subject}
                    onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    {availableSubjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
                  <input
                    type="text"
                    value={newClass.teacher}
                    onChange={(e) => setNewClass({...newClass, teacher: e.target.value})}
                    placeholder="Teacher's name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                  <input
                    type="text"
                    value={newClass.room}
                    onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                    placeholder="Room number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddClass}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Schedule Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {Object.values(schedule).reduce((total, day) => total + Object.keys(day || {}).length, 0)}
              </div>
              <div className="text-gray-600">Total Classes</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{days.length}</div>
              <div className="text-gray-600">Days</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{periods.length}</div>
              <div className="text-gray-600">Periods</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {new Set(Object.values(schedule).flatMap(day => Object.values(day || {}).map(c => c.subject))).size}
              </div>
              <div className="text-gray-600">Unique Subjects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;