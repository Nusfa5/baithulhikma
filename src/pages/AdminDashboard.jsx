import React, { useState } from 'react';
import { FaUsers, FaUserTie, FaMoneyCheckAlt, FaCalendarCheck, FaFileAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';

import StudentList from '../components/StudentList';
import TutorList from '../components/TutorList';
import PaymentRecords from '../components/PaymentRecords';
import AttendanceOverview from '../components/AttendanceOverview';
import ExamManagement from '../components/ExamManagement';
import LogoutButton from '../components/LogoutButton';

const AdminDashboard = () => {
  const [section, setSection] = useState('dashboard');

  const renderSection = () => {
    switch (section) {
      case 'students':
        return <StudentList />;
      case 'tutors':
        return <TutorList />;
      case 'payments':
        return <PaymentRecords />;
      case 'attendance':
        return <AttendanceOverview />;
      case 'exams':
        return <ExamManagement />;
      case 'logout':
        return <LogoutButton />;
      default:
        return (
          <div className="bg-white p-5 rounded shadow-sm animate__animated animate__fadeIn">
            <h2 className="mb-3 text-primary">Welcome, Admin 👋</h2>
            <p className="lead">Use the side menu to navigate and manage the platform.</p>
          </div>
        );
    }
  };

  const navButtons = [
    { label: 'Dashboard', icon: <FaHome />, key: 'dashboard' },
    { label: 'Manage Students', icon: <FaUsers />, key: 'students' },
    { label: 'Manage Tutors', icon: <FaUserTie />, key: 'tutors' },
    { label: 'Payments', icon: <FaMoneyCheckAlt />, key: 'payments' },
    { label: 'Attendance', icon: <FaCalendarCheck />, key: 'attendance' },
    { label: 'Exams', icon: <FaFileAlt />, key: 'exams' },
    { label: 'Logout', icon: <FaSignOutAlt />, key: 'logout' },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4 shadow" style={{ width: '250px' }}>
        <div className="h3 text-center mb-4 border-bottom pb-2">🎓 Admin Panel</div>
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

export default AdminDashboard;
