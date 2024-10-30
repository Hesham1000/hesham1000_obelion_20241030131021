import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://quickApp-backend.cloud-stacks.com/api/${isLogin ? 'login' : 'signup'}`;
    const data = isLogin ? { loginEmail: formData.email, loginPassword: formData.password } : formData;

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message);
        if (isLogin) {
          // Redirect to the dashboard or home page after successful login
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post('https://quickApp-backend.cloud-stacks.com/api/reset-password', { email: formData.email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      {isLogin && <p onClick={handlePasswordReset}>Forgot Password?</p>}
      <p onClick={toggleForm}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default Login;
