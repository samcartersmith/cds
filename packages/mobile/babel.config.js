const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = {
  plugins: [],
  presets: [
    [
      'module:metro-react-native-babel-preset',
      '@babel/preset-env',
      {
        bugfixes: true,
        loose: true,
        modules: isTestEnv ? 'commonjs' : false,
        exclude: [
          // Preserve native async/await
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-transform-async-to-generator',
        ],
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};
