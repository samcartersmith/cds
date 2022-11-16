module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': 'jest-transform-stub',
  },
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/lib'],
};
