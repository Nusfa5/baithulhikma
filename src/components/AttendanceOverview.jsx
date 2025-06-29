import React, { useState } from 'react';
import axios from 'axios';

const AttendanceOverview = () => {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [tutorId, setTutorId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [addStatus, setAddStatus] = useState('Present');
  const [addRemarks, setAddRemarks] = useState('');
    // Fetch attendance records
  const handleFetch = async (e) => {
    e.preventDefault();
    if (!email || !fromDate || !toDate) {
      setError('All fields are required to fetch attendance.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.get('http://localhost:5000/api/attendance/student', {
        params: {
          student_email: email,
          from: fromDate,
          to: toDate,
        },
      });
      setRecords(response.data.attendance);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch attendance records.');
    } finally {
      setLoading(false);
    }
  };
     // Add a new attendance record
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!studentId || !email || !tutorId || !courseId || !fromDate) {
      setError('All fields are required to add attendance.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/api/attendance/mark', {
        student_id: studentId,
        student_email: email,
        tutor_id: tutorId,
        course_id: courseId,
        date: fromDate,
        status: addStatus,
        remarks: addRemarks,
      });

      setSuccess('Attendance added successfully.');
      setAddRemarks('');
      handleFetch(e); // Refresh records
    } catch (err) {
      console.error(err);
      setError('Failed to add attendance record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center text-primary">📆 Attendance Overview</h2>

      {/* Fetch Attendance Form */}
      <form onSubmit={handleFetch} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control border p-2 rounded"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="form-control border p-2 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="form-control border p-2 rounded"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Attendance
        </button>
      </form>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Add Attendance Form */}
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-primary">➕ Add Attendance Record</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="form-control border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Tutor ID"
            value={tutorId}
            onChange={(e) => setTutorId(e.target.value)}
            className="form-control border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="form-control border p-2 rounded"
          />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="form-control border p-2 rounded"
          />
          <select
            value={addStatus}
            onChange={(e) => setAddStatus(e.target.value)}
            className="form-control border p-2 rounded"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <input
            type="text"
            placeholder="Remarks (optional)"
            value={addRemarks}
            onChange={(e) => setAddRemarks(e.target.value)}
            className="form-control border p-2 rounded"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add Attendance
          </button>
        </form>
      </div>

      {/* Attendance Table */}
      {!loading && records.length > 0 && (
        <div className="overflow-x-auto mt-8">
          <table className="table table-bordered table-hover w-full">
            <thead className="table-info">
              <tr>
                <th>Date</th>
                <th>Student Email</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, idx) => (
                <tr key={idx}>
                  <td>{rec.date}</td>
                  <td>{rec.student_email}</td>
                  <td>{rec.status}</td>
                  <td>{rec.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && records.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-6">No records found.</p>
      )}
    </div>
  );
};

export default AttendanceOverview;
