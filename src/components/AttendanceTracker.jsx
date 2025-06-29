import React, { useState } from 'react';
import axios from 'axios';

const AttendanceStatus = () => {
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchSummary = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter student email');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/attendance/summary', {
        params: { email },
        
      });
     
      setSummary(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">📊 Attendance Tracker</h2>

      <form onSubmit={handleFetchSummary} className="mb-4">
        <input
          type="email"
          placeholder="Enter student email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2 p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Get Summary
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading && <p className="text-center">Loading...</p>}

      {summary && !loading && (
        <ul className="space-y-2 text-center mt-4">
          <li>Total Classes: {summary.totalClasses}</li>
          <li>Attended: {summary.attended}</li>
          <li>Attendance: {summary.percentage}%</li>
        </ul>
      )}
    </div>
  );
};

export default AttendanceStatus;
