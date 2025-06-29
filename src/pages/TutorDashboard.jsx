import React, { useState } from 'react';
import {
  FaChalkboardTeacher,
  FaUsers,
  FaChartLine,
  FaComments,
  FaClipboardList,
  FaUserCheck,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';

import ClassSchedule from '../components/ClassScheduleCard';
import StudentList from '../components/StudentList';
import StudentProgress from '../components/StudentProgress';
import FeedbackCenter from '../components/FeedbackCenter';
import ReportsOverview from '../components/ReportsOverview';
import StudentPerformance from '../components/PerformanceInsights';
import LogoutButton from '../components/LogoutButton';

const TutorDashboard = () => {
  const [section, setSection] = useState('dashboard');

  const renderSection = () => {
    switch (section) {
      case 'classSchedule':
        return <ClassSchedule />;
      case 'students':
        return <StudentList />;
      case 'progress':
        return <StudentProgress />;
      case 'feedback':
        return <FeedbackCenter />;
      case 'reports':
        return <ReportsOverview />;
      case 'performance':
        return <StudentPerformance />;
      case 'logout':
        return <LogoutButton />;
      default:
        return (
          <div className="bg-white p-5 rounded shadow-sm animate__animated animate__fadeIn">
            <h2 className="mb-3 text-primary">Welcome, Tutor 👋</h2>
            <p className="lead">Use the side menu to manage your classes and support your students.</p>
          </div>
        );
    }
  };

  const navButtons = [
    { label: 'Dashboard', icon: <FaHome />, key: 'dashboard' },
    { label: 'Class Schedule', icon: <FaChalkboardTeacher />, key: 'classSchedule' },
    { label: 'Enrolled Students', icon: <FaUsers />, key: 'students' },
    { label: 'Student Progress', icon: <FaChartLine />, key: 'progress' },
    { label: 'Feedback & Announcements', icon: <FaComments />, key: 'feedback' },
    { label: 'Attendance & Reports', icon: <FaClipboardList />, key: 'reports' },
    { label: 'Student Performance', icon: <FaUserCheck />, key: 'performance' },
    { label: 'Logout', icon: <FaSignOutAlt />, key: 'logout' },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4 shadow" style={{ width: '260px' }}>
        <div className="h3 text-center mb-4 border-bottom pb-2">📚 Tutor Panel</div>
        {navButtons.map(({ label, icon, key }) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className={`btn btn-outline-light d-flex align-items-center w-100 mb-2 ${section === key ? 'active bg-primary' : ''}`}
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

export default TutorDashboard;
