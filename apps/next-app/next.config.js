/* eslint-disable import/no-extraneous-dependencies */
const { extendBaseConfig } = require('@cbhq/next-config');
const withLinaria = require('next-linaria');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = extendBaseConfig({}, [withLinaria, withBundleAnalyzer]);
