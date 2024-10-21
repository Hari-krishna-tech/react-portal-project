import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import RoleSelector from "./RoleSelector";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRoles) => {
    setRoles(selectedRoles);
  };

  const validateForm = () => {
    const newErrors = {};
    if (username.length < 1) {
      newErrors.username = "Username must be at least 1 characters long";
    }
    if (password.length < 1) {
      newErrors.password = "Password must be at least 1 characters long";
    } 
    if(roles.length < 1) {
      newErrors.roles = "Atleast 1 role should be selected"
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (validateForm()) {
      try {
        // const response = await axios.post('http://localhost:8080/api/auth/register', { username, password });
        // localStorage.setItem('token', response.data.token);
        await onRegister({ username, password , roles});
        navigate("/dashboard");
      } catch (error) {
        setAuthError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-title">Register</h2>
      {authError && <div className="auth-error">{authError}</div>}
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          className={`register-input ${errors.username ? "input-error" : ""}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <div className="error-message">{errors.username}</div>
        )}
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          className={`register-input ${errors.password ? "input-error" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>
      <div>
        <RoleSelector handleRoleSelect={handleRoleSelect} />
         {errors.roles && (
          <div className="error-message">{errors.roles}</div>
        )}
      </div>

      <button type="submit" className="register-button">
        Register
      </button>
      <div className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </form>
  );
};

export default Register;
