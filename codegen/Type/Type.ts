import { DEFAULT_SCALE, scales } from '@cb/design-system-web/primitives/scale/scale';
import { fallbackStack } from '@cb/design-system-web/styles/shared';
import { getSourcePath } from '@cb/design-system/codegen/utils/generateFromTemplate';
import { writePrettyFile } from '@tools/writePrettyFile';
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { argv } from 'yargs';

import { typography } from './config';
import { generateTypeStyles } from './generateTypeStyles';

const customFontStack = {
  Graphik: `'Graphik', 'Inter', ${fallbackStack}`,
  Inter: `'Inter', 'Graphik', ${fallbackStack}`,
};

export const Type = {
  generateStyles: () => generateTypeStyles(scales, typography),
  generateClasses() {
    const typeStyles = Type.generateStyles();
    const typeClasses: Record<string, Record<string, string>> = {};
    // Use style for a scale to extrapolate styles for each type using CSS variables
    for (const [typePascal, styles] of Object.entries(typeStyles[DEFAULT_SCALE])) {
      const type = typePascal.toLowerCase();
      typeClasses[type] = {
        'font-family': customFontStack[typography[typePascal].fontFamily],
      };
      for (const attr of Object.keys(styles)) {
        typeClasses[type][attr] = `var(--${type}-${attr})`;
      }
    }
    return {
      genericTypeStyles: typeClasses,
      allTypeStyles: typeStyles,
    };
  },
  generateScaleTable: () => {
    const styles = Type.generateStyles();

    // include type names
    const tableBody = Object.keys(typography).map(typeName => [`\`${typeName}\``]);
    // concat type styles with corresponding type name
    Object.values(styles).forEach(typeStylesAtScale => {
      Object.values(typeStylesAtScale).forEach((style, index) =>
        tableBody[index].push(`${style['font-size']} / ${style['line-height']}`)
      );
    });

    return mdTable([
      Object.entries(scales).map(
        ([scale, offset]) => `${scale} (${offset > 0 ? `+${offset}` : offset})`
      ),
      ...tableBody,
    ]);
  },
  async updateTextStory() {
    const typeStylesTable = Type.generateScaleTable();
    const textStoryFile = await getSourcePath(
      __filename,
      '../../../web/src/components/Text/Text.stories.mdx'
    );

    if (fs.existsSync(textStoryFile)) {
      const textStory = fs.readFileSync(textStoryFile);
      const tableStart = '<!-- styles table start -->';
      const tableEnd = '<!-- styles table end -->';
      const sectionStartIndex = textStory.indexOf(tableStart);
      const sectionEndIndex = textStory.indexOf(tableEnd);
      if (sectionStartIndex !== -1) {
        const updatedTextStory = `${textStory.slice(
          0,
          sectionStartIndex
        )}${tableStart}\n\n${typeStylesTable}\n${textStory.slice(
          sectionEndIndex,
          textStory.length
        )}`;

        writePrettyFile({
          prettierConfig: argv.prettierConfig as string,
          outFile: textStoryFile,
          contents: updatedTextStory,
          parser: 'mdx',
          logInfo: 'Text story',
        });
      } else {
        console.warn(
          `${chalk.yellow('warn')} Could not find styles table section in Text story to update.}`
        );
      }
    } else {
      console.warn(
        `${chalk.yellow(
          'warn'
        )} Text story has moved. Please update path in codegen script ${path.resolve(__filename)}.}`
      );
    }
  },
};

const mdTable = ([header, ...rows]: string[][]) => {
  const numCol = header.length;
  header.unshift('', '');
  header.push('');
  const divider = Array(numCol).fill('---');
  divider.unshift('');
  divider.push('');
  const tableBody = rows.map(row => {
    row.unshift('');
    row.push('');
    return `${row.join(' | ')}`;
  });

  return `${header.join(' | ')}
  ${divider.join(' | ')}
  ${tableBody.join('\n')}
  `;
};
