// @ts-check
/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
    '@linaria/babel-preset',
  ],
}
