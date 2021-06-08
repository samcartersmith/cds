const rootBabelConfig = require('../../../../babel.config');

module.exports = api => {
  const config = rootBabelConfig(api);

  return config;
};
