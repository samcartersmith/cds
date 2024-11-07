import type { ConfigAPI, TransformOptions } from '@babel/core';
import linariaBabelPreset, { type PluginOptions } from 'linaria/babel';

import { type ExtractConfigOptions, linariaCssExtractPlugin } from './linariaCssExtractPlugin';

type PresetOptions = ExtractConfigOptions & {
  linariaOptions?: PluginOptions;
};

/**
 * This babel preset combines the default linaria/babel preset with a custom babel plugin.
 * The plugin is used to extract Linaria styles into static .css files via the Linaria
 * metadata in babel.
 */
export default function linariaPreset(
  babel: ConfigAPI,
  { sourceDir, outputDir, linariaOptions = {} }: PresetOptions,
): TransformOptions {
  const preset = linariaBabelPreset(babel, linariaOptions);

  const customLinariaExtractPlugin = [linariaCssExtractPlugin, { sourceDir, outputDir }];

  if (preset.plugins) preset.plugins.push(customLinariaExtractPlugin);
  else preset.plugins = [customLinariaExtractPlugin];

  return preset;
}
