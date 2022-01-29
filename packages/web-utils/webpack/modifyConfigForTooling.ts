/* eslint-disable no-param-reassign */

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import type webpack from 'webpack';

const BABEL_OPTIONS = { configFile: true, rootMode: 'upward' };

export function modifyConfigForTooling(config: webpack.Configuration) {
  const isProduction = config.mode === 'production';

  // Inherit plugins that we require
  config.plugins?.push(new NodePolyfillPlugin());

  // Modify rules to support our tooling
  config.module?.rules?.forEach((rule) => {
    if (rule === '...' || !(rule.test instanceof RegExp) || !Array.isArray(rule.use)) {
      return;
    }

    // Add `linaria/loader` for .tsx files
    if ('.tsx'.match(rule.test)) {
      rule.use.push({
        loader: 'linaria/loader',
        options: {
          displayName: !isProduction,
          sourceMap: !isProduction,
          babelOptions: BABEL_OPTIONS,
        },
      });
    }

    // Add `babel-loader` for .mdx files
    if ('.mdx'.match(rule.test)) {
      rule.use.unshift({
        loader: 'babel-loader',
        options: BABEL_OPTIONS,
      });
    }

    // Update `babel-loader` options
    for (const use of rule.use) {
      if (
        typeof use === 'object' &&
        typeof use.options === 'object' &&
        use.loader?.includes('babel-loader')
      ) {
        Object.assign(use.options, BABEL_OPTIONS);
      }
    }
  });

  // Polling is required for Bazel to hot reload
  config.watchOptions = {
    ignored: /node_modules/,
    poll: 1000,
  };

  return config;
}
