import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../utils/navLinks";
import "./Sidebar.css";
import logo from "../../assets/minsprint_logo.svg";

const Sidebar = ({ isOpen, roles }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeNavItemIndex = navLinks.findIndex(
      (item) =>
        item.route === currentPath ||
        (item.subItems &&
          item.subItems.some((subItem) =>
            currentPath.startsWith(subItem.route)
          ))
    );

    if (activeNavItemIndex !== -1) {
      setActiveItem(activeNavItemIndex);
      setActiveDropdown(activeNavItemIndex);
    }
  }, [location]);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      // If clicking on the same dropdown, close it
      setActiveDropdown(null);
    } else {
      // Otherwise, open the new dropdown
      setActiveDropdown(index);
      setActiveItem(index);

      const item = navLinks[index];
      if (!item.subItems || item.subItems.length === 0) {
        navigate(item.route);
      } else if (item.subItems && item.subItems.length > 0) {
        navigate(item.subItems[0].route);
      }
    }
  };

  const handleSubItemClick = (e, subItemRoute) => {
    e.stopPropagation();
    navigate(subItemRoute);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* <div className="logo-container">
        <Link to="/">
        <img src={logo} alt="MindSprint Logo" className="logo" />
        </Link>
      </div> */}
      <nav className="sidebar-menu">
        {navLinks.map(
          (item, index) =>
            roles.includes(item.role) && (
              <div
                key={item.name}
                className={`menu-item ${activeItem === index ? "active" : ""}`}
              >
                <div
                  className={`dropdown ${
                    activeDropdown === index ? "active" : ""
                  }`}
                  onClick={() => toggleDropdown(index)}
                >
                  <span>
                    {item.name}
                    {item.subItems && (
                      <i className="fas fa-chevron-down dropdown-icon"></i>
                    )}
                  </span>
                  {item.subItems && activeDropdown === index && (
                    <ul className="dropdown-menu">
                      {item.subItems.map(
                        (subItem) =>
                          roles.includes(subItem.role) && (
                            <li key={subItem.name}>
                              <Link
                                to={subItem.route}
                                onClick={(e) =>
                                  handleSubItemClick(e, subItem.route)
                                }
                                className={
                                  location.pathname.startsWith(subItem.route)
                                    ? "active"
                                    : ""
                                }
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
