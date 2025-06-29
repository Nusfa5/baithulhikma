import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassSchedule = ({ email }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) return; // Don't run if email is missing

    const fetchSchedule = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/timetable?email=${email}`);
        setSchedule(res.data.subjects); // Store the returned subject list
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule(); // Call the function
  }, [email]);

  if (!email) return <p className="text-danger">Email is missing. Please log in.</p>;
  if (loading) return <p className="text-secondary">Loading schedule...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="bg-white p-4 p-md-5 rounded shadow animate__animated animate__fadeIn">
      <h2 className="text-primary fw-bold fs-4 mb-4 border-bottom pb-2">📅 My Class Schedule</h2>
      <ul className="list-unstyled">
        {schedule.map((cls, index) => (
          <li
            key={index}
            className="mb-3 p-3 border rounded bg-light shadow-sm hover-shadow"
            style={{ transition: 'all 0.2s ease-in-out' }}
          >
            <div className="fw-bold fs-5 mb-1">{cls.subject_name}</div>
            <div className="text-dark">
              🕒 {cls.time}
            </div>
            <div className="text-muted small">
              👨‍🏫 Tutor: {cls.tutor_name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassSchedule;
