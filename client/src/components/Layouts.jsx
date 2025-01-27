import React from 'react';
import './layouts.css';
import sidebarData from '../Data/data'; // Import sidebar data
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';


const Layouts = ({ children }) => {
  const location = useLocation(); // Get the current route location
  const { user } = useSelector((state) => state.user); // Get user data from Redux state

  return (
    <div className="main">
      <div className="layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">
            <i className="fas fa-star"></i>
            <span className="logo-text">MedEase</span>
          </div>

          <div className="menu">
            {sidebarData.map((item, index) => {
              const isActive = location.pathname === item.path; // Check if the route matches the menu path
              return (
                <div
                  key={index}
                  className={`menu-item ${isActive ? 'active' : ''}`} // Add 'active' class if it's active
                >
                  <Link to={item.path} className="menu-link">
                    <div className="icon">{item.icon}</div>
                    <div className="title">{item.title}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="content">
          {/* Header Section */}
          <div className="header">
            <div className="header-left">
              <h2>Welcome to MedEase</h2>
            </div>
            <div className="header-right">
              {/* Notifications */}
              <div className="notification">
                <FontAwesomeIcon icon={faBell} className="notification-icon" />
                <span className="badge">3</span> {/* Replace '3' with actual notifications count */}
              </div>

              {/* User Info */}
              <div className="user-info">
                <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
                {user ? (
                  <div className="user-details">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">{user.role || 'User'}</span>
                  </div>
                ) : (
                  <span className="user-name">Guest</span>
                )}
              </div>
            </div>
          </div>

          {/* Body Section */}
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layouts;
