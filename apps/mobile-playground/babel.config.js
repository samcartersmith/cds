const cdsMobilePackageConfig = require('../../packages/mobile/babel.config');

// this enforces the same build & jest babel as cds-mobile to help identify mobile build errors in a local environment
module.exports = cdsMobilePackageConfig;
