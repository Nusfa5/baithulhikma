const db = require('../models/db');

const ParentModel = {
  // Parent table
  createParent: ({ parent_id, parent_name, email, password }) => {
    return db.query(
      'INSERT INTO parent (parent_id, parent_name, email, password) VALUES (?, ?, ?, ?)',
      [parent_id, parent_name, email, password]
    );
  },

  getAllParents: () => {
    return db.query('SELECT * FROM parent');
  },

  getParent: (parent_id) => {
    return db.query(
      'SELECT * FROM parent WHERE parent_id = ?',
      [parent_id]
    );
  }
};