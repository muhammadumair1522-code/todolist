import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Grid,
  UserPlus,
  History,
  Settings,
} from "lucide-react";
import "../styles/clashTask.css";

export default function clashTask() {
  const navigate = useNavigate();

  const [clashingTasks, setClashingTasks] = useState([
    {
      id: 2,
      title: "Go to market",
      time: "2026-09-05 22:30:00",
      selected: false,
    },
    {
      id: 3,
      title: "Go to school",
      time: "2026-09-05 22:30:00",
      selected: false,
    },
  ]);

  const [activeNav, setActiveNav] = useState("clashes");

  // Toggle selection of a task card
  const toggleSelect = (id) => {
    setClashingTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t))
    );
  };

  // Resolution Actions
  const handleResolveSelected = () => {
    const selectedTasks = clashingTasks.filter((t) => t.selected);
    if (selectedTasks.length === 0) {
      alert("Please tap a task card to select it first!");
      return;
    }
    alert(`Resolved task(s): ${selectedTasks.map((t) => t.title).join(", ")}`);
    navigate("/dashboard");
  };

  const handleMarkBothDone = () => {
    alert("Marked both tasks as done!");
    navigate("/dashboard");
  };

  const handleDismiss = () => {
    navigate("/dashboard");
  };

  return (
    <div className="clash-page-container">
      {/* Top Header Bar */}
      <header className="clash-top-bar">
        <button
          className="clash-icon-btn back-btn"
          onClick={() => navigate("/dashboard")}
          aria-label="Go Back"
        >
          <ArrowLeft size={20} color="#ffffff" strokeWidth={2.5} />
        </button>

        <div className="clash-page-pill">
          <AlertCircle size={16} color="#ef4444" />
          <span>SCHEDULE CLASH</span>
        </div>

        <button className="clash-icon-btn bell-btn" aria-label="Notifications">
          <Bell size={20} color="#ffffff" />
          <span className="bell-badge"></span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="clash-content-body">
        {/* Warning Banner */}
        <div className="clash-warning-banner">
          <div className="warning-icon-wrapper">
            <AlertCircle size={22} color="#ef4444" />
          </div>
          <span className="warning-banner-text">
            These tasks are scheduled at the exact same time and require your resolution!
          </span>
        </div>

        {/* Clash Time Pill */}
        <div className="clash-time-pill">
          <Clock size={16} color="#b91c1c" />
          <span>Clash Time: 2026-09-05 22:30:00</span>
        </div>

        {/* Task Versus Section */}
        <div className="clash-cards-container">
          {/* First Task */}
          <div
            className={`clash-task-card ${clashingTasks[0]?.selected ? "selected" : ""}`}
            onClick={() => toggleSelect(clashingTasks[0]?.id)}
          >
            <div className="task-left-icon">
              <Clock size={22} color="#0284c7" />
            </div>
            <div className="task-info">
              <h3 className="task-title">{clashingTasks[0]?.title}</h3>
              <div className="task-time-sub">
                <Calendar size={14} color="#64748b" />
                <span>{clashingTasks[0]?.time}</span>
              </div>
            </div>
            <div className={`task-checkbox ${clashingTasks[0]?.selected ? "checked" : ""}`}>
              {clashingTasks[0]?.selected && <CheckCircle2 size={20} color="#0284c7" />}
            </div>
          </div>

          {/* VS Divider */}
          <div className="clash-vs-divider">
            <div className="vs-line"></div>
            <div className="vs-badge">VS</div>
            <div className="vs-line"></div>
          </div>

          {/* Second Task */}
          <div
            className={`clash-task-card ${clashingTasks[1]?.selected ? "selected" : ""}`}
            onClick={() => toggleSelect(clashingTasks[1]?.id)}
          >
            <div className="task-left-icon">
              <Clock size={22} color="#0284c7" />
            </div>
            <div className="task-info">
              <h3 className="task-title">{clashingTasks[1]?.title}</h3>
              <div className="task-time-sub">
                <Calendar size={14} color="#64748b" />
                <span>{clashingTasks[1]?.time}</span>
              </div>
            </div>
            <div className={`task-checkbox ${clashingTasks[1]?.selected ? "checked" : ""}`}>
              {clashingTasks[1]?.selected && <CheckCircle2 size={20} color="#0284c7" />}
            </div>
          </div>
        </div>

        {/* Helper Hint */}
        <p className="clash-instruction-text">
          Tap a task card to select it, then choose your resolution strategy below.
        </p>

        {/* Action Buttons */}
        <div className="clash-actions-group">
          <button className="clash-btn btn-resolve" onClick={handleResolveSelected}>
            <CheckCircle2 size={18} color="#ffffff" />
            <span>RESOLVE SELECTED</span>
          </button>

          <button className="clash-btn btn-mark-done" onClick={handleMarkBothDone}>
            <HelpCircle size={18} color="#ffffff" />
            <span>MARK BOTH AS DONE</span>
          </button>

          <button className="clash-btn-dismiss-link" onClick={handleDismiss}>
            DISMISS
          </button>
        </div>
      </main>

      {/* Dark Bottom Navigation Bar */}
      <nav className="clash-bottom-nav">
        <button
          className={`clash-nav-item ${activeNav === "home" ? "active" : ""}`}
          onClick={() => {
            setActiveNav("home");
            navigate("/dashboard");
          }}
        >
          <Grid size={22} />
          <span>Home</span>
        </button>

        <button
          className={`clash-nav-item ${activeNav === "add-member" ? "active" : ""}`}
          onClick={() => {
            setActiveNav("add-member");
            navigate("/contacts");
          }}
        >
          <UserPlus size={22} />
          <span>Add Member</span>
        </button>

        <button
          className={`clash-nav-item ${activeNav === "history" ? "active" : ""}`}
          onClick={() => {
            setActiveNav("history");
            navigate("/history");
          }}
        >
          <History size={22} />
          <span>History</span>
        </button>

        <button
          className={`clash-nav-item ${activeNav === "settings" ? "active" : ""}`}
          onClick={() => {
            setActiveNav("settings");
            navigate("/settings");
          }}
        >
          <Settings size={22} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}