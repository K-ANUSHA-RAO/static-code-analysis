module.exports = {
  testEnvironment: "jsdom", // Ensure this line is present
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Add this to point to the setup file
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Collect coverage from all JavaScript and JSX files in src
    //"!**/node_modules/**", // Exclude node_modules
    //"!**/dist/**", // Exclude dist folder
    "!src/**/*.spec.jsx", // Optionally exclude test files
    "!src/*.{js,jsx}",
  ],
};
