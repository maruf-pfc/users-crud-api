import { jest } from '@jest/globals';

export default {
  on: jest.fn(),
  query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
};
