import * as userModel from '../models/userModel.js';
import logger from '../utils/logger.js';
import { updateUserSchema } from '../validations/userValidation.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const { rows } = await userModel.getAllUsers();

    if (rows.length === 0) {
      logger.info('No users found', req.method, 200);
    } else {
      logger.info(`Fetched ${rows.length} user(s)`, req.method, 200);
    }

    res.status(200).json(rows);
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`, req.method, 500);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await userModel.getUserById(id);

    if (rows.length === 0) {
      logger.warn(`User not found (ID: ${id})`, req.method, 404);
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`User fetched (ID: ${id})`, req.method, 200);
    res.status(200).json(rows[0]);
  } catch (error) {
    logger.error(
      `Error fetching user by ID: ${error.message}`,
      req.method,
      500
    );
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { rows } = await userModel.createUser(name, email);

    logger.info(`User created (ID: ${rows[0].id})`, req.method, 201);
    res.status(201).json(rows[0]);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`, req.method, 500);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user
// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email } = req.body;
//     const { rows } = await userModel.updateUser(id, name, email);

//     if (rows.length === 0) {
//       logger.warn(`User not found for update (ID: ${id})`, req.method, 404);
//       return res.status(404).json({ error: 'User not found' });
//     }

//     logger.info(`User updated (ID: ${id})`, req.method, 200);
//     res.status(200).json(rows[0]);
//   } catch (error) {
//     logger.error(`Error updating user: ${error.message}`, req.method, 500);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
export const updateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const { rows } = await userModel.updateUser(id, name, email);

    if (rows.length === 0) {
      logger.warn(`User not found for update (ID: ${id})`, req.method, 404);
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`User updated (ID: ${id})`, req.method, 200);
    res.status(200).json(rows[0]);
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`, req.method, 500);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await userModel.deleteUser(id);

    if (rows.length === 0) {
      logger.warn(`User not found for deletion (ID: ${id})`, req.method, 404);
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`User deleted (ID: ${id})`, req.method, 200);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`, req.method, 500);
    res.status(500).json({ error: 'Internal server error' });
  }
};
