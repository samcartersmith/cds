module.exports = {
  displayName: 'web',
  preset: '../../jest.preset.js',
  setupFiles: ['./jest/setup.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/styles',
    '<rootDir>/storybook-decorators',
    '.stories.tsx',
    '__stories__',
  ],
};
