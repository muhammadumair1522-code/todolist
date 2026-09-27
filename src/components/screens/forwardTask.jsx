import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Search, Check, HelpCircle } from "lucide-react";
import "../styles/ForwardTask.css";

const INITIAL_CONTACTS = [
  { id: 1, name: "Usman Raza", phone: "03447778899", type: "registered", selected: true },
  { id: 2, name: "Sara Ahmed", phone: "03334445566", type: "registered", selected: true },
  { id: 3, name: "John Doe", phone: "03001234567", type: "registered", selected: false },
  { id: 4, name: "Jane Smith", phone: "03119876543", type: "registered", selected: false },
  { id: 5, name: "abc xyz", phone: "0333322344", type: "registered", selected: false },
];

export default function ForwardTask() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSelect = (id) => {
    setContacts(
      contacts.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const selectedCount = contacts.filter((c) => c.selected).length;

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="forward-task-container">
      {/* Top Header Bar */}
      <header className="forward-header">
        <button className="forward-icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} color="#ffffff" />
        </button>
        <h1 className="forward-title">Forward Task</h1>
        <button className="forward-icon-btn send-btn" onClick={() => navigate("/dashboard")}>
          <Send size={18} color="#ffffff" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="forward-content">
        {/* Search Input Bar */}
        <div className="search-bar-wrapper">
          <Search size={18} color="#94a3b8" className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Selected Count Indicator (Removed Registered/External pills above) */}
        <div className="filter-status-row">
          <div className="selected-badge-pill">
            <Check size={14} color="#2563eb" strokeWidth={3} />
            <span>{selectedCount} Selected</span>
          </div>
        </div>

        {/* Contact List */}
        <div className="contacts-list">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-card ${contact.selected ? "selected" : ""}`}
              onClick={() => toggleSelect(contact.id)}
            >
              <div className="contact-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>

              <div className="contact-info">
                <h3 className="contact-name">{contact.name}</h3>
                <p className="contact-phone">{contact.phone}</p>
                <span className="contact-tag">? Registered App User</span>
              </div>

              <div className="contact-checkbox">
                {contact.selected ? (
                  <div className="checkbox-checked-box">
                    <Check size={14} color="#ffffff" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="checkbox-unchecked-box">
                    <HelpCircle size={16} color="#3b82f6" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}