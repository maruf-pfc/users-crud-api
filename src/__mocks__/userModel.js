// src/__mocks__/userModel.js
import { jest } from '@jest/globals';

// Export mock functions for every function in the real userModel.js
export const getAllUsers = jest.fn();
export const getUserById = jest.fn();
export const createUser = jest.fn();
export const updateUser = jest.fn();
export const deleteUser = jest.fn();
