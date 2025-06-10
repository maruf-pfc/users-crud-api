import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

import validate from '../middlewares/validate.js';
import { userSchema } from '../validations/userValidation.js';

router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/user', validate(userSchema), createUser);
router.put('/user/:id', validate(userSchema), updateUser);
router.delete('/user/:id', deleteUser);

export default router;
