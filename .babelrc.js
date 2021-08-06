const path = require('path');

module.exports = {
  presets: [[path.join(__dirname, '../utils/babel/linariaPreset.js'), require('./linaria.config')]],
};
