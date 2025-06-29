import React, { useEffect, useState } from 'react';
import StudentProgressReport from '../components/StudentProgress';
import AttendanceStatus from '../components/AttendanceTracker';
import ExamResults from '../components/PerformanceInsights';
import FeedbackCenter from '../components/FeedbackCenter';
import LogoutButton from '../components/LogoutButton';

const ParentDashboard = () => {
  const [section, setSection] = useState('home');
  const [studentProfile, setStudentProfile] = useState(null);

  const parentEmail = 'parent@example.com';

  useEffect(() => {
    fetch('/api/parent/student-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: parentEmail }),
    })
      .then((res) => res.json())
      .then((data) => setStudentProfile(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const renderSection = () => {
    switch (section) {
      case 'progress':
        return <StudentProgressReport />;
      case 'attendance':
        return <AttendanceStatus />;
      case 'exam':
        return <ExamResults />;
      case 'feedback':
        return <FeedbackCenter />;
      case 'logout':
        return <LogoutButton />;
      default:
        return (
          <div className="bg-white p-4 rounded shadow-md animate-fade-in">
            <h2 className="h4 mb-2">Welcome, Parent!</h2>
            <p className="mb-0">
              Monitor your child's progress, attendance, and academic performance.
              
            </p>
          </div>
        );
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-secondary text-white p-4" style={{ width: '250px' }}>
        <div className="h4 text-center mb-4">📘 Parent Portal</div>

        <button
          onClick={() => setSection('home')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Home
        </button>

        <button
          onClick={() => setSection('progress')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Progress Report
        </button>

        <button
          onClick={() => setSection('attendance')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Attendance Overview
        </button>

        <button
          onClick={() => setSection('exam')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Exam Results
        </button>

        <button
          onClick={() => setSection('feedback')}
          className="btn btn-outline-light d-block w-100 mb-2"
        >
          Tutor Feedback
        </button>

        <button
          onClick={() => setSection('logout')}
          className="btn btn-outline-light d-block w-100"
        >
          Log out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-fill p-4">{renderSection()}</main>
    </div>
  );
};

export default ParentDashboard;
