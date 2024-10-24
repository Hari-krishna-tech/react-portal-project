import React, { useState } from "react";
import "./RoleSelector.css";

const RoleSelector = ({ handleRoleSelect }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const roles = [
    { id: 1, label: "Report Scheduler", name: "ROLE_REPORT_SCHEDULER" },
    // { id: 2, label: "Seasonal Information", name: "ROLE_SEASONAL_INFO" },
    { id: 3, label: "Database Setting", name: "ROLE_DATABASE_SETTING" },
    // { id: 4, label: "User Recertification", name: "ROLE_USER_RECERTIFICATION" },
    // { id: 5, label: "Outage", name: "ROLE_OUTAGE" },
  ];

  const handleRoleToggle = (roleId) => {
    setSelectedRoles((prevRoles) => {
      const newRoles = prevRoles.includes(roleId)
        ? prevRoles.filter((id) => id !== roleId)
        : [...prevRoles, roleId];

      // Call the parent callback with updated roles
      handleRoleSelect(
        newRoles.map((id) => roles.find((r) => r.id === id).name)
      );
      return newRoles;
    });
  };
  return (
    <>
      <h3>Select Roles: </h3>
      <div className="role-selector">
        <div className="role-grid">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`role-card ${
                selectedRoles.includes(role.id) ? "selected" : ""
              }`}
              onClick={() => handleRoleToggle(role.id)}
            >
              <h3>{role.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoleSelector;
