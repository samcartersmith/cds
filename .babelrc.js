// This is purely for storybook and testing purposes, otherwise
// files that contain Linaria code would fail.

const linaria = require('./linaria.config.js');

module.exports = {
  presets: [['linaria/babel', linaria]],
};
