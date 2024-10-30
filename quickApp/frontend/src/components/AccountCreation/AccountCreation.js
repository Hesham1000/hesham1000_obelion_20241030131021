import React, { useState } from 'react';
import axios from 'axios';
import './AccountCreation.css';

const AccountCreation = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginForm, setLoginForm] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const [resetEmail, setResetEmail] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleResetChange = (e) => {
    setResetEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://quickApp-backend.cloud-stacks.com/api/signup', {
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://quickApp-backend.cloud-stacks.com/api/login', {
        loginEmail: loginForm.loginEmail,
        loginPassword: loginForm.loginPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);
      // Redirect to dashboard or home page
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://quickApp-backend.cloud-stacks.com/api/reset-password', {
        email: resetEmail,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="account-creation-container">
      <form onSubmit={handleSubmit} className="create-account-form">
        <h2>Create Account</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <form onSubmit={handleLoginSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          name="loginEmail"
          placeholder="Email"
          value={loginForm.loginEmail}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="loginPassword"
          placeholder="Password"
          value={loginForm.loginPassword}
          onChange={handleLoginChange}
          required
        />
        <button type="submit">Log In</button>
      </form>

      <form onSubmit={handleResetSubmit} className="reset-password-form">
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={resetEmail}
          onChange={handleResetChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default AccountCreation;
