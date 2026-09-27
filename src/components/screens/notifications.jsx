import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Home,
  Users,
  History,
  Settings,
} from "lucide-react";
import "../styles/Notifications.css";

// SVG Alarm Clock Icon (matching green alarm icon)
const AlarmClockIcon = ({ size = 20, color = "#ffffff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2 2" />
    <path d="M5 3L2 6" />
    <path d="M19 3l3 3" />
  </svg>
);

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminderAlarm",
      title: "Setup Database Schema",
      message: 'Task "Setup Database Schema" has been marked as Done.',
      date: "2026-09-01 10:00:00",
      timestamp: "8/27/2026, 1:24:19 PM",
      isRead: false,
    },
    {
      id: 2,
      type: "reminder",
      title: "Submit Sprint Report",
      message: 'Reminder: "Review Code Pull Request" is due today at 16:00.',
      date: null,
      timestamp: "8/27/2026, 1:24:19 PM",
      isRead: false,
    },
    {
      id: 3,
      type: "reminder",
      title: "Buy Household Supplies",
      message: 'Task "Buy Household Supplies" was cancelled.',
      date: null,
      timestamp: "8/27/2026, 1:24:19 PM",
      isRead: false,
    },
  ]);

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  return (
    <div className="notif-page-container">
      {/* Top Navigation Bar */}
      <header className="notif-top-bar">
        <button
          className="notif-icon-btn back-btn"
          onClick={() => navigate("/dashboard")}
          aria-label="Go Back"
        >
          <ArrowLeft size={20} color="#000000" strokeWidth={2.5} />
        </button>

        <div className="notif-page-pill">
          <span>NOTIFICATIONS</span>
        </div>

        <div className="top-spacer"></div>
      </header>

      {/* Main Notifications List Container */}
      <main className="notif-content-body">
        {notifications.map((notif) => {
          const isAlarm = notif.type === "reminderAlarm";

          return (
            <div
              key={notif.id}
              className={`notif-card ${notif.isRead ? "read-state" : ""}`}
            >
              <div className="notif-card-header">
                {/* Left Circle Icon */}
                <div
                  className={`notif-avatar ${
                    isAlarm ? "bg-alarm-green" : "bg-reminder-orange"
                  }`}
                >
                  {isAlarm ? (
                    <AlarmClockIcon size={20} color="#ffffff" />
                  ) : (
                    <Bell size={20} color="#ffffff" />
                  )}
                </div>

                {/* Main Text Content */}
                <div className="notif-text-content">
                  <div className="notif-title-row">
                    <h3 className="notif-item-title">{notif.title}</h3>
                    <div className="notif-right-corner-icon">
                      {isAlarm ? (
                        <AlarmClockIcon size={18} color="#22c55e" />
                      ) : (
                        <Bell size={18} color="#f59e0b" />
                      )}
                    </div>
                  </div>

                  <p className="notif-item-message">{notif.message}</p>

                  {/* Scheduled Date Pill */}
                  {notif.date && (
                    <div className="notif-date-badge">
                      <Calendar size={13} color="#475569" />
                      <span>{notif.date}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Divider & Timestamp */}
              <div className="notif-card-footer">
                <span className="notif-timestamp">{notif.timestamp}</span>
                <button
                  className={`read-btn ${notif.isRead ? "active-read" : ""}`}
                  onClick={() => toggleRead(notif.id)}
                >
                  {notif.isRead ? "READ ✓" : "READ"}
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* Bottom Nav Bar */}
      <nav className="notif-bottom-nav">
        <button
          className="notif-nav-item"
          onClick={() => navigate("/dashboard")}
        >
          <Home size={22} />
          <span>Home</span>
        </button>

        <button
          className="notif-nav-item"
          onClick={() => navigate("/contacts")}
        >
          <Users size={22} />
          <span>Contacts</span>
        </button>

        <button className="notif-nav-item" onClick={() => navigate("/history")}>
          <History size={22} />
          <span>History</span>
        </button>

        <button
          className="notif-nav-item"
          onClick={() => navigate("/settings")}
        >
          <Settings size={22} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}