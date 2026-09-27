import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  UserPlus,
  Users,
  Check,
  User,
  Phone,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Home,
  History as HistoryIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import "../styles/contacts.css";

const INITIAL_CONTACTS = [
  { id: 1, name: "Usman Raza", phone: "03447778899" },
  { id: 2, name: "Sara Ahmed", phone: "03334445566" },
  { id: 3, name: "John Doe", phone: "03001234567" },
  { id: 4, name: "Jane Smith", phone: "03119876543" },
  { id: 5, name: "Sara Ahmed", phone: "03334445566" },
  { id: 6, name: "abc xyz", phone: "0333322344" },
  { id: 7, name: "abc xyz", phone: "0333322344" },
  { id: 8, name: "Sara Ahmed", phone: "03334445566" },
];

const EXISTING_GROUPS = [
  "Development Team",
  "Marketing Squad",
  "FYP Project Group",
  "Family Tasks",
  "Design Reviewers",
  "Family",
  "Friends",
];

export default function Contacts() {
  const navigate = useNavigate();

  // Main state
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("contacts");

  // Popup Menu State (Top Right Button)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modal State: New Contact (Screenshot 2)
  const [isNewContactOpen, setIsNewContactOpen] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  // Page State: Create Group (Screenshot 3)
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupNameInput, setGroupNameInput] = useState("");
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  // Navigation handler
  const handleNavClick = (navItem, path) => {
    setActiveNav(navItem);
    if (path) navigate(path);
  };

  // Add New Contact Handler
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    const newContact = {
      id: Date.now(),
      name: newContactName,
      phone: newContactPhone,
    };

    setContacts([newContact, ...contacts]);
    setNewContactName("");
    setNewContactPhone("");
    setIsNewContactOpen(false);
  };

  // Toggle Member Selection for Group
  const toggleGroupMember = (contactId) => {
    if (selectedGroupMembers.includes(contactId)) {
      setSelectedGroupMembers(selectedGroupMembers.filter((id) => id !== contactId));
    } else {
      setSelectedGroupMembers([...selectedGroupMembers, contactId]);
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  // ==================== VIEW 3: CREATE GROUP SCREEN ====================
  if (isCreatingGroup) {
    return (
      <div className="contacts-container">
        {/* Header */}
        <header className="create-group-header">
          <button className="back-icon-btn" onClick={() => setIsCreatingGroup(false)}>
            <ArrowLeft size={20} color="#1e293b" />
          </button>
          <div className="create-group-title-pill">
            <span>Create Group</span>
          </div>
          <div style={{ width: 38 }} /> {/* Spacer */}
        </header>

        <main className="create-group-content">
          {/* Group Name Section */}
          <div className="form-section-card">
            <label className="section-label">Group Name:</label>
            <input
              type="text"
              className="group-name-input"
              placeholder="Type or pick group name..."
              value={groupNameInput}
              onChange={(e) => setGroupNameInput(e.target.value)}
            />
          </div>

          {/* Select Group Dropdown */}
          <div className="dropdown-container">
            <div
              className="dropdown-header-bar"
              onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
            >
              <div className="dropdown-header-left">
                <Users size={16} color="#64748b" />
                <span>{groupNameInput || "Tap to select a group..."}</span>
              </div>
              {isGroupDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {isGroupDropdownOpen && (
              <div className="dropdown-list">
                {EXISTING_GROUPS.map((group) => (
                  <div
                    key={group}
                    className="dropdown-item"
                    onClick={() => {
                      setGroupNameInput(group);
                      setIsGroupDropdownOpen(false);
                    }}
                  >
                    {group}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pick from Existing Contacts Dropdown Accordion */}
          <div className="dropdown-container">
            <div
              className="dropdown-header-bar"
              onClick={() => setIsPickerOpen(!isPickerOpen)}
            >
              <div className="dropdown-header-left">
                <Users size={16} color="#2563eb" />
                <span>Pick from Existing Contacts</span>
              </div>
              {isPickerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {isPickerOpen && (
              <div className="picker-contacts-list">
                {contacts.map((c) => {
                  const isSelected = selectedGroupMembers.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      className={`picker-contact-row ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleGroupMember(c.id)}
                    >
                      <div>
                        <span className="p-name">{c.name}</span>
                        <span className="p-phone">{c.phone}</span>
                      </div>
                      <div className={`mini-checkbox ${isSelected ? "checked" : ""}`}>
                        {isSelected && <Check size={12} color="#ffffff" strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected Members Preview Box */}
          <div className="members-preview-box">
            <div className="preview-center-icon">
              <Users size={28} color="#94a3b8" />
            </div>
            {selectedGroupMembers.length === 0 ? (
              <>
                <p className="preview-title">No members added yet</p>
                <p className="preview-subtitle">
                  You can add members using the fields above, or skip and create the group directly.
                </p>
              </>
            ) : (
              <p className="preview-title">
                {selectedGroupMembers.length} member(s) selected
              </p>
            )}
          </div>

          {/* Bottom Action Buttons */}
          <div className="group-action-buttons">
            <button
              className="btn-cancel"
              onClick={() => setIsCreatingGroup(false)}
            >
              CANCEL
            </button>
            <button
              className="btn-create"
              onClick={() => {
                alert(`Group "${groupNameInput || "Untitled"}" created successfully!`);
                setIsCreatingGroup(false);
                setGroupNameInput("");
                setSelectedGroupMembers([]);
              }}
            >
              Create Group
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ==================== VIEW 1 & 2: MAIN CONTACTS LIST + MODAL ====================
  return (
    <div className="contacts-container">
      {/* Top Header Bar */}
      <header className="contacts-top-bar">
        {/* Search Bar */}
        <div className="contacts-search-wrapper">
          <Search size={18} color="#94a3b8" className="search-ico" />
          <input
            type="text"
            placeholder="Search contacts or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Top Right Action Button */}
        <div className="menu-anchor-wrapper">
          <button
            className="top-action-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Add Options"
          >
            <UserPlus size={20} color="#ffffff" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="popup-menu-dropdown">
              <button
                className="popup-menu-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsNewContactOpen(true);
                }}
              >
                <User size={16} />
                <span>New Contact</span>
              </button>
              <div className="menu-divider" />
              <button
                className="popup-menu-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCreatingGroup(true);
                }}
              >
                <Users size={16} />
                <span>New Group</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="contacts-content">
        <div className="section-header-title">
          <span>ALL MEMBERS ({filteredContacts.length})</span>
        </div>

        <div className="contacts-list-stack">
          {filteredContacts.map((contact, index) => (
            <div key={`${contact.id}-${index}`} className="contact-item-card">
              <div
                className="contact-avatar-circle"
                style={{
                  backgroundColor:
                    index % 3 === 0 ? "#ea580c" : index % 3 === 1 ? "#0d9488" : "#0284c7",
                }}
              >
                {contact.name.charAt(0).toUpperCase()}
              </div>

              <div className="contact-info-block">
                <h3 className="c-name">{contact.name}</h3>
                <p className="c-phone">
                  <Phone size={13} color="#64748b" /> {contact.phone}
                </p>
              </div>

              <div className="contact-status-check">
                <Check size={16} color="#10b981" strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ==================== VIEW 2: NEW CONTACT MODAL ==================== */}
      {isNewContactOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog-card">
            <form onSubmit={handleAddMember}>
              <div className="modal-field-group">
                <label className="modal-label">Full Name</label>
                <div className="modal-input-wrap">
                  <User size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Enter member name"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-field-group">
                <label className="modal-label">Phone Number</label>
                <div className="modal-input-wrap">
                  <Phone size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="e.g. 03001234567"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-action-row">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsNewContactOpen(false)}
                >
                  CANCEL
                </button>
                <button type="submit" className="btn-modal-submit">
                  ADD MEMBER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
    </div>
  );
}