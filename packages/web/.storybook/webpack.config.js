const path = require('path');
const Dotenv = require('dotenv-webpack');

const HtmlPlugin = require('html-webpack-plugin');

const BABEL_OPTIONS = { configFile: true, rootMode: 'upward' };

module.exports = ({config, environmentFile}) => {
    config.plugins?.push(
        new Dotenv({
            path: environmentFile,
            STORYBOOK_SKIP_ANIMATION: process.env.STORYBOOK_SKIP_ANIMATION,
        }),
    );

    config.plugins.push(
        new HtmlPlugin({
            inject: false,
            filename: 'addon-designs-oauth.html',
            template: path.resolve(__dirname, './figma_oauth.html'),
        }),
    );

    const isProduction = config.mode === 'production';

    config.module?.rules?.forEach((rule) => {
        if (rule === '...' || !(rule.test instanceof RegExp) || !Array.isArray(rule.use)) {
            return;
        }

        // Add `linaria/loader` for .tsx files
        if ('.tsx'.match(rule.test) || '.ts'.match(rule.test)) {
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

    config.resolve.alias['@cbhq/cds-common'] = path.resolve(__dirname, '../../common');
    config.resolve.alias['@cbhq/cds-lottie-files'] = path.resolve(__dirname, '../../lottie-files');
    config.resolve.alias['@cbhq/cds-fonts'] = path.resolve(__dirname, '../../fonts');
    config.resolve.alias['@cbhq/cds-utils'] = path.resolve(__dirname, '../../utils');
    config.resolve.alias['@cbhq/cds-web-utils'] = path.resolve(__dirname, '../../web-utils');

    return config;
};
