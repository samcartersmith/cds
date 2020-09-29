module.exports = {
  /**
   * A list of paths to modules that run some code to configure or set up the testing environment
   * Each setupFile will be run once per test file
   */
  setupFiles: ['<rootDir>/jestSetup.ts'],

  /**
   * A list of paths to modules that run some code to configure or set up the testing framework
   * before each test file in the suite is executed
   */
  setupFilesAfterEnv: ['<rootDir>/jestSetupAfterEnv.ts'],
};
