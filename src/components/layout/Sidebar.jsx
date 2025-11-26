import React, { useState } from "react";
import "./Sidebar.css"; // Sidebar styles

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center">
        <h4 className="m-0">Srvana</h4>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={toggleSidebar}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <ul className="list-unstyled mt-3">
        <li><a href="#">🏠 Dashboard</a></li>
        <li><a href="#">📦 My Orders</a></li>
        <li><a href="#">📊 Statistics</a></li>
        <li><a href="#">👤 Profile</a></li>
        <li><a href="#">🚪 Logout</a></li>
      </ul>
    </div>
  );
}
