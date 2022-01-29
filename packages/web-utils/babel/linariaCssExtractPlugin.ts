import type { NodePath, PluginObj } from '@babel/core';
import * as t from '@babel/types';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { Mapping, Position, SourceMapGenerator } from 'source-map';
import stylis from 'stylis';

export type CssResult = {
  cssText: string;
  sourceMap?: string;
};

export type CssOptions = {
  sandboxDir: string;
  outDir: string;
};

export type CssExtractOptions = CssOptions & {
  sourceFile: string;
  sourceMap: string;
  outputFile: string;
  code: string;
};

export type LinariaMetadata = {
  rules: Record<string, { cssText: string; start: Position }>;
};

// Copied from linaria's transform function
function extractCss(metadata: LinariaMetadata, options: CssExtractOptions): CssResult {
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
    classes.push(stylis(selector, rules[selector].cssText) as string);
  });

  const getSourceMap = () => {
    const generator = new SourceMapGenerator({
      file: outputFile,
    });

    mappings.forEach((mapping) => {
      generator.addMapping({ ...mapping, source: sourceFile });
    });

    generator.setSourceContent(sourceFile, code);

    return generator.toString();
  };

  const result: CssResult = {
    cssText: classes.join('\n'),
  };

  if (sourceMap) {
    result.sourceMap = getSourceMap();
  }

  return result;
}

async function writeCssFiles(cssMap: Map<string, CssResult>) {
  const promises: Promise<unknown>[] = [];

  cssMap.forEach(({ cssText, sourceMap }, outputFile) => {
    if (fs.existsSync(path.dirname(outputFile))) {
      promises.push(
        fs.promises.writeFile(
          outputFile,
          sourceMap ? `${cssText}\n/*# sourceMappingURL=${outputFile}.map */` : cssText,
        ),
      );

      if (sourceMap) {
        promises.push(fs.promises.writeFile(`${outputFile}.map`, sourceMap));
      }
    }
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(chalk.redBright('error'), error);
  }
}

export default function linariaCssExtractPlugin(): PluginObj {
  const cssMap = new Map<string, CssResult>();

  return {
    visitor: {
      Program: {
        exit(nodePath, state) {
          const { opts, file, filename: sourceFile } = state;
          const { sandboxDir, outDir } = opts as CssOptions;
          const metadata = (file.metadata as { linaria: LinariaMetadata }).linaria;

          if (!metadata || !sourceFile || cssMap.has(sourceFile)) {
            return;
          }

          // Determine Bazel output path from sandbox path
          const outputFile = sourceFile.replace(sandboxDir, outDir).replace(/\.[jt]sx?$/, '.css');

          if (!cssMap.has(sourceFile)) {
            const processed = extractCss(metadata, {
              ...opts,
              sourceFile,
              outputFile,
              code: file.code,
            } as CssExtractOptions);

            cssMap.set(outputFile, processed);
          }

          // Include import to .css file
          const cssImport = t.importDeclaration(
            [],
            t.stringLiteral(`./${path.basename(outputFile)}`),
          );
          let replacedLinaria = false;

          nodePath.node.body.forEach((node, index) => {
            if (node.type === 'ImportDeclaration' && node.source.value === 'linaria') {
              // eslint-disable-next-line no-param-reassign
              node.specifiers = node.specifiers.filter((spec) => spec.local.name !== 'css');

              // Only `css` used, replace linaria
              if (node.specifiers.length === 0) {
                (nodePath.get(`body.${index}`) as NodePath).replaceWith(cssImport);
                replacedLinaria = true;
              }
            }
          });

          // Other linaria imports being used, add sibling import
          if (!replacedLinaria) {
            nodePath.node.body.unshift(cssImport);
          }
        },
      },
    },
    post() {
      void writeCssFiles(cssMap);
    },
  };
}
