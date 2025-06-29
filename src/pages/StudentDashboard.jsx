import React, { useEffect, useState } from 'react';
import {
  FaHome,
  FaBook,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaChartBar,
  FaSignOutAlt,
} from 'react-icons/fa';

import ClassSchedule from '../components/ClassScheduleCard';
import AttendanceStatus from '../components/AttendanceTracker';
import FeeStatus from '../components/FeeStatus';
import ExamResults from '../components/PerformanceInsights';
import LogoutButton from '../components/LogoutButton';
import studentImage from '../assests/student.jpg';
const StudentDashboard = () => {

  const [section, setSection] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const loginEmail = localStorage.getItem('studentEmail');
  
 useEffect(() => {
    if (!loginEmail) {
      // Handle case where email isn't found (maybe redirect to login)
      console.error('No email found - redirect to login');
      return;
    }

    fetch('/api/students/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail }),
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error('Profile fetch error:', err));
  }, [loginEmail]);

  const renderSection = () => {
    switch (section) {
      case 'classes':
        return <ClassSchedule email={loginEmail} />;
      case 'attendance':
        return <AttendanceStatus />;
      case 'payments':
        return <FeeStatus studentEmail={loginEmail}  />;
      case 'results':
        return <ExamResults />;
      case 'logout':
        return <LogoutButton />;
      default:
  return (
    <div className="bg-white p-5 rounded shadow-sm animate__animated animate__fadeIn">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <img
          src={studentImage}
          alt="Welcome"
          className="img-fluid mb-4 mb-md-0"
          style={{ maxWidth: '450px', marginRight: '50px' }}
        />
        <div>
          <h2 className="text-primary mb-3" style={{ fontSize: '2.2rem' }}>
            Welcome, {profile?.name || 'Student'} 👋
          </h2>
          <p className="text-secondary mb-3" style={{ fontSize: '1.25rem' }}>
            This is your personalized dashboard where you can:
          </p>
          <ul className="list-unstyled text-muted" style={{ fontSize: '1.1rem' }}>
            <li>📚 <strong>View your class schedule</strong></li>
            <li>📝 <strong>Track your attendance</strong></li>
            <li>💰 <strong>Check your payment status</strong></li>
            <li>📊 <strong>Review your exam results</strong></li>
          </ul>
          <p className="text-muted mt-4" style={{ fontSize: '1.1rem' }}>
            Use the sidebar to navigate. We're glad to have you here!
          </p>
        </div>
      </div>
    </div>
  );


    }
  };

  const navButtons = [
    { label: 'Dashboard', icon: <FaHome />, key: 'dashboard' },
    { label: 'My Classes', icon: <FaBook />, key: 'classes' },
    { label: 'My Attendance', icon: <FaCalendarCheck />, key: 'attendance' },
    { label: 'My Payments', icon: <FaMoneyCheckAlt />, key: 'payments' },
    { label: 'Exam Results', icon: <FaChartBar />, key: 'results' },
    { label: 'Logout', icon: <FaSignOutAlt />, key: 'logout' },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4 shadow" style={{ width: '260px' }}>
        <div className="h3 text-center mb-4 border-bottom pb-2">🎓 Student Panel</div>
        {navButtons.map(({ label, icon, key }) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className={`btn btn-outline-light d-flex align-items-center w-100 mb-2 ${
              section === key ? 'active bg-primary' : ''
            }`}
            style={{ transition: 'all 0.2s ease' }}
          >
            <span className="me-2">{icon}</span>
            {label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-fill p-4">{renderSection()}</main>
    </div>
  );
};

export default StudentDashboard;
