const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
require('dotenv').config();

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = { ...userData, password: hashedPassword };
  return userRepository.createUser(user);
};

const login = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, role: user.role };
};

module.exports = {
  register,
  login,
};
