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
  moduleNameMapper: {
    // d3 issue: https://github.com/facebook/jest/issues/12036
    'd3-color': '<rootDir>/../../node_modules/d3-color/dist/d3-color.min.js',
  },
};
