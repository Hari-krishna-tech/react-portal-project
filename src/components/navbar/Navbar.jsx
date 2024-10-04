import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';
import logoImage from '../../assets/minsprint_logo.svg'; // Adjust the path as needed

const Navbar = ({ isSideBarOpen,onLogout, onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = useSelector(state => state.auth.user); // Get username from Redux
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setDropdownOpen(prevState => !prevState); // Use functional update
  };

  const handleLogout = () => {
    onLogout();
    setDropdownOpen(false); // Close dropdown after logout
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          avatarRef.current && !avatarRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
        <i 
      className={`fas ${isSideBarOpen ? 'fa-xmark' : 'fa-bars'} menu-icon ${isSideBarOpen ? 'open' : ''}`}
    ></i>
        </button>
        <Link to="/dashboard" className="navbar-logo">
          <img src={logoImage} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <div 
          ref={avatarRef}
          className="avatar" 
          onClick={toggleDropdown}
          style={{ userSelect: 'none' }}
        >
          {username ? username.charAt(0).toUpperCase() : '?'}
        </div>
        {dropdownOpen && (
          <div 
            className="dropdown-container-navbar open"
            ref={dropdownRef}
          >
            <div className="dropdown-menu-navbar">
              <div className="dropdown-header-navbar">
                <span className="dropdown-username-navbar">{username}</span>
              </div>
              <button className="dropdown-item-navbar" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;