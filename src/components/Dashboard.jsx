import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { menuItems } from '../utils/menuConfig';
import DefaultComponent from './DefaultComponent';
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              <Route
                path={item.route}
                element={<item.component />}
              />
              {item.subItems && item.subItems.map((subItem) => (
                <Route
                  key={subItem.name}
                  path={subItem.route}
                  element={<item.component />}
                />
              ))}
            </React.Fragment>
          ))}
          
          <Route path="*" element={<DefaultComponent />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Dashboard;