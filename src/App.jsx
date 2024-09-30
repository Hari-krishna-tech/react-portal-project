import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, register } from './redux/authSlice';

import axios from 'axios'; 
import {jwtDecode} from 'jwt-decode';

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
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
      const data = response.data;
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      dispatch(login({token:data.token,user:data.username}));
      
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed:', error);

    }
  };


  const handleRegister = async (userData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", credentials);
      const data = response.data;
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      dispatch(register({token:data.token,user:data.username}));
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed:', error);

    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  function getUsernameFromToken(token) {
    // Retrieve the token from localStorage
    
    
    if (token) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);
        
        // Extract the username
        // Note: The exact key might be different based on how you structured your JWT payload
        const username = decodedToken.sub || decodedToken.username;
        
        return username;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.log('No token found in localStorage');
      return null;
    }
  }

  useEffect(() => {
    // check whether token is stored in the local storage
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const username = getUsernameFromToken(token);
      dispatch(login({token, user: username})); // Replace "username" with actual username
      navigate("/")
    } else {
      dispatch(logout());
    }
  }, [])

  return (
    <>
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
    </>
  );
};

export default App;