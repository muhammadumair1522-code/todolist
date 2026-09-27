import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, Users, History, Settings, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/TaskOverview.css";

// Fix for default Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper component to fix tile rendering issues inside containers
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);
  return null;
}

export default function TaskOverview() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  // Simulated task data (Supports both time-based and location-based views)
  const [task, setTask] = useState({
    id: taskId || 1,
    title: "PICKUP YOUGURT AT YOUR OFF TIME",
    description: "Pickup yogurt from the local grocery store during break.",
    taskMode: "location-based", // Options: "time-based" | "non-time-based" | "location-based"
    from: "Mom",
    to: "Me",
    date: "FEB 20, 2026",
    time: "3:23 PM",
    location: {
      lat: 33.6844,
      lng: 73.0479,
      address: "Super Market, F-6 Markaz, Islamabad",
    },
  });

  const handleMarkAsCompleted = () => {
    alert("Task marked as completed!");
    navigate("/dashboard");
  };

  const handleForwardTo = () => {
    navigate(`/forward-task/${task.id}`);
  };

  const handleIgnore = () => {
    navigate("/dashboard");
  };

  return (
    <div className="task-overview-container">
      {/* Top Header Bar */}
      <header className="task-overview-header">
        <button
          type="button"
          className="header-icon-btn back-btn"
          onClick={() => navigate("/dashboard")}
          aria-label="Go Back"
        >
          <ArrowLeft size={20} color="#1e293b" strokeWidth={2.5} />
        </button>

        <div className="header-pill">
          <span>TASK-OVERVIEW</span>
        </div>

        <div className="header-spacer"></div>
      </header>

      {/* Main Full-Width Responsive Card Overview */}
      <main className="task-overview-content">
        <div className="overview-card">
          <div className="overview-section-title">DESCRIPTION:</div>
          <p className="overview-description-text">{task.title}</p>

          <div className="overview-meta-details">
            {/* Conditional Location Block matching layout in screenshot */}
            {task.taskMode === "location-based" && (
              <div className="meta-row location-row">
                <span className="meta-label">Location</span>
                <span className="meta-colon">:</span>
                <span className="meta-value address-text">
                  {task.location.address}
                </span>
              </div>
            )}

            <div className="meta-row">
              <span className="meta-label">From</span>
              <span className="meta-colon">:</span>
              <span className="meta-value">{task.from}</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">To</span>
              <span className="meta-colon">:</span>
              <span className="meta-value">{task.to}</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">DATE</span>
              <span className="meta-colon">:</span>
              <span className="meta-value">{task.date}</span>
            </div>

            {task.taskMode === "time-based" && (
              <div className="meta-row">
                <span className="meta-label">TIME</span>
                <span className="meta-colon">:</span>
                <span className="meta-value">{task.time}</span>
              </div>
            )}

            {/* Mini Leaflet Map Preview for Location Tasks */}
            {task.taskMode === "location-based" && (
              <div className="overview-mini-map">
                <MapContainer
                  center={[task.location.lat, task.location.lng]}
                  zoom={14}
                  style={{ height: "100%", width: "100%" }}
                  dragging={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                >
                  <MapResizer />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[task.location.lat, task.location.lng]} />
                </MapContainer>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="overview-actions">
          <button
            type="button"
            className="action-pill-btn btn-completed"
            onClick={handleMarkAsCompleted}
          >
            <span>MARK AS COMPLETED</span>
            <div className="checkbox-box">✓</div>
          </button>

          <button
            type="button"
            className="action-pill-btn btn-forward"
            onClick={handleForwardTo}
          >
            <span>FARWORD TO</span>
            <span className="arrow-icon">⟶</span>
          </button>

          <button
            type="button"
            className="action-pill-btn btn-ignore"
            onClick={handleIgnore}
          >
            <span>IGNORE</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="task-overview-bottom-nav">
        <button type="button" className="nav-item" onClick={() => navigate("/dashboard")}>
          <Home size={22} />
          <span>Home</span>
        </button>

        <button type="button" className="nav-item" onClick={() => navigate("/contacts")}>
          <Users size={22} />
          <span>Members</span>
        </button>

        <button type="button" className="nav-item" onClick={() => navigate("/history")}>
          <History size={22} />
          <span>History</span>
        </button>

        <button type="button" className="nav-item" onClick={() => navigate("/settings")}>
          <Settings size={22} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}