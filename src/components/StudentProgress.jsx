import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentProgress = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exam-marks/view');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student progress:', error);
      }
    };

    fetchProgress();
  }, []);

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Improving':
        return 'bg-success';
      case 'Needs Attention':
        return 'bg-warning';
      case 'Falling Behind':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        Student Progress Overview
      </div>
      <div className="card-body">
        <ul className="list-group">
          {students.map((student, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{student.name}</strong><br />
                  <small>
                    {student.marks && student.marks.length > 0 && (
                      <>
                        Last Exam: {student.marks[student.marks.length - 1].exam} - {student.marks[student.marks.length - 1].mark}%
                      </>
                    )}
                  </small>
                </div>
                <span className={`badge ${getBadgeClass(student.status)} px-3 py-2`}>
                  {student.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentProgress;
