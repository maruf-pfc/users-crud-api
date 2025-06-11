// src/__mocks__/logger.js
import { jest } from '@jest/globals';

// Export a default object with mock functions for each log level.
export default {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
