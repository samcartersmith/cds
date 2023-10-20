/* eslint-disable import/no-extraneous-dependencies */
const { extendBaseConfig } = require('@cbhq/next-config');
const withLinaria = require('next-linaria');

module.exports = extendBaseConfig({}, [withLinaria]);
