import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const Announcements = ({ role }) => {
  // Get initial data from localStorage or use default mock data
  const getInitialAnnouncements = () => {
    const saved = localStorage.getItem('school_announcements');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Default announcements if nothing in localStorage
    return [
      {
        id: '1',
        title: 'Welcome Back to School',
        message: 'Welcome back students and staff! We hope you had a wonderful break. Classes begin on Monday at 8:00 AM sharp.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Principal'
      },
      {
        id: '2',
        title: 'Parent-Teacher Meetings',
        message: 'Quarterly parent-teacher meetings will be held next week. Please schedule your appointments through the school portal.',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Vice Principal'
      },
      {
        id: '3',
        title: 'Sports Day Announcement',
        message: 'Annual sports day will be held on January 25th. Practice sessions begin Monday. All houses must submit participant lists by Friday.',
        date: new Date().toISOString(),
        author: 'Sports Department'
      }
    ];
  };

  const [announcements, setAnnouncements] = useState(getInitialAnnouncements);
  const [editId, setEditId] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '' });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showNotification, setShowNotification] = useState(false);

  // 🔹 Save announcements to localStorage and trigger sync
  const saveAnnouncements = (updatedAnnouncements) => {
    localStorage.setItem('school_announcements', JSON.stringify(updatedAnnouncements));
    setLastUpdated(new Date());
    
    // Trigger custom event for real-time sync across tabs/components
    const event = new CustomEvent('announcementsUpdated', {
      detail: { 
        announcements: updatedAnnouncements,
        timestamp: new Date().toISOString(),
        updatedBy: role
      }
    });
    window.dispatchEvent(event);
    
    // Show notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // 🔹 Listen for announcement updates from other tabs/components
  useEffect(() => {
    const handleAnnouncementsUpdate = (event) => {
      setAnnouncements(event.detail.announcements);
      setLastUpdated(new Date(event.detail.timestamp));
      
      // Show notification if updated by other role
      if (event.detail.updatedBy !== role) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    };

    window.addEventListener('announcementsUpdated', handleAnnouncementsUpdate);
    
    // Also listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'school_announcements') {
        const updated = JSON.parse(e.newValue || '[]');
        setAnnouncements(updated);
        setLastUpdated(new Date());
        
        // Show notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Auto-refresh every 30 seconds to check for updates
    const interval = setInterval(() => {
      const saved = localStorage.getItem('school_announcements');
      if (saved) {
        const current = JSON.stringify(announcements);
        if (saved !== current) {
          setAnnouncements(JSON.parse(saved));
        }
      }
    }, 30000);

    return () => {
      window.removeEventListener('announcementsUpdated', handleAnnouncementsUpdate);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [announcements, role]);

  // 🔹 Add new announcement (Principal only)
  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.message.trim()) {
      alert('Please fill in both title and message');
      return;
    }

    const newAnn = {
      id: Date.now().toString(),
      title: newAnnouncement.title.trim(),
      message: newAnnouncement.message.trim(),
      date: new Date().toISOString(),
      author: role === 'principal' ? 'Principal' : 'Admin'
    };

    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    saveAnnouncements(updated);
    setNewAnnouncement({ title: '', message: '' });
  };

  // 🔹 Update announcement (Principal only)
  const handleUpdateAnnouncement = (id) => {
    const updated = announcements.map(ann => 
      ann.id === id 
        ? { ...ann, title: editTitle.trim(), message: editMessage.trim() }
        : ann
    );
    
    setAnnouncements(updated);
    saveAnnouncements(updated);
    setEditId(null);
  };

  // 🔹 Delete announcement (Principal only)
  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      const updated = announcements.filter(ann => ann.id !== id);
      setAnnouncements(updated);
      saveAnnouncements(updated);
    }
  };

  // 🔹 Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 🔹 Format time since last update
  const formatTimeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  // 🔹 Start editing
  const startEdit = (announcement) => {
    setEditId(announcement.id);
    setEditTitle(announcement.title);
    setEditMessage(announcement.message);
  };

  // 🔹 Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg max-w-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Announcements Updated!</p>
                <p className="text-xs mt-1">Changes will appear on all dashboards automatically.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <Header />
      <div className="px-4 md:px-6 pt-4">
        <BackButton />
      </div>
      
      <div className="flex-grow p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 shadow-xl mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <span className="text-2xl">📢</span>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">School Announcements</h1>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${role === 'principal' ? 'bg-green-500/30 text-green-100' : 'bg-blue-500/30 text-blue-100'}`}>
                        {role === 'principal' ? '🛠️ Edit Mode' : '👁️ View Only'}
                      </span>
                      <span className="text-white/80 text-sm">
                        {announcements.length} announcement{announcements.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sync Status */}
              <div className="mt-4 md:mt-0">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-ping absolute"></div>
                      <div className="h-2 w-2 bg-green-500 rounded-full relative"></div>
                    </div>
                    <div className="text-white/90 text-sm">
                      <p className="font-medium">Live Sync Active</p>
                      <p className="text-white/70 text-xs">Updated {formatTimeSince(lastUpdated)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Announcement Form (Principal only) */}
          {role === 'principal' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <span className="text-blue-600">✨</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Create New Announcement</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Announcement Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Important Notice About Holidays"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Announcement Message
                  </label>
                  <textarea
                    placeholder="Enter the detailed message here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    rows="3"
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="text-sm text-gray-500">
                    Changes will automatically sync with Staff dashboard
                  </div>
                  <button 
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    onClick={handleAddAnnouncement}
                    disabled={!newAnnouncement.title.trim() || !newAnnouncement.message.trim()}
                  >
                    <span>📝</span>
                    <span>Publish Announcement</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sync Indicator */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-green-800">Real-time Sync Active</p>
                  <p className="text-sm text-green-600">
                    Announcements update automatically across all dashboards
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                </div>
                <span className="text-xs text-green-600 font-medium">LIVE</span>
              </div>
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4 opacity-20">📭</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Announcements Yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {role === 'principal' 
                    ? 'Create your first announcement using the form above' 
                    : 'Check back later for announcements from the Principal'}
                </p>
                {role === 'principal' && (
                  <button 
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setNewAnnouncement({
                        title: 'First Announcement',
                        message: 'Welcome everyone! This is your first announcement.'
                      });
                    }}
                  >
                    Create Sample Announcement
                  </button>
                )}
              </div>
            ) : (
              announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  {/* Edit Mode */}
                  {role === 'principal' && editId === announcement.id ? (
                    <div className="p-6 bg-blue-50">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                          </label>
                          <textarea
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            rows="4"
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-3 pt-2">
                          <button 
                            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
                            onClick={() => handleUpdateAnnouncement(announcement.id)}
                          >
                            <span>💾</span>
                            <span>Save Changes</span>
                          </button>
                          <button 
                            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                            onClick={cancelEdit}
                          >
                            <span>❌</span>
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{announcement.title}</h3>
                            {announcement.id === '1' && (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                                Important
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-lg">
                            {announcement.message}
                          </p>
                        </div>
                        
                        {role === 'principal' && !editId && (
                          <div className="flex space-x-2 ml-4">
                            <button 
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => startEdit(announcement)}
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              onClick={() => handleDeleteAnnouncement(announcement.id)}
                              title="Delete"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span className="font-medium">By:</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full">
                              {announcement.author}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>📅</span>
                            <span>{formatDate(announcement.date)}</span>
                          </div>
                        </div>
                        
                        {role !== 'principal' && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                            View Only
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-gray-500 text-sm">
              <p className="mb-2">
                <span className="font-medium">Real-time Sync Status:</span>{' '}
                <span className="text-green-600 font-medium">● Active</span> • 
                Using localStorage for data persistence • 
                Updates sync automatically across all open dashboards
              </p>
              <p className="text-gray-400">
                Last sync: {lastUpdated.toLocaleTimeString()} • 
                Total announcements: {announcements.length} • 
                Role: <span className="font-medium">{role === 'principal' ? 'Principal' : 'Staff'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Announcements;