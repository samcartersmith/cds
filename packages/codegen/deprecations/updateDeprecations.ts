import chalk from 'chalk';
import fs from 'fs';
import { objectKeys } from '@cbhq/script-utils';

import { Deprecation, deprecations } from './deprecations';

const templateStart = '<!-- template-start -->';
const githubBaseUrl = 'https://github.cbhq.net/frontend/cds';
const deprecationsPagePath = 'apps/website/docs/resources/deprecations.mdx';
const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const fullPath = `${MONOREPO_ROOT}/${deprecationsPagePath}`;

function formatDeprecations(deprecationObj: Deprecation): string {
  const groups: Record<keyof Deprecation, string[]> = {
    endOfLife: [],
    components: ['### 🧱 Components', ''],
    types: ['### 🔐 Types', ''],
    props: ['### 🎭 Props', ''],
    hooks: ['### 🪝 Hooks', ''],
    tokens: ['### 🪙 Tokens', ''],
    functions: ['### 👨‍💻 Functions', ''],
    params: ['### 🏗️ Params', ''],
  };

  objectKeys(deprecationObj).forEach((key) => {
    if (key === 'props') {
      deprecationObj.props?.forEach(({ name, components, package: pkgName }) => {
        if (components.length > 1) {
          components.forEach((component) => {
            groups.props.push(`- **[@cbhq/cds-${pkgName}]**: ${component}.${name}`);
          });
        } else {
          groups.props.push(`- **[@cbhq/cds-${pkgName}]**: ${components[0]}.${name}`);
        }
      });
      return;
    }
    if (key === 'params') {
      deprecationObj.params?.forEach(({ function: func, params, package: pkgName, path }) => {
        groups.params.push(
          `- **[@cbhq/cds-${pkgName}]**: [${func}](${githubBaseUrl}/${path}): ${params.join(', ')}`,
        );
      });
      return;
    }
    if (key === 'endOfLife') {
      groups.endOfLife.push(`${deprecationObj.endOfLife}`);
      return;
    }
    if (deprecationObj[key]?.length) {
      deprecationObj[key]?.forEach(({ package: pkgName, name, path }) => {
        groups[key].push(`- **[@cbhq/cds-${pkgName}]**: [${name}](${githubBaseUrl}/${path})`);
      });
    }
  });

  const block: string[] = [
    `## ${groups.endOfLife} Deprecations`,
    '',
    `The following items will be deleted at the end of ${groups.endOfLife} in a breaking release. Release version is TBD.`,
  ];

  Object.values(groups).forEach((group) => {
    if (group.length > 1) {
      block.push('', ...group);
    }
  });

  return block.join('\n');
}

// Updates the Deprecations page on the go/cds website
async function updateDeprecations() {
  let contents = await fs.promises.readFile(fullPath, 'utf8');
  const formattedDeprecations = deprecations.map((obj) => formatDeprecations(obj));

  contents = contents.replace(`${templateStart}`, `${templateStart}\n\n${formattedDeprecations}`);

  try {
    await fs.promises.writeFile(fullPath, contents);
    console.log('Success! The Deprecations page has been updated.');
  } catch (error) {
    console.error(chalk.red(`FAILED: ${error}`));
  }
}

void updateDeprecations();
