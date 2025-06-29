import React, { useState } from 'react';
import API from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful! You can now login.');
      window.location.href = '/';
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-4 rounded shadow-sm w-100 w-md-50"
      >
        <h2 className="text-center mb-4 text-primary">Register</h2>

        <div className="mb-3">
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <select
            name="role"
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
            <option value="parent">Parent</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2"
        >
          Register
        </button>

        <p className="text-center mt-3 mb-0">
          Already registered?{' '}
          <a href="/" className="text-primary">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
