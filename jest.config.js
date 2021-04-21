/* eslint-disable no-undef */
module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "node",
  testTimeout: 90000,
  // preset: "@shelf/jest-mongodb",
  // watchPathIgnorePatterns: ["globalConfig"],
  // verbose: true,
};
