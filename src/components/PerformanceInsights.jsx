import React, { useState } from 'react';
import axios from 'axios';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchResults = async (e) => {
    e.preventDefault();
    if (!email) return setError('Please enter a student email.');

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await axios.get('http://localhost:5000/api/exams/results', {
        params: { email },
      });
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch exam results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Exam Results</h2>

      <form onSubmit={fetchResults} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control border p-2 rounded"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Marks
        </button>
      </form>

      {loading && <p>Loading results...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && results.length > 0 && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Exam Name</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Marks</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={index}>
                <td className="p-2 border">{res.exam_name}</td>
                <td className="p-2 border">{new Date(res.date).toLocaleDateString()}</td>
                <td className="p-2 border">{res.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamResults;
