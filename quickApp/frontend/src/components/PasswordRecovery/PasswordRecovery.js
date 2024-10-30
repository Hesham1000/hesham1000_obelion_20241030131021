import React, { useState } from 'react';
import axios from 'axios';
import './PasswordRecovery.css';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://quickApp-backend.cloud-stacks.com/api/reset-password', { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setMessage('Password recovery email sent.');
      }
    } catch (error) {
      setMessage('Error sending password recovery email.');
    }
  };

  return (
    <div className="password-recovery-container">
      <h2>Password Recovery</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Send Recovery Email</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PasswordRecovery;
