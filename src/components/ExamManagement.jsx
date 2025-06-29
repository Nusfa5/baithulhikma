import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({ name: '', date: '', subject_id: '' });
  const [markEntry, setMarkEntry] = useState({ student_email: '', exam_id: '', marks: '', high_mark: '' });
  const [studentEmailToSearch, setStudentEmailToSearch] = useState('');
  const [studentMarks, setStudentMarks] = useState([]);

  // Fetch all exams
  const fetchExams = () => {
    axios.get('http://localhost:5000/api/exams/exams')
      .then(res => setExams(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleExamChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleAddExam = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/exams/create', newExam)
      .then(() => {
        setNewExam({ name: '', date: '', subject_id: '' });
        fetchExams();
      })
      .catch(err => console.error(err));
  };

  const handleMarkChange = (e) => {
    setMarkEntry({ ...markEntry, [e.target.name]: e.target.value });
  };

  const handleAddMark = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/exam-marks/add', markEntry)
      .then(() => {
        alert('Marks added successfully!');
        setMarkEntry({ student_email: '', exam_id: '', marks: '', high_mark: '' });
      })
      .catch(err => {
        console.error(err);
        alert('Failed to add marks');
      });
  };

  const handleSearchStudentMarks = () => {
    axios.get(`http://localhost:5000/api/exam-marks/student?student_email=${studentEmailToSearch}`)
      .then(res => setStudentMarks(res.data))
      .catch(err => {
        console.error(err);
        alert('Failed to fetch student marks');
      });
  };

  return (
    <div className="container mt-4">
      <h4 className="text-primary mb-3">📝 Exam Management</h4>

      {/* Add Exam Form */}
      <form className="mb-4" onSubmit={handleAddExam}>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              placeholder="Exam Name"
              className="form-control"
              value={newExam.name}
              onChange={handleExamChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              name="date"
              className="form-control"
              value={newExam.date}
              onChange={handleExamChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="subject_id"
              placeholder="Subject ID"
              className="form-control"
              value={newExam.subject_id}
              onChange={handleExamChange}
              required
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-success w-100">Add</button>
          </div>
        </div>
      </form>

      {/* Exam Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-danger">
          <tr>
            <th>Exam</th>
            <th>Date</th>
            <th>Subject ID</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>{exam.date}</td>
              <td>{exam.subject_id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Add Marks */}
      <h5 className="text-secondary">➕ Add Student Marks</h5>
      <form className="row g-2 mb-4" onSubmit={handleAddMark}>
        <div className="col-md-3">
          <input
            type="email"
            name="student_email"
            placeholder="Student Email"
            className="form-control"
            value={markEntry.student_email}
            onChange={handleMarkChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="exam_id"
            placeholder="Exam ID"
            className="form-control"
            value={markEntry.exam_id}
            onChange={handleMarkChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="marks"
            placeholder="Marks"
            className="form-control"
            value={markEntry.marks}
            onChange={handleMarkChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="high_mark"
            placeholder="High Mark"
            className="form-control"
            value={markEntry.high_mark}
            onChange={handleMarkChange}
            required
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary w-100">Add Marks</button>
        </div>
      </form>

      <hr />

      {/* Get Student Marks */}
      <h5 className="text-secondary">🔍 Search Student Marks</h5>
      <div className="row g-2 align-items-center mb-3">
        <div className="col-md-6">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Student Email"
            value={studentEmailToSearch}
            onChange={(e) => setStudentEmailToSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-info w-100" onClick={handleSearchStudentMarks}>Search</button>
        </div>
      </div>

      {studentMarks.length > 0 && (
        <table className="table table-bordered">
          <thead className="table-success">
            <tr>
              <th>Exam</th>
              <th>Subject ID</th>
              <th>Date</th>
              <th>Marks</th>
              <th>High Mark</th>
            </tr>
          </thead>
          <tbody>
            {studentMarks.map((mark, index) => (
              <tr key={index}>
                <td>{mark.exam_name}</td>
                <td>{mark.subject_id}</td>
                <td>{mark.date}</td>
                <td>{mark.marks}</td>
                <td>{mark.high_mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamManagement;
