import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, register } from './redux/authSlice';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboardLayout/Dashboard';
import './App.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('http://your-backend-url/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      dispatch(login(data.token));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed:', error);

    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('http://your-backend-url/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      dispatch(register(data.token));
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed:', error);

    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className={`app ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {isAuthenticated && (
          <>
            <Sidebar isOpen={sidebarOpen} />
            <div className="main-content">
              <Navbar onLogout={handleLogout} onToggleSidebar={toggleSidebar} />
              <main className="content">
                <Routes>
                  <Route path="*" element={<Dashboard />} />
                  {/* Add other authenticated routes here */}
                </Routes>
              </main>
            </div>
          </>
        )}
        {!isAuthenticated && (
          <div className="unauthenticated-content">
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;