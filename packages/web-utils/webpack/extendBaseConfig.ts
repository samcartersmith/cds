import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { config, DotenvParseOutput } from 'dotenv';
import DotenvWebpack from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from 'path';
import type webpack from 'webpack';

// We want the output path to be relative to the Bazel package running the command.
// This only happens in `serve` mode, otherwise `build` passes the path on the command line.
function determineOutputPath(): string {
  const parts = [__dirname];
  const target = process.env.BAZEL_TARGET;

  if (target && process.env.WEBPACK_DEV_SERVER) {
    // //eng/some/path:dev_server_development
    parts.push(target.slice(2).split(':')[0]);
  }

  return path.join(...parts, 'build');
}

// This function enforces that our all of the values defined in .env.example
// exist in the environment file in use at build time.
//
// We know this feature exists in dotenv-webpack using the safe: true flag,
// but unfortunately it does not allow us to pass a path to the .env.example file
// which is required for bazel builds
function validateEnvironmentMatchesExample(
  buildEnvironmentVariables: DotenvParseOutput = {},
  exampleEnvironmentVariables: DotenvParseOutput = {},
) {
  const buildKeys = new Set(Object.keys(buildEnvironmentVariables));
  const exampleKeys = new Set(Object.keys(exampleEnvironmentVariables));

  for (const key of buildKeys) {
    if (!exampleKeys.has(key)) {
      throw new Error(
        `Your build environment file contained a key: ${key} which did not exist in the .env.example`,
      );
    }
  }

  for (const key of exampleKeys) {
    if (!buildKeys.has(key)) {
      throw new Error(
        `Your build environment file is missing a key: ${key} which was defined in the .env.example`,
      );
    }
  }
}

type WebpackOptions = {
  mode?: webpack.Configuration['mode'];
  port?: number;
};

type ExtendOptions = {
  htmlTemplate?: string;
  title?: string;
  head?: string;
  body?: string;
  plugins?: webpack.WebpackPluginInstance[];
};

export function extendBaseConfig(
  env: Record<string, string> = {},
  { mode = 'production', port = 3000 }: WebpackOptions = {},
  { htmlTemplate, title, head = '', body = '', plugins = [] }: ExtendOptions = {},
) {
  const isProduction = mode === 'production';

  // Validate the project's environment files/variables
  const environmentFile = env.environmentFile || '.env';
  const environmentVariables = config({ path: environmentFile }).parsed;
  const exampleEnvironmentFile = env.exampleEnvironmentFile || '.env.example';
  const exampleEnvironmentVariables = config({ path: exampleEnvironmentFile }).parsed;

  validateEnvironmentMatchesExample(environmentVariables, exampleEnvironmentVariables);

  // Config without `entry` as it must be passed on the command line
  const webpackConfig: webpack.Configuration = {
    mode,
    stats: isProduction ? 'errors-only' : 'errors-warnings',
    devtool: isProduction ? 'hidden-source-map' : 'eval-cheap-module-source-map',
    output: {
      path: determineOutputPath(),
      filename: 'static/[name].[contenthash].js',
      chunkFilename: 'static/chunk.[contenthash].js',
      assetModuleFilename: 'static/[contenthash][ext][query]',
      publicPath: '/',
    },
    // Setup filesystem persistent cache when running in dev mode
    cache: isProduction
      ? undefined
      : {
          type: 'filesystem',
          maxAge: 1209600000, // Default cache maxage is 1 month, this lowers it to 2 weeks
          // Recommended by webpack: https://webpack.js.org/configuration/cache/#cachebuilddependencies
          buildDependencies: {
            config: [__filename],
          },
        },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['formatjs', !isProduction && 'react-refresh/babel'].filter(Boolean),
                rootMode: 'upward',
              },
            },
            {
              loader: 'linaria/loader',
              options: {
                displayName: !isProduction,
                sourceMap: !isProduction,
                babelOptions: { rootMode: 'upward' },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
          type: 'asset',
        },
        // S3 does not support .cur files, so we need to inline the asset
        {
          test: /\.cur$/,
          type: 'asset/inline',
          generator: {
            dataUrl: {
              mimetype: 'image/x-win-bitmap',
            },
          },
        },
        {
          test: /\.css$/,
          use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      fallback: {},
    },
    plugins: [
      new HtmlWebpackPlugin(
        htmlTemplate
          ? { templateContent: htmlTemplate }
          : {
              templateParameters: {
                title: title ?? 'Coinbase',
                locale: process.env.DEFAULT_LOCALE ?? 'en-US',
                head,
                body,
              },
              template: path.join(__dirname, 'templates/base.tpl'),
            },
      ),
      new MiniCssExtractPlugin({
        filename: 'static/styles.[contenthash].css',
        ignoreOrder: true,
      }),
      new DotenvWebpack({
        path: environmentFile,
      }),
      new NodePolyfillPlugin({
        excludeAliases: ['console'],
      }),
      ...plugins,
    ],

    // @ts-expect-error Not typed in webpack
    devServer: {
      hot: true,
      port,
      public: `http://localhost:${port}`,

      // Serve the index.html file for all routes
      historyApiFallback: true,

      // Make graphql available to all applications
      proxy: {
        '/graphql': {
          target: 'https://graphql-dev.cbhq.net',
          pathRewrite: { '^/graphql': '' },
          changeOrigin: true,
          secure: false,
        },
      },

      // Watching doesnt work in Bazel, so poll every half-second
      watchOptions: {
        poll: 500,
      },
    },

    // This is a temporary solution until we upgrade WDS
    // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
    target: isProduction ? 'browserslist' : 'web',
  };

  if (!isProduction) {
    webpackConfig.plugins?.push(new ReactRefreshWebpackPlugin());
  }

  return webpackConfig;
}
