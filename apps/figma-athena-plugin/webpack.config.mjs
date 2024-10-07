// @ts-check
/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import InlineChunkHtmlPlugin from 'react-dev-utils/InlineChunkHtmlPlugin.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (env, argv) =>
  /** @type {import('webpack').Configuration} */
  ([
    {
      entry: {
        app: './src/app/index.tsx',
        plugin: './src/plugin/index.ts',
      },
      devtool: argv.mode === 'production' ? false : 'inline-source-map',
      // optimization: {
      //   minimize: false,
      //   usedExports: true,
      // },
      output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
      },
      resolve: {
        // modules: ['node_modules'],
        // exportsFields: ['exports'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        extensionAlias: {
          // Make .js/.jsx resolve to .ts/.tsx similar to TypeScript
          '.js': ['.ts', '.js'],
          '.jsx': ['.tsx', '.jsx'],
        },
        // This is only necessary when a package's package.json exports are set up correctly
        // alias:
        //   argv.mode !== 'development'
        //     ? {}
        //     : {
        //         // Use source files in development
        //         '@cbhq/cds-web': path.resolve(root, './packages/web/index.ts'),
        //         '@cbhq/cds-web/*': path.resolve(root, './packages/web/*'),
        //       },
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true,
      },
      module: {
        rules: [
          {
            test: /\.(js|ts)x?$/,
            exclude: /node_modules/,
            use: [
              'babel-loader',
              {
                loader: '@linaria/webpack-loader',
                options: {
                  sourceMap: argv.mode === 'development',
                },
              },
            ],
          },
          { test: /\.css$/, use: ['style-loader', { loader: 'css-loader' }] },
          {
            test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
            type: 'asset',
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/app/index.html',
          chunks: ['app'],
          cache: false,
        }),
        new InlineChunkHtmlPlugin(
          // @ts-expect-error
          HtmlWebpackPlugin,
          [/app/],
        ),
      ],
      performance: {
        hints: false,
      },
    },
  ]);
