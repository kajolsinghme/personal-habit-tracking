module.exports = {
  testEnvironment: "node",

  setupFilesAfterEnv: [
    "<rootDir>/tests/setup.ts",
  ],

  maxWorkers: 1,

  transform: {
    "^.+\\.tsx?$": [
      "@swc/jest",
    ],
  },

  testMatch: [
    "**/tests/**/*.test.ts",
  ],
};