module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset'), '@linaria'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./'],
        alias: {
          ':cds-website': './',
          linaria: '@linaria/core',
        },
      },
    ],
  ],
};
