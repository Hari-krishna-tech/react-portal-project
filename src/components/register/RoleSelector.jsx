import React, { useState } from "react";

const RoleSelector = () => {
  const roles = [
    { label: "Report Scheduler", name: "ROLE_REPORT_SCHEDULER" },
    { label: "Seasonal Information", name: "ROLE_SEASONAL_INFO" },
    { label: "Database Setting", name: "ROLE_DATABASE_SETTING" },
    { label: "User Recertification", name: "ROLE_USER_RECERTIFICATION" },
    { label: "Outage", name: "ROLE_OUTAGE" },
  ];
  return <div>Role Selector</div>;
};

export default RoleSelector;
