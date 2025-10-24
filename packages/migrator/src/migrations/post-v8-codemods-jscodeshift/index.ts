import type { API, FileInfo, Options } from 'jscodeshift';

import listcellSpacingVariant from './transforms/listcell-spacing-variant';

type TransformFunction = (file: FileInfo, api: API, options: Options) => string | undefined;

const codemodMap: Record<string, TransformFunction> = {
  listcellSpacingVariant: (file, api) => listcellSpacingVariant(file, api),
};

export default function mainTransform(file: FileInfo, api: API, options: Options) {
  const codemodName = options['codemod'] as string | undefined;

  if (codemodName) {
    const transformToRun = codemodMap[codemodName];
    if (transformToRun) {
      console.log(`INFO [${file.path}]: Running post-v8 codemod: '${codemodName}'`);
      let source = file.source;
      try {
        const newSource = transformToRun({ ...file, source }, api, options);
        if (newSource && newSource !== source) {
          source = newSource;
        }
      } catch (error) {
        console.error(`ERROR [${file.path}]: Codemod '${codemodName}' failed:`, error);
      }
      return source;
    }
    console.warn(`WARN [${file.path}]: No codemod found for '${codemodName}'. Skipping.`);
    return file.source;
  }

  const transformsToRun: TransformFunction[] = [codemodMap.listcellSpacingVariant];
  console.log(`INFO [${file.path}]: Running post-v8 codemods (${transformsToRun.length}).`);

  let source = file.source;
  for (const transform of transformsToRun) {
    try {
      const newSource = transform({ ...file, source }, api, options);
      if (newSource && newSource !== source) {
        source = newSource;
      }
    } catch (error) {
      console.error(`ERROR [${file.path}]: Codemod '${transform.name}' failed:`, error);
    }
  }
  return source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
