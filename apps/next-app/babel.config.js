module.exports = {
  presets: [
    'next/babel',
    ['@babel/preset-env', { modules: false }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    '@linaria/babel-preset',
  ],
};
