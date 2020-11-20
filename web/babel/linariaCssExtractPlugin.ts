import { BabelFile, BabelFileMetadata, NodePath, PluginPass } from '@babel/core';
import * as t from '@babel/types';
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { Mapping, SourceMapGenerator } from 'source-map';
import * as stylis from 'stylis';
import { promisify } from 'util';

import type { LinariaMetadata } from './types';

type ExtractedCSS = {
  cssText: string;
  sourceMap?: string;
};

// Copied from linaria's transform function
const extractCss = (
  metadata: LinariaMetadata,
  options: {
    sourceFile: string;
    outputFile: string;
  } & (
    | { sourceMap?: boolean; code?: string }
    | {
        sourceMap: true;
        code: string;
      }
  )
): ExtractedCSS => {
  const { rules } = metadata;
  const { sourceFile, outputFile, sourceMap, code } = options;
  const mappings: Mapping[] = [];
  const classes: string[] = [];

  Object.keys(rules).forEach((selector, index) => {
    mappings.push({
      generated: {
        line: index + 1,
        column: 0,
      },
      original: rules[selector].start,
      name: selector,
      source: '',
    });

    // Run each rule through stylis to support nesting
    classes.push(stylis(selector, rules[selector].cssText));
  });

  const getSourceMap = () => {
    const generator = new SourceMapGenerator({
      file: outputFile,
    });

    mappings.forEach(mapping =>
      generator.addMapping(Object.assign({}, mapping, { source: sourceFile }))
    );

    generator.setSourceContent(sourceFile, code as string);

    return generator.toString();
  };

  const result: ExtractedCSS = {
    cssText: classes.join('\n'),
  };
  if (sourceMap) {
    result.sourceMap = getSourceMap();
  }
  return result;
};

const writeFile = promisify(fs.writeFile);
const writeCssFiles = async (cssMap: Map<string, { cssText: string; sourceMap?: string }>) => {
  const promises: Promise<void>[] = [];
  cssMap.forEach(({ cssText, sourceMap }, outputFile) => {
    if (fs.existsSync(path.dirname(outputFile))) {
      promises.push(
        writeFile(
          outputFile,
          sourceMap ? `${cssText}\n/*# sourceMappingURL=${outputFile}.map */` : cssText
        )
      );
      if (sourceMap) {
        promises.push(writeFile(`${outputFile}.map`, sourceMap));
      }
    }
  });
  try {
    await Promise.all(promises);
  } catch (error) {
    console.error(chalk.redBright('error'), error);
  }
};

interface PluginState extends PluginPass {
  opts: { sourceMap?: boolean; bazelOut: string; outDir: string };
  file: BabelFile & { metadata: BabelFileMetadata & { linaria?: LinariaMetadata } };
}

const plugin = () => {
  const cssMap = new Map<string, { cssText: string; sourceMap?: string }>();

  return {
    visitor: {
      Program: {
        exit(nodePath: NodePath<t.Program>, state: PluginState) {
          const { opts, file, filename: sourceFile } = state;
          // console.log('metadata', file.metadata.linaria && file.metadata.linaria.rules);
          if (!file.metadata.linaria || cssMap.has(sourceFile)) {
            return;
          }

          const getOutputFile = (sourcePath: string, sourceRoot: string) => {
            const dir = path.dirname(
              path.resolve(opts.outDir, path.relative(sourceRoot, sourcePath))
            );
            return path.join(dir, `${path.basename(sourcePath, path.extname(sourcePath))}.css`);
          };

          if (!cssMap.has(sourceFile)) {
            const outputFile = getOutputFile(sourceFile, file.opts.sourceRoot || './src');
            const processed = extractCss(file.metadata.linaria, {
              ...opts,
              sourceFile,
              outputFile,
              code: file.code,
            });

            cssMap.set(outputFile, processed);
          }

          // TODO: make the insertion more elegant
          nodePath.node.body.unshift(
            t.importDeclaration([], t.stringLiteral(`./${path.parse(sourceFile).name}.css`))
          );
        },
      },
    },
    post() {
      writeCssFiles(cssMap);
    },
  };
};

module.exports = plugin;
