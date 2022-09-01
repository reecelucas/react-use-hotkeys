module.exports = {
  roots: ["<rootDir>/src/__tests__/"],
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/helpers/", "<rootDir>/node_modules/"],
  testEnvironment: "jsdom",
  collectCoverageFrom: ["<rootDir>/src/index.ts"],
}
