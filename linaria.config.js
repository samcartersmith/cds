const isTesting = process.env.NODE_ENV === 'test';

module.exports = {
  classNameSlug: (hash, title) => `cds-${title}${isTesting ? '' : `-${hash}`}`,
  // Linaria doesn't inherit our Babel config when dealing with
  // interpolations and module resolving, so customize here.
  babelOptions: {
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
  },
};
