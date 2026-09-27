import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  ArrowLeftRight, 
  Clock, 
  ChevronRight, 
  ChevronDown, 
  Bell, 
  Moon, 
  LogOut, 
  Home, 
  Users 
} from 'lucide-react';
import '../styles/setting.css';

function Setting() {
  const navigate = useNavigate();
  const [snoozeTime, setSnoozeTime] = useState('5 min');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    // Add logout cleanup logic here
    navigate('/login');
  };

  return (
    <div className="settings-wrapper">
      
      {/* Top Header Bar */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={18} color="#000000" strokeWidth={2.5} />
        </button>
        
        <div className="page-pill">
          <SettingsIcon size={18} color="#1e293b"  />
          <span>SETTINGS</span>
        </div>
      </div>

      {/* Main Wide Content Area */}
      <div className="settings-content">
        
        {/* PERSONAL INFO SECTION */}
        <div className="section-group">
          <h2 className="section-title">PERSONAL INFO</h2>
          
          <div className="settings-card">
            <button className="card-row" onClick={() => navigate('/history')}>
              <div className="row-left">
                <div className="icon-badge">
                  <ArrowLeftRight size={18} color="#1e293b" />
                </div>
                <span className="row-label bold">HISTORY</span>
              </div>
              <ChevronRight size={18} color="#64748b" />
            </button>

            <div className="card-divider" />

            <div className="card-row">
              <div className="row-left">
                <div className="icon-badge">
                  <Clock size={18} color="#1e293b" />
                </div>
                <div className="row-text">
                  <span className="row-sublabel">Snooze Duration</span>
                  <span className="row-label bold">Snooze Time : {snoozeTime}</span>
                </div>
              </div>
              <ChevronDown size={18} color="#64748b" />
            </div>
          </div>
        </div>

        {/* PREFERENCES SECTION */}
        <div className="section-group">
          <h2 className="section-title">PREFERENCES</h2>
          
          <div className="settings-card">
            <div className="card-row">
              <div className="row-left">
                <div className="icon-badge">
                  <Bell size={18} color="#1e293b" />
                </div>
                <span className="row-label">Notification</span>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications} 
                  onChange={() => setNotifications(!notifications)} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="card-divider" />

            <div className="card-row">
              <div className="row-left">
                <div className="icon-badge">
                  <Moon size={18} color="#1e293b" />
                </div>
                <span className="row-label">Dark Mode</span>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={() => setDarkMode(!darkMode)} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} color="#ffffff" />
          <span>LOGOUT</span>
        </button>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav">
        <button className="nav-item" onClick={() => navigate('/home')}>
          <Home size={22} color="#94a3b8" />
        </button>
        <button className="nav-item" onClick={() => navigate('/users')}>
          <Users size={22} color="#94a3b8" />
        </button>
        <button className="nav-item" onClick={() => navigate('/history')}>
          <Clock size={22} color="#94a3b8" />
        </button>
        <button className="nav-item active">
          <div className="active-icon-badge">
            <SettingsIcon size={20} color="#1e293b" />
          </div>
        </button>
      </div>

    </div>
  );
}

export default Setting;