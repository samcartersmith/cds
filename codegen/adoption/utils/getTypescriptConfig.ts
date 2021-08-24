import * as ts from 'typescript';
import path from 'path';
import fs from 'fs';
import { merge } from 'lodash';

export type TypescriptConfig = {
  extends?: string;
  compilerOptions: ts.CompilerOptions & {
    paths: Record<string, string[]>;
    baseUrl: string;
  };
};

export async function getTypescriptConfig(
  pathToConfig: string,
  configToMerge?: TypescriptConfig,
): Promise<TypescriptConfig> {
  try {
    const fileContents = await fs.promises.readFile(pathToConfig, 'utf8');
    const config = JSON.parse(fileContents) as TypescriptConfig;
    if (config?.extends) {
      return await getTypescriptConfig(
        path.resolve(path.dirname(pathToConfig), config.extends),
        config,
      );
    }
    return merge(config, configToMerge ?? {});
  } catch (err) {
    console.error(err);
    return { compilerOptions: { paths: {}, baseUrl: '.' } };
  }
}
