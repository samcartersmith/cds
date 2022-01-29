import Dotenv from 'dotenv-webpack';
import path from 'path';
import type webpack from 'webpack';

import { modifyConfigForTooling } from './modifyConfigForTooling';

const MONOREPO_ROOT_DIR = process.env.BUILD_WORKSPACE_DIRECTORY ?? process.cwd();

type StorybookOptions = {
  config: webpack.Configuration;
  environmentFile?: string;
};

export function configureForStorybook({ config, environmentFile }: StorybookOptions) {
  modifyConfigForTooling(config);

  if (config.resolve) {
    // eslint-disable-next-line no-param-reassign
    config.resolve.modules = [path.resolve(MONOREPO_ROOT_DIR), 'node_modules'];
  }

  if (environmentFile) {
    config.plugins?.push(new Dotenv({ path: environmentFile }));
  }

  return config;
}
