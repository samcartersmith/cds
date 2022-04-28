module.exports = {
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-transform-destructuring', { loose: true }],
    'replace-ts-export-assignment',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: 'commonjs',
        useBuiltIns: false,
        corejs: undefined,
        exclude: ['@babel/plugin-proposal-dynamic-import'],
      },
    ],
    ['@babel/preset-react', { runtime: 'classic' }],
    '@babel/preset-typescript',
  ],
  ignore: ['**/*.test.ts', '**/*.test.tsx', 'node_modules/**', 'dist'],
};
