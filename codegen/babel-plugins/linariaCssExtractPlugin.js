const t = require('@babel/types');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { SourceMapGenerator } = require('source-map');
const stylis = require('stylis');

// Copied from linaria's transform function
const extractCss = (metadata, options) => {
  const { rules } = metadata;
  const { sourceFile, outputFile, sourceMap, code } = options;
  const mappings = [];
  const classes = [];

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

    generator.setSourceContent(sourceFile, code);

    return generator.toString();
  };

  const result = {
    cssText: classes.join('\n'),
  };

  if (sourceMap) {
    result.sourceMap = getSourceMap();
  }

  return result;
};

const writeCssFiles = async cssMap => {
  const promises = [];

  cssMap.forEach(({ cssText, sourceMap }, outputFile) => {
    if (fs.existsSync(path.dirname(outputFile))) {
      promises.push(
        fs.promises.writeFile(
          outputFile,
          sourceMap ? `${cssText}\n/*# sourceMappingURL=${outputFile}.map */` : cssText
        )
      );

      if (sourceMap) {
        promises.push(fs.promises.writeFile(`${outputFile}.map`, sourceMap));
      }
    }
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error(chalk.redBright('error'), error);
  }
};

module.exports = () => {
  const cssMap = new Map();

  return {
    visitor: {
      Program: {
        exit(nodePath, state) {
          const { opts, file, filename: sourceFile } = state;

          if (!file.metadata.linaria || cssMap.has(sourceFile)) {
            return;
          }

          // Determine Bazel output path from sandbox path
          const outputFile = sourceFile
            .replace(opts.sandboxDir, opts.outDir)
            .replace(/\.[jt]sx?$/, '.css');

          if (!cssMap.has(sourceFile)) {
            const processed = extractCss(file.metadata.linaria, {
              ...opts,
              sourceFile,
              outputFile,
              code: file.code,
            });

            cssMap.set(outputFile, processed);
          }

          // Include import to .css file
          const cssImport = t.importDeclaration(
            [],
            t.stringLiteral(`./${path.basename(outputFile)}`)
          );
          let replacedLinaria = false;

          nodePath.node.body.forEach((node, index) => {
            if (node.type === 'ImportDeclaration' && node.source.value === 'linaria') {
              node.specifiers = node.specifiers.filter(spec => spec.local.name !== 'css');

              // Only `css` used, replace linaria
              if (node.specifiers.length === 0) {
                nodePath.get(`body.${index}`).replaceWith(cssImport);
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
      writeCssFiles(cssMap);
    },
  };
};
