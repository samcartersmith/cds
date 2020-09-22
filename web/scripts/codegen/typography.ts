import { scales } from '@cb/design-system-web/primitives/scale/scales';
import { generateTypeStyles } from '@cb/design-system-web/primitives/typography/generateTypeStyles';
import {
  typographies,
  fallbackStack,
} from '@cb/design-system-web/primitives/typography/typography';
import { writePrettyFile } from '@prime/designSystem/scripts/util';
import * as chalk from 'chalk';
import * as ejs from 'ejs';
import * as path from 'path';

const styleTemplate = `
  /**
   * DO NOT MODIFY
   * Generated from scripts/codegen/typography.ts based on definitions in
   * src/styles/typography/typography.ts
   */
  import { css } from 'linaria'

  <% styleObjects.forEach(({ name, style }) => { %>
    export const <%- name %> = css\`
        <% Object.entries(style).map(([attr, value]) => {%> \
            <% if (attr === 'font-family') { %> \
                font-family: <%- value %>, <%- fallbackStack %>; \
            <% } else { %> \
                <%- attr %>: <%- value %>; \
            <% } %> \
        <% }) %>
    \`
  <% }) %>
`;

const main = async () => {
  const prettierConfig = path.resolve('../../../../.prettierrc');
  try {
    // generate text styles for all scales
    const styles = ejs.render(styleTemplate, {
      styleObjects: generateTypeStyles(scales, typographies),
      fallbackStack,
    });
    const outFile = path.join(__dirname, '../../src/styles/typography', 'styles.ts');
    await writePrettyFile(prettierConfig, outFile, styles);

    console.info(`${chalk.greenBright('success')} Generated typography styles to ${outFile}`);
  } catch (error) {
    console.error(`${chalk.redBright('failed')} Couldn't generate typography styles,`);
    console.error(error);
  }

  try {
    // generate typography components
    const components = await ejs.renderFile(path.join(__dirname, './templates/Text.ejs'), {
      typographies,
    });
    const outFile = path.join(__dirname, '../../src/Text/Text.tsx');
    await writePrettyFile(prettierConfig, outFile, components);

    console.info(`${chalk.greenBright('success')} Generated typography components to ${outFile}`);
  } catch (error) {
    console.error(`${chalk.redBright('failed')} Couldn't generate typography components,`);
    console.error(error);
  }
};

main();
