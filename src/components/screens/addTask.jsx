import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ChevronRight,
  ChevronDown,
  Home,
  Users,
  History,
  Settings,
  MapPin,
  Search
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/AddTask.css";

// Fix for default Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map clicks and setting marker position
function LocationPicker({ position, setPosition, setLocationName }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      // Optional reverse geocoding approximation or coordinates display
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.display_name) {
            setLocationName(data.display_name);
          } else {
            setLocationName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          }
        })
        .catch(() => {
          setLocationName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        });
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

export default function AddTask() {
  const navigate = useNavigate();

  // Mode set to "time-based" by default
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskMode, setTaskMode] = useState("time-based");
  const [dueDate, setDueDate] = useState("2026-09-06");
  const [dueTime, setDueTime] = useState("12:00");
  const [assignedTo, setAssignedTo] = useState("");

  // Location-specific states
  const [mapPosition, setMapPosition] = useState([33.6844, 73.0479]); // Default coordinates (e.g., Islamabad/Rawalpindi region)
  const [locationName, setLocationName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchLocation = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setMapPosition([lat, lon]);
          setLocationName(data[0].display_name);
        } else {
          alert("Location not found.");
        }
      })
      .catch(() => {
        alert("Error searching location.");
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      alert("Please enter a task title!");
      return;
    }

    const newTaskData = {
      taskTitle,
      description,
      taskMode,
      dueDate: taskMode !== "location-based" ? dueDate : null,
      dueTime: taskMode === "time-based" ? dueTime : null,
      location: taskMode === "location-based" ? { lat: mapPosition[0], lng: mapPosition[1], address: locationName } : null,
      assignedTo,
    };

    console.log("New Task Saved:", newTaskData);
    alert("Task saved successfully!");
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="add-task-container">
      {/* Top Header Bar */}
      <header className="add-task-header">
        <button
          type="button"
          className="header-back-btn"
          onClick={handleCancel}
          aria-label="Go Back"
        >
          <ArrowLeft size={20} color="#1e293b" strokeWidth={2.5} />
        </button>

        <div className="header-pill">
          <span>New Task</span>
        </div>

        <div className="header-spacer"></div>
      </header>

      {/* Main Form Content */}
      <main className="add-task-content">
        <form onSubmit={handleSave} className="task-form">
          {/* Task Title */}
          <div className="form-group">
            <label className="form-label">TASK TITLE</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Design System Documentation"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">DESCRIPTION</label>
            <textarea
              className="form-textarea"
              placeholder="Provide context or instructions for this task..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Task Mode Radio Selection */}
          <div className="form-group">
            <label className="form-label">TASK MODE</label>
            <div className="radio-pill-group">
              {/* Time Based Option */}
              <label
                className={`radio-pill-option ${
                  taskMode === "time-based" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="taskMode"
                  value="time-based"
                  checked={taskMode === "time-based"}
                  onChange={() => setTaskMode("time-based")}
                />
                <span className="custom-radio-circle"></span>
                <span className="radio-label-text">Time Based</span>
              </label>

              {/* Non-Time Based Option */}
              <label
                className={`radio-pill-option ${
                  taskMode === "non-time-based" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="taskMode"
                  value="non-time-based"
                  checked={taskMode === "non-time-based"}
                  onChange={() => setTaskMode("non-time-based")}
                />
                <span className="custom-radio-circle"></span>
                <span className="radio-label-text">Non-Time Based</span>
              </label>

              {/* Location Based Option */}
              <label
                className={`radio-pill-option ${
                  taskMode === "location-based" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="taskMode"
                  value="location-based"
                  checked={taskMode === "location-based"}
                  onChange={() => setTaskMode("location-based")}
                />
                <span className="custom-radio-circle"></span>
                <span className="radio-label-text">Location Based</span>
              </label>
            </div>
          </div>

          {/* Conditional Rendering: Due Date/Time or Location Map Picker */}
          {taskMode === "location-based" ? (
            <div className="form-group">
              <label className="form-label">SELECT LOCATION</label>
              
              {/* Search bar for map lookup */}
              <div className="map-search-wrapper" style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search place or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" className="btn-action btn-save" onClick={handleSearchLocation} style={{ padding: "0 14px", minWidth: "auto" }}>
                  <Search size={18} />
                </button>
              </div>

              {/* Leaflet Map container */}
              <div style={{ height: "250px", width: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid #cbd5e1" }}>
                <MapContainer 
                  center={mapPosition} 
                  zoom={13} 
                  style={{ height: "100%", width: "100%" }}
                  key={mapPosition.toString()}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationPicker 
                    position={mapPosition} 
                    setPosition={setMapPosition} 
                    setLocationName={setLocationName} 
                  />
                </MapContainer>
              </div>
              {locationName && (
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
                  <strong>Selected:</strong> {locationName}
                </p>
              )}
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">
                {taskMode === "time-based" ? "DUE DATE & TIME" : "DUE DATE"}
              </label>

              <div className="dateTime-inputs-wrapper">
                <div className="picker-box">
                  <Calendar size={18} className="picker-icon" />
                  <input
                    type="date"
                    className="native-picker-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <ChevronRight size={18} className="picker-arrow" />
                </div>

                {taskMode === "time-based" && (
                  <div className="picker-box time-box-anim">
                    <Clock size={18} className="picker-icon" />
                    <input
                      type="time"
                      className="native-picker-input"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                    />
                    <ChevronRight size={18} className="picker-arrow" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Assign Task Dropdown */}
          <div className="form-group">
            <label className="form-label">ASSIGN TASK TO</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="" disabled>
                  Select Recipient / Group
                </option>
                <option value="mannan">Mannan</option>
                <option value="zaryab">Zaryab</option>
                <option value="mesam">Mesam</option>
                <option value="team-dev">Development Team</option>
              </select>
              <ChevronDown size={18} className="select-arrow" />
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-action btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-action btn-save">
              Save
            </button>
          </div>
        </form>
      </main>

      {/* Bottom Navigation */}
      <nav className="add-task-bottom-nav">
        <button type="button" className="nav-item" onClick={() => navigate("/")}>
          <Home size={22} />
          <span>Home</span>
        </button>

        <button type="button" className="nav-item">
          <Users size={22} />
          <span>Members</span>
        </button>

        <button type="button" className="nav-item">
          <History size={22} />
          <span>History</span>
        </button>

        <button type="button" className="nav-item">
          <Settings size={22} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}