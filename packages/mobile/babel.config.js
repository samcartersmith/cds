module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./'],
        alias: {
          '@cbhq/cds-common': '../common',
          '@cbhq/cds-utils': '../utils',
          '@cbhq/cds-lottie-files': '../lottie-files',
          '@cbhq/cds-fonts': '../fonts',
          '@cbhq/cds-web-utils': '../web-utils',
          '@cbhq/cds-web': '../web',
        },
      },
    ],
  ],
};
