import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    if (password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (validateForm()) {
      try {
        await onRegister({ username, password });
      } catch (error) {
        setAuthError('Registration failed. Please try again.');
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
          className={`register-input ${errors.username ? 'input-error' : ''}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <div className="error-message">{errors.username}</div>}
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          className={`register-input ${errors.password ? 'input-error' : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
      </div>
      <button type="submit" className="register-button">Register</button>
      <div className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </form>
  );
};

export default Register;