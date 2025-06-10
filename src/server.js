import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './configs/db.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import createUserTable from './database/createUserTable.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/', userRoutes);

// error handling middleware
app.use(errorHandler);

// create database tables
createUserTable();

// db connection
app.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT current_database()`);
    const dbName = result.rows[0].current_database;
    res.status(200).json({ message: `Database name = ${dbName}` });
  } catch (error) {
    console.error('Error fetching database name:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:5000`);
});
