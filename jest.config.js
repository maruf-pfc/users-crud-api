export default {
  testEnvironment: 'node',

  // Add the new mappings here.
  moduleNameMapper: {
    // Database mock (already working)
    '.*/configs/db\\.js$': '<rootDir>/src/__mocks__/db.js',

    // User Model mock
    '.*/models/userModel\\.js$': '<rootDir>/src/__mocks__/userModel.js',

    // Logger mock
    '.*/utils/logger\\.js$': '<rootDir>/src/__mocks__/logger.js',
  },
};
