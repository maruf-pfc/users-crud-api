// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './configs/db.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import createUserTable from './database/createUserTable.js';
import { swaggerSpec, swaggerUi } from './configs/swagger.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', userRoutes);

// Swagger Docs
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
app.use(errorHandler);

// Create tables if needed
createUserTable();

// Health check & DB info route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query(`SELECT current_database()`);
    const dbName = result.rows[0].current_database;
    res.status(200).json({ message: `Database name = ${dbName}` });
  } catch (error) {
    console.error('Error fetching DB name:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;
