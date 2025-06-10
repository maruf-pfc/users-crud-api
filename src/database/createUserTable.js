import pool from '../configs/db.js';
import logger from '../utils/logger.js';

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    logger.info('Users table created or already exists.');
  } catch (err) {
    logger.error(`Failed to create users table: ${err.message}`);
  }
};

export default createUserTable;
