module.exports = {
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-transform-destructuring', { loose: true }],
    'replace-ts-export-assignment',
  ],
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-react', { runtime: 'classic' }],
    '@babel/preset-typescript',
  ],
};
