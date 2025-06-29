import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TutorList = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tutors/tutor-subjects');
        setTutors(response.data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="text-primary mb-3">👨‍🏫 Tutor List</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Name</th>
           
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {tutors.length > 0 ? (
            tutors.map((tutor, index) => (
              <tr key={index}>
                <td>{tutor.tutor_id}</td>
                <td>{tutor.tutor_name}</td>
                
                <td>{tutor.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No tutors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TutorList;
