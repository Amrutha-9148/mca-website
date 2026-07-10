import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://mca-backendd.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);
        navigate('/dashboard');
      } else {
        setMessage('Login failed! Check your email and password.');
      }
    } catch (error) {
      setMessage('Error connecting to server!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/images/collegemaingate.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.92)',
        padding: '40px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 0 20px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#8B0000', marginBottom: '5px' }}>
          Malnad College of Engineering
        </h2>
        <h4 style={{ textAlign: 'center', color: '#555', marginBottom: '25px' }}>
          MCA Department - Admin Login
        </h4>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} required />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#8B0000', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '16px' }}>
            Login
          </button>
        </form>
        {message && <p style={{ textAlign: 'center', marginTop: '15px', color: 'red' }}>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
