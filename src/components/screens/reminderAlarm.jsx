import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, Users, History, Settings, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/reminderAlarm.css";

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

export default function ReminderAlarm() {
  const navigate = useNavigate();
  const { alarmId } = useParams();

  // Simulated Reminder Alarm data (Supports both time-based and location-based layouts)
  const [alarm, setAlarm] = useState({
    id: alarmId || 1,
    from: "Home",
    title: "BUY GROCERY",
    description: "PICKUP YOUGURT AT YOUR OFF TIME",
    reminderMode: "location-based", // Options: "time-based" | "location-based"
    time: "7:00 PM",
    date: "FEB 20, 2026",
    location: {
      lat: 33.6844,
      lng: 73.0479,
      address: "Super Market, F-6 Markaz, Islamabad",
    },
  });

  const handleDone = () => {
    alert("Reminder marked as Done!");
    navigate("/dashboard");
  };

  const handleSnooze = () => {
    alert("Reminder snoozed for 10 minutes.");
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleForward = () => {
    navigate(`/forward-task/${alarm.id}`);
  };

  return (
    <div className="reminder-alarm-container">
      {/* Top Header Bar */}
      <header className="reminder-header">
        <button
          type="button"
          className="header-icon-btn back-btn"
          onClick={() => navigate("/dashboard")}
          aria-label="Go Back"
        >
          <ArrowLeft size={20} color="#1e293b" strokeWidth={2.5} />
        </button>

        <div className="header-pill">
          <span>REMINDER-ALARM</span>
        </div>

        <div className="header-spacer"></div>
      </header>

      {/* Main Full-Width Responsive Card Overview */}
      <main className="reminder-content">
        <div className="reminder-card">
          <div className="reminder-from-heading">From: {alarm.from}</div>

          <div className="reminder-section-block">
            <span className="section-label-underline">TITLE:</span>
            <h2 className="reminder-title-text">{alarm.title}</h2>
          </div>

          <div className="reminder-section-block">
            <span className="section-label-underline">DESCRIPTION:</span>
            <p className="reminder-description-text">{alarm.description}</p>
          </div>

          {/* Conditional Location Block */}
          {alarm.reminderMode === "location-based" && (
            <div className="reminder-location-block">
              <span className="section-label-plain">Location:</span>
              <span className="location-address-text">
                <MapPin size={14} style={{ display: "inline", marginRight: "4px", flexShrink: 0 }} />
                {alarm.location.address}
              </span>

              {/* Mini Leaflet Map Preview */}
              <div className="reminder-mini-map">
                <MapContainer
                  center={[alarm.location.lat, alarm.location.lng]}
                  zoom={14}
                  style={{ height: "100%", width: "100%" }}
                  dragging={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                >
                  <MapResizer />
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[alarm.location.lat, alarm.location.lng]} />
                </MapContainer>
              </div>
            </div>
          )}

          <div className="reminder-time-date-block">
            <div className="meta-row">
              <span className="meta-label">TIME</span>
              <span className="meta-colon">:</span>
              <span className="meta-value">{alarm.time}</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">DATE</span>
              <span className="meta-colon">:</span>
              <span className="meta-value">{alarm.date}</span>
            </div>
          </div>
        </div>

        {/* 2x2 Action Buttons Grid */}
        <div className="reminder-actions-grid">
          <button
            type="button"
            className="action-pill-btn btn-dark"
            onClick={handleDone}
          >
            <span>DONE</span>
          </button>

          <button
            type="button"
            className="action-pill-btn btn-dark"
            onClick={handleSnooze}
          >
            <span>SNOOZE</span>
          </button>

          <button
            type="button"
            className="action-pill-btn btn-dark"
            onClick={handleCancel}
          >
            <span>CANCEL</span>
          </button>

          <button
            type="button"
            className="action-pill-btn btn-dark btn-forward-arrow"
            onClick={handleForward}
          >
            <span>FORWARD</span>
            <span className="arrow-icon">⟶</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="reminder-bottom-nav">
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