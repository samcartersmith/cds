module.exports = {
  displayName: 'web',
  preset: '@cbhq/jest-preset',
  setupFiles: ['<rootDir>/jest/setup.js'],
  coverageReporters: ['text-summary', 'text', 'json-summary'],
  coveragePathIgnorePatterns: [
    '<rootDir>/styles',
    '<rootDir>/storybook-decorators',
    '.stories.tsx',
    '__stories__',
    /* deprecated */
    '<rootDir>/icons/Badge.tsx',
    '<rootDir>/animation/Animated.ts',
    '<rootDir>/collapsible/CollapseArrow.tsx',
  ],
};
