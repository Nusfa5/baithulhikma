import React, { useEffect, useState } from "react";
import API from "../services/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await API.get("http://localhost:5000/api/students/all");
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await API.delete(`http://localhost:5000/api/students/delete/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting student");
    }
  };

  // Start editing
  const handleEditClick = (student) => {
    setEditingStudent({ ...student });
  };

  // ✅ FIXED: Update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        `http://localhost:5000/api/students/update/${editingStudent.id}`,
        editingStudent
      );

      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? editingStudent : s
        )
      );

      setEditingStudent(null);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating student");
    }
  };

  // Loading and error UI
  if (loading) return <div className="text-center p-4">Loading students...</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="text-primary mb-4">📋 Student List</h4>

      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.filter(Boolean).map((student) => {
            const isEditing = editingStudent && editingStudent.id === student.id;

            return isEditing ? (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={editingStudent?.name || ""}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    className="form-control"
                    value={editingStudent?.email || ""}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, email: e.target.value })
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={handleUpdateStudent}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingStudent(null)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
