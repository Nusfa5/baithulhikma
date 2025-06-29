import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportsOverview = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white">
        Attendance & Class Reports
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Class</th>
              <th>Attendance %</th>
              <th>Average Score</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.class}</td>
                <td>{report.attendance}</td>
                <td>{report.averageScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsOverview;
