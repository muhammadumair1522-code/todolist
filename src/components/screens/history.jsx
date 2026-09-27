import React, { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Check,
  Calendar,
  ChevronRight,
  List,
  Home,
  Users,
  History as HistoryIcon,
  Settings,
  MapPin,
} from "lucide-react";
import "../styles/History.css";

// Initial Mock Data including Location-Based tasks
const TIME_BASED_TASKS = {
  pending: [
    { id: 1, title: "Go to market", time: "2026-09-05 22:30:00" },
    { id: 2, title: "Go to school", time: "2026-09-05 22:30:00" },
    { id: 3, title: "Mannan and Zaryab and Mesam", time: "2026-09-10 03:20:02" },
    { id: 4, title: "Meeting with supervisor", time: "2026-09-10 12:30:00" },
  ],
  completed: [
    { id: 5, title: "Transform a ppt", time: "2026-09-02 21:56:00" },
  ],
  upcoming: [
    { id: 6, title: "Mannan and Zaryab and Mesam", time: "2026-09-10 03:20:02" },
  ],
};

const NON_TIME_BASED_TASKS = {
  pending: [
    { id: 101, title: "Jfjdhfy", date: "2026-08-29" },
    { id: 102, title: "Grocery", date: "2026-09-03" },
    { id: 103, title: "Meet me", date: "2026-09-05" },
    { id: 104, title: "Zaryab birthday??", date: "2026-09-05" },
  ],
};

const LOCATION_BASED_TASKS = {
  pending: [
    { id: 201, title: "Pickup yogurt at grocery store", location: "Super Market, F-6 Markaz", date: "2026-02-20" },
    { id: 202, title: "Drop parcel at post office", location: "Main Boulevard", date: "2026-02-22" },
  ],
};

export default function History() {
  const [activeTab, setActiveTab] = useState("time-based"); // "time-based" | "non-time-based" | "location-based"
  const [activeNav, setActiveNav] = useState("history");

  return (
    <div className="history-wrapper">
      {/* Top Header Bar */}
      <header className="history-top-bar">
        <button className="history-back-btn" aria-label="Go back">
          <ArrowLeft size={18} color="#000000" strokeWidth={2.5} />
        </button>

        <div className="history-page-pill">
          <span>
            {activeTab === "time-based" && "Task History"}
            {activeTab === "non-time-based" && "Non-Time History"}
            {activeTab === "location-based" && "Location History"}
          </span>
        </div>
      </header>

      {/* Toggle Selector Segment (3 Buttons) */}
      <div className="history-content">
        <div className="toggle-segment-card three-tabs">
          <button
            className={`toggle-tab ${activeTab === "time-based" ? "active" : ""}`}
            onClick={() => setActiveTab("time-based")}
          >
            <Clock size={15} />
            <span>Time Based</span>
          </button>
          
          <button
            className={`toggle-tab ${activeTab === "non-time-based" ? "active" : ""}`}
            onClick={() => setActiveTab("non-time-based")}
          >
            <List size={15} />
            <span>Non-Time</span>
          </button>

          <button
            className={`toggle-tab ${activeTab === "location-based" ? "active" : ""}`}
            onClick={() => setActiveTab("location-based")}
          >
            <MapPin size={15} />
            <span>Location</span>
          </button>
        </div>

        {/* TIME BASED VIEW */}
        {activeTab === "time-based" && (
          <div className="history-sections">
            {/* Pending Section */}
            <div className="status-group">
              <div className="status-header">
                <h3>Pending</h3>
                <span className="count-badge orange-badge">
                  {TIME_BASED_TASKS.pending.length}
                </span>
              </div>
              <div className="history-cards-list">
                {TIME_BASED_TASKS.pending.map((task) => (
                  <div key={task.id} className="time-card accent-orange">
                    <div className="card-left-info">
                      <h4 className="task-name">{task.title}</h4>
                      <div className="time-subtext">
                        <Clock size={12} color="#94a3b8" />
                        <span>{task.time}</span>
                      </div>
                    </div>
                    <div className="card-right-badge orange-clock">
                      <Clock size={16} color="#f59e0b" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Section */}
            <div className="status-group">
              <div className="status-header">
                <h3>Completed</h3>
                <span className="count-badge green-badge">
                  {TIME_BASED_TASKS.completed.length}
                </span>
              </div>
              <div className="history-cards-list">
                {TIME_BASED_TASKS.completed.map((task) => (
                  <div key={task.id} className="time-card accent-green">
                    <div className="card-left-info">
                      <h4 className="task-name strike-through">{task.title}</h4>
                      <div className="time-subtext">
                        <Clock size={12} color="#94a3b8" />
                        <span>{task.time}</span>
                      </div>
                    </div>
                    <div className="card-right-badge green-check">
                      <Check size={14} color="#ffffff" strokeWidth={3} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Section */}
            <div className="status-group">
              <div className="status-header">
                <h3>Upcoming</h3>
                <span className="count-badge blue-badge">
                  {TIME_BASED_TASKS.upcoming.length}
                </span>
              </div>
              <div className="history-cards-list">
                {TIME_BASED_TASKS.upcoming.map((task) => (
                  <div key={task.id} className="time-card accent-blue">
                    <div className="card-left-info">
                      <h4 className="task-name">{task.title}</h4>
                      <div className="time-subtext">
                        <Clock size={12} color="#94a3b8" />
                        <span>{task.time}</span>
                      </div>
                    </div>
                    <div className="card-right-badge blue-cal">
                      <Calendar size={16} color="#3b82f6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NON-TIME BASED VIEW */}
        {activeTab === "non-time-based" && (
          <div className="history-sections">
            <div className="status-group">
              <div className="status-header">
                <h3>PENDING</h3>
                <span className="count-badge gray-badge">
                  {NON_TIME_BASED_TASKS.pending.length}
                </span>
              </div>
              <div className="history-cards-list">
                {NON_TIME_BASED_TASKS.pending.map((task) => (
                  <div key={task.id} className="nontime-card">
                    <div className="nontime-icon-badge">
                      <List size={18} color="#3b82f6" />
                    </div>
                    <div className="nontime-left-info">
                      <h4 className="task-name">{task.title}</h4>
                      <div className="time-subtext">
                        <Calendar size={12} color="#94a3b8" />
                        <span>{task.date}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LOCATION BASED VIEW */}
        {activeTab === "location-based" && (
          <div className="history-sections">
            <div className="status-group">
              <div className="status-header">
                <h3>PENDING LOCATIONS</h3>
                <span className="count-badge blue-badge">
                  {LOCATION_BASED_TASKS.pending.length}
                </span>
              </div>
              <div className="history-cards-list">
                {LOCATION_BASED_TASKS.pending.map((task) => (
                  <div key={task.id} className="nontime-card">
                    <div className="nontime-icon-badge location-icon-bg">
                      <MapPin size={18} color="#0284c7" />
                    </div>
                    <div className="nontime-left-info">
                      <h4 className="task-name">{task.title}</h4>
                      <div className="time-subtext">
                        <MapPin size={12} color="#94a3b8" />
                        <span>{task.location}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="history-bottom-nav">
        <button
          className={`nav-item ${activeNav === "home" ? "active" : ""}`}
          onClick={() => setActiveNav("home")}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button
          className={`nav-item ${activeNav === "contacts" ? "active" : ""}`}
          onClick={() => setActiveNav("contacts")}
        >
          <Users size={20} />
          <span>Contacts</span>
        </button>

        <button
          className={`nav-item ${activeNav === "history" ? "active" : ""}`}
          onClick={() => setActiveNav("history")}
        >
          <div className="active-nav-badge">
            <HistoryIcon size={20} />
          </div>
          <span>History</span>
        </button>

        <button
          className={`nav-item ${activeNav === "settings" ? "active" : ""}`}
          onClick={() => setActiveNav("settings")}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}