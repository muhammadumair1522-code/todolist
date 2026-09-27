import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  Bell,
  Clock,
  Edit2,
  Check,
  Plus,
  Home,
  Users,
  AlertTriangle,
  History as HistoryIcon,
  Settings as SettingsIcon,
  X,
  MapPin,
} from "lucide-react";
import "../styles/Dashboard.css";

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Transform a ppt",
    description: "Convert slides to modern UI format",
    time: "2026-09-02 21:56:00",
    completed: true,
    group: "SELF",
    taskType: "time-based", // "time-based" | "non-time-based" | "location-based"
    status: "TODAY",
  },
  {
    id: 2,
    title: "Go to market",
    description: "Buy groceries and veggies",
    time: "2026-09-05 22:30:00",
    completed: false,
    group: "SELF",
    taskType: "time-based",
    status: "TODAY",
  },
  {
    id: 3,
    title: "Go to school",
    description: "Attend morning classes",
    time: "2026-09-05 22:30:00",
    completed: false,
    group: "SELF",
    taskType: "time-based",
    status: "PENDING",
  },
  {
    id: 4,
    title: "Mannan and Zaryab and Mesam",
    description: "Are brother's",
    time: "2026-09-10 03:20:02",
    completed: false,
    group: "SELF",
    taskType: "time-based",
    status: "UPCOMING",
  },
  {
    id: 5,
    title: "Meeting with supervisor",
    description: "Discuss FYP milestone progress",
    time: "2026-09-10 12:30:00",
    completed: false,
    group: "SELF",
    taskType: "time-based",
    status: "UPCOMING",
  },
  {
    id: 6,
    title: "Review Code Pull Request",
    description: "Check bug fixes and merge branch",
    time: "2026-08-30 16:00:00",
    completed: false,
    group: "MARKETING SQUAD",
    taskType: "time-based",
    status: "TODAY",
  },
  {
    id: 7,
    title: "Meeting fyp2",
    description: "Finalize presentation architecture",
    time: "2026-09-07 13:00:26",
    completed: false,
    group: "FYP PROJECT GROUP",
    taskType: "time-based",
    status: "TODAY",
  },
  {
    id: 8,
    title: "Pickup yogurt at off time",
    description: "Super Market F-6 Markaz",
    time: "2026-09-07 15:00:00",
    completed: false,
    group: "SELF",
    taskType: "location-based",
    status: "TODAY",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState("ALL");
  const [taskType, setTaskType] = useState("time-based"); // "time-based" | "non-time-based" | "location-based"
  const [activeGroup, setActiveGroup] = useState("SELF");
  const [activeNav, setActiveNav] = useState("home");

  const [groups, setGroups] = useState([
    "SELF",
    "DEVELOPMENT TEAM",
    "MARKETING SQUAD",
    "FYP PROJECT GROUP",
  ]);

  // Group Creation Modal State
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");

  // Navigation Handlers
  const handleNavClick = (navItem, path) => {
    setActiveNav(navItem);
    if (path) {
      navigate(path);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  // Toggle Completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete Single Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Clear completed tasks for the active group
  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !(t.group === activeGroup && t.completed)));
  };

  // Add New Group Handler
  const handleAddGroup = (e) => {
    e.preventDefault();
    const formattedGroup = newGroupName.trim().toUpperCase();
    if (formattedGroup && !groups.includes(formattedGroup)) {
      setGroups([...groups, formattedGroup]);
      setActiveGroup(formattedGroup);
      setNewGroupName("");
      setIsGroupModalOpen(false);
    }
  };

  // Add New Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTitle,
      description: "",
      time: newTime || new Date().toISOString().slice(0, 16).replace("T", " "),
      completed: false,
      group: activeGroup,
      taskType: taskType,
      status: "TODAY",
    };

    setTasks([newTask, ...tasks]);
    setNewTitle("");
    setNewTime("");
    setIsModalOpen(false);
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    if (task.group !== activeGroup) return false;
    if (task.taskType !== taskType) return false;

    if (activeTab === "ALL") return true;
    if (activeTab === "TODAY") return task.status === "TODAY";
    if (activeTab === "PENDING") return !task.completed;
    if (activeTab === "UPCOMING") return task.status === "UPCOMING";

    return true;
  });

  return (
    <div className="dash-container">
      {/* Top Bar Navigation */}
      <header className="dash-top-bar">
        <button
          className="dash-icon-btn back-btn"
          aria-label="Go Back to Login"
          onClick={handleBackToLogin}
        >
          <ArrowLeft size={18} color="#000000" strokeWidth={2.5} />
        </button>

        <div className="dash-page-pill">
          <span>TO-DO LIST</span>
        </div>

        <div className="dash-actions-right">
          <button className="dash-icon-btn">
            <Bell size={18} color="#1e293b" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="dash-content">
        {/* Status Filter Segment */}
        <div className="filter-segment">
          {["ALL", "TODAY", "PENDING", "UPCOMING"].map((tab) => (
            <button
              key={tab}
              className={`segment-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Radio Type Filter (Expanded with Location Based) */}
        <div className="radio-filter-card three-options">
          <label
            className={`radio-option ${
              taskType === "time-based" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="taskType"
              checked={taskType === "time-based"}
              onChange={() => setTaskType("time-based")}
            />
            <span className="radio-custom"></span>
            <span className="radio-label">Time Based</span>
          </label>

          <label
            className={`radio-option ${
              taskType === "non-time-based" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="taskType"
              checked={taskType === "non-time-based"}
              onChange={() => setTaskType("non-time-based")}
            />
            <span className="radio-custom"></span>
            <span className="radio-label">Non-Time</span>
          </label>

          <label
            className={`radio-option ${
              taskType === "location-based" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="taskType"
              checked={taskType === "location-based"}
              onChange={() => setTaskType("location-based")}
            />
            <span className="radio-custom"></span>
            <span className="radio-label">Location</span>
          </label>
        </div>

        {/* Task Group Header */}
        <div className="group-header">
          <h2 className="group-title">{activeGroup}</h2>
          <span className="task-count-badge">{filteredTasks.length}</span>
        </div>

        {/* Task List */}
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks found in this group/category.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
                onClick={() => {
                  if (task.taskType === "location-based") {
                    navigate(`/task-overview/${task.id}`);
                  }
                }}
                style={{ cursor: task.taskType === "location-based" ? "pointer" : "default" }}
              >
                <div className="task-time-icon">
                  {task.taskType === "location-based" ? (
                    <MapPin size={18} color="#ef4444" />
                  ) : (
                    <Clock size={18} color="#3b82f6" />
                  )}
                </div>

                <div className="task-details">
                  <span className="task-title-text">{task.title}</span>
                  {task.taskType === "time-based" && (
                    <span className="task-date-text">{task.time}</span>
                  )}
                  {task.taskType === "location-based" && (
                    <span className="task-date-text">📍 Tap to view map overview</span>
                  )}
                  {task.completed && (
                    <span className="status-tag">Completed</span>
                  )}
                </div>

                <div className="task-item-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="task-action-btn"
                    title="Edit Task"
                    onClick={() =>
                      navigate(`/editTask/${task.id}`, { state: { task } })
                    }
                  >
                    <Edit2 size={16} color="#94a3b8" />
                  </button>
                  <button
                    className="task-action-btn delete-icon"
                    onClick={() => deleteTask(task.id)}
                    title="Delete Task"
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </button>
                  <button
                    className={`checkbox-btn ${task.completed ? "checked" : ""}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed && <Check size={14} color="#ffffff" strokeWidth={3} />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Floating Add Task Button */}
      <button
        className="fab-btn"
        onClick={() => navigate("/addTask")}
        aria-label="Add Task"
      >
        <Plus size={24} color="#ffffff" strokeWidth={2.5} />
      </button>

      {/* Category Horizontal Filter Bar with + Add Group Button */}
      <div className="group-scroll-bar">
        {groups.map((group) => (
          <button
            key={group}
            className={`group-chip ${activeGroup === group ? "active" : ""}`}
            onClick={() => setActiveGroup(group)}
          >
            {group}
          </button>
        ))}

      </div>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="bottom-nav-bar">
        <button
          className={`nav-tab ${activeNav === "home" ? "active" : ""}`}
          onClick={() => handleNavClick("home", "/dashboard")}
        >
          <div className="nav-icon-container">
            <Home size={20} />
          </div>
          <span>Home</span>
        </button>

        <button
          className={`nav-tab ${activeNav === "contacts" ? "active" : ""}`}
          onClick={() => handleNavClick("contacts", "/contacts")}
        >
          <div className="nav-icon-container">
            <Users size={20} />
          </div>
          <span>Contacts</span>
        </button>

        <button
          className={`nav-tab ${activeNav === "clashes" ? "active" : ""}`}
          onClick={() => handleNavClick("clashes", "/clashes")}
        >
          <div className="nav-icon-container">
            <AlertTriangle size={20} />
          </div>
          <span>Clashes</span>
        </button>

        <button
          className={`nav-tab ${activeNav === "history" ? "active" : ""}`}
          onClick={() => handleNavClick("history", "/history")}
        >
          <div className="nav-icon-container">
            <HistoryIcon size={20} />
          </div>
          <span>History</span>
        </button>

        <button
          className={`nav-tab ${activeNav === "settings" ? "active" : ""}`}
          onClick={() => handleNavClick("settings", "/settings")}
        >
          <div className="nav-icon-container">
            <SettingsIcon size={20} />
          </div>
          <span>Settings</span>
        </button>
      </nav>

      {/* Create Group Modal */}
      {isGroupModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Create New Group</h3>
              <button
                className="close-btn"
                onClick={() => setIsGroupModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddGroup} className="modal-form">
              <div className="form-group">
                <label>Group Name</label>
                <input
                  type="text"
                  placeholder="e.g. WORK PROJECTS"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Add Group
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}