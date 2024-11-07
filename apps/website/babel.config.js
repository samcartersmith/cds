// // @ts-check
// /** @type {import('@babel/core').TransformOptions} */
// module.exports = {
//   presets: [
//     '@docusaurus/core/lib/babel/preset',
//     '@babel/preset-env',
//     [
//       '@babel/preset-react',
//       {
//         runtime: 'automatic',
//       },
//     ],
//     '@babel/preset-typescript',
//     '@linaria',
//   ],
// };

module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset'), '@linaria'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};
