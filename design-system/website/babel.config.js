module.exports = api => {
  api.cache(false);

  return {
    presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  };
};
