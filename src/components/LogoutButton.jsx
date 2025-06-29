import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Logic to handle logout
    localStorage.removeItem('authToken'); // Remove authentication token
    console.log('User logged out');
    window.location.href = '/'; // Redirect to login page
    
  };

  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Log Out</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Confirm Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
