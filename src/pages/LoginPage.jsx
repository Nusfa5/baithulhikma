import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assests/background.jpg';
import logo from '../assests/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      localStorage.setItem('studentEmail', email); 
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('name', data.name);

        switch (data.role) {
          case 'student':
            navigate('/student-dashboard');
            break;
          case 'tutor':
            navigate('/tutor-dashboard');
            break;
          case 'parent':
            navigate('/parent-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          default:
            alert('Unknown role');
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div
      className="vh-100 vw-100 position-relative d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}
      />

      {/* Logo at top-left */}
      <div
        className="position-absolute top-0 start-0 p-3"
        style={{ zIndex: 2 }}
      >
        <img src={logo} alt="Logo" style={{ width: '200px', borderRadius:'80px'}} />
      </div>

      {/* Header text */}
      <div
        className="text-center text-white mb-4 px-3 animate__animated animate__fadeInDown"
        style={{ zIndex: 2 }}
      >
        <h2 className="fw-bold display-5 mb-1" style={{ letterSpacing: '1px' }}>
          Welcome to <span className="text-warning">Baithulhikma Institute</span>
        </h2>
        <p className="fst-italic lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
          “Education is the passport to the future, for tomorrow belongs to those who prepare for it today.”
        </p>
      </div>

      {/* Login card */}
      <div
        className="card p-4 shadow-lg animate__animated animate__fadeInUp"
        style={{
          width: '100%',
          maxWidth: '400px',
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
        }}
      >
        <h4 className="text-center text-primary fw-bold mb-3">Login to Your Account</h4>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-4"
        />
        <button onClick={handleLogin} className="btn btn-primary w-100 mb-3">
          Login
        </button>
        <p className="text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-decoration-none fw-bold text-primary">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
