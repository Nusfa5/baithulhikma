const db = require('./db'); // Adjust the path to your db.js file

const createUser = async (user) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [user.name, user.email, user.password, user.role]
  );
  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0]; // Return the first matching user
};

module.exports = {
  createUser,
  findUserByEmail,
};
