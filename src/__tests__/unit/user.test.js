// src/__tests__/user.test.js

// THIS IS THE FIX: Explicitly import Jest's globals
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

import request from 'supertest';
import app from '../../app.js';
import * as userModel from '../../models/userModel.js'; // This will be the mock version
import logger from '../../utils/logger.js'; // This will also be the mock version

// The moduleNameMapper in jest.config.js handles all the mocking for us now.

describe('User API', () => {
  beforeEach(() => {
    // It's still a best practice to clear mocks before each test
    // to prevent a test from influencing another.
    jest.clearAllMocks();
  });

  describe('GET /api/v1/users', () => {
    it('should return all users and a 200 status code', async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ];
      // Note: We are now calling the mock function directly.
      userModel.getAllUsers.mockResolvedValue({ rows: mockUsers });

      const res = await request(app).get('/api/v1/users');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUsers);
      expect(userModel.getAllUsers).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith('Fetched 2 user(s)', 'GET', 200);
    });

    it('should return 500 on a server error', async () => {
      userModel.getAllUsers.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/api/v1/users');

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Internal server error' });
      expect(logger.error).toHaveBeenCalledWith(
        'Error fetching users: DB Error',
        'GET',
        500
      );
    });
  });

  // Also, I noticed a typo in your test code. The routes should be /users/ (plural)
  describe('GET /api/v1/users/:id', () => {
    it('should return a single user if found', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      userModel.getUserById.mockResolvedValue({ rows: [mockUser] });

      const res = await request(app).get('/api/v1/users/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUser);
      expect(userModel.getUserById).toHaveBeenCalledWith('1');
    });

    it('should return 404 if user is not found', async () => {
      userModel.getUserById.mockResolvedValue({ rows: [] });

      const res = await request(app).get('/api/v1/users/999');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error: 'User not found' });
      expect(logger.warn).toHaveBeenCalledWith(
        'User not found (ID: 999)',
        'GET',
        404
      );
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user and return it with a 201 status', async () => {
      const newUserPayload = { name: 'New User', email: 'new@example.com' };
      const createdUser = { id: 3, ...newUserPayload };
      userModel.createUser.mockResolvedValue({ rows: [createdUser] });

      const res = await request(app).post('/api/v1/users').send(newUserPayload);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(createdUser);
      expect(userModel.createUser).toHaveBeenCalledWith(
        newUserPayload.name,
        newUserPayload.email
      );
      expect(logger.info).toHaveBeenCalledWith(
        'User created (ID: 3)',
        'POST',
        201
      );
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update an existing user', async () => {
      const updatePayload = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };
      const updatedUser = { id: 1, ...updatePayload };
      userModel.updateUser.mockResolvedValue({ rows: [updatedUser] });

      const res = await request(app).put('/api/v1/users/1').send(updatePayload);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedUser);
      expect(userModel.updateUser).toHaveBeenCalledWith(
        '1',
        updatePayload.name,
        updatePayload.email
      );
    });

    it('should return 400 for invalid update data', async () => {
      const invalidPayload = { name: 'Bad Data', email: 'not-an-email' };

      // ADD THIS LINE BACK
      const res = await request(app)
        .put('/api/v1/users/1')
        .send(invalidPayload);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ errors: ['"email" must be a valid email'] });
      expect(userModel.updateUser).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user and return a success message', async () => {
      userModel.deleteUser.mockResolvedValue({ rows: [{ id: 1 }] });

      const res = await request(app).delete('/api/v1/users/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'User deleted successfully' });
      expect(userModel.deleteUser).toHaveBeenCalledWith('1');
    });
  });
});
