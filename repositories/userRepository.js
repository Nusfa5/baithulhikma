const userModel = require('../models/userModel');

const createUser = async (user) => {
  return await userModel.createUser(user);
};

const findUserByEmail = async (email) => {
  return await userModel.findUserByEmail(email);
};

module.exports = {
  createUser,
  findUserByEmail,
};
