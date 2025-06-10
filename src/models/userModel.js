import pool from '../configs/db.js';

export const getAllUsers = () => {
  return pool.query('SELECT * FROM users');
};

export const getUserById = (id) => {
  return pool.query('SELECT * FROM users WHERE id = $1', [id]);
};

export const createUser = (name, email) => {
  return pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
};

// export const updateUser = (id, name, email) => {
//   return pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
//     [name, email, id]
//   );
// };
// userModel.js

export const updateUser = (id, name, email) => {
  const fields = [];
  const values = [];
  let index = 1;

  if (name) {
    fields.push(`name = $${index++}`);
    values.push(name);
  }

  if (email) {
    fields.push(`email = $${index++}`);
    values.push(email);
  }

  if (fields.length === 0) {
    return Promise.resolve({ rows: [] }); // Nothing to update
  }

  values.push(id); // final param for WHERE clause

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
  return pool.query(query, values);
};

export const deleteUser = (id) => {
  return pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
};
