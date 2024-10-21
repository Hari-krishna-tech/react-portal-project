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
      const roles = getRolesFromToken(data.token);
      dispatch(login({token:data.token,user:data.username,roles: roles}));
      
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed:', error);

    }
  };


  const handleRegister = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", credentials);
      const data = response.data;
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      const roles = getRolesFromToken(data.token);
      dispatch(register({token:data.token,user:data.username, roles: roles}));
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed:', error);

    }
  };

  const handleLogout = () => {
    // clear axios defaults 
    axios.defaults.headers.common['Authorization'] = '';
    
    // Clear the token from localStorage
    localStorage.removeItem("token");
    
    // Dispatch logout action to the Redux store
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
  const getRolesFromToken = (token) => {
    if (token) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);
        
        // Extract the username
        // Note: The exact key might be different based on how you structured your JWT payload
        const roles = decodedToken.roles;
        
        return roles;
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
      const roles = getRolesFromToken(token)
      dispatch(login({token, user: username, roles:roles})); // Replace "username" with actual username
      navigate("/")
    } else {
      //dispatch(logout());
    }
  }, [])

  return (
    <>
      
        {isAuthenticated && (
          <>
            <div className={`app ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="main-content">
        <Navbar isSideBarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} onLogout={handleLogout} />
        <div className="content-wrapper">
          <Sidebar isOpen={sidebarOpen} />
          <main className="content">
            <Routes>
              <Route path="*" element={<Dashboard />} />
              {/* Add other authenticated routes here */}
            </Routes>
          </main>
        </div>
      </div>
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
      
    </>
  );
};

export default App;