import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import RoleContext from '../components/RoleContext'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setRole } = useContext(RoleContext);
  const navigate = useNavigate(); // Hook to navigate to different pages

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed'); 
      }

      const data = await response.json();
      if (!data || typeof data.role === 'undefined') {
        throw new Error('Invalid response data');
      }
      console.log('Login successful:', data); // Handle successful login

      console.log(data.role)
      setRole(data.role)

<<<<<<< HEAD
      if (data.role == 'rider') {
        navigate('/delivery/rider/dashboard');
      } else if (data.role == 'user') {
        navigate('/admin/home');
      } else if (data.role == 'admin') {
=======
      if (data.role === 'rider') {
        navigate('/delivery/rider/dashboard');
      } else if (data.role === 'user') {
        navigate('/admin/home');
      } else if (data.role === 'admin') {
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
        navigate('/admin/main/dashboard');
      }
    } catch (error) {
      setError(error.message); // Display error message to user
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
