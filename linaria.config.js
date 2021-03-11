const isTesting = process.env.NODE_ENV === 'test';

module.exports = {
  classNameSlug: (hash, title) => `cds-${title}${isTesting ? '' : `-${hash}`}`,
};
