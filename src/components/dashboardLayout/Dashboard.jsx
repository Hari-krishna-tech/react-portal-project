import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { menuItems } from '../../utils/menuConfig';
import DefaultComponent from './DefaultComponent';
import ErrorBoundary from './ErrorBoundary'; // Create this component
import "./Dashboard.css";
import Loading from './Loading';






const Dashboard = () => {
  return (
    <div className="dashboard">
      <ErrorBoundary fallback={<div>Error loading component</div>}>
        <Suspense fallback={<Loading />}>
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
      </ErrorBoundary>
    </div>
  );
};

export default Dashboard;