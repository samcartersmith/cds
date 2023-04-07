import chalk from 'chalk';
import fs from 'fs';
import { ColorScheme } from '@cbhq/cds-common';
import { objectKeys, writePrettyFile } from '@cbhq/script-utils';

import { deprecations } from './deprecations';
import { Deprecation, MigrationMap, MigrationType } from './types';

const templateStart = '<!-- template-start -->';
const githubBaseUrl = 'https://github.cbhq.net/frontend/cds/blob/master';
const deprecationsPagePath = 'apps/website/docs/resources/deprecations.mdx';
const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const fullPath = `${MONOREPO_ROOT}/${deprecationsPagePath}`;

const typeColorMap: Record<MigrationType, ColorScheme> = {
  api: 'blue',
  renamed: 'green',
  replaced: 'yellow',
  path: 'gray',
  removed: 'red',
  propValue: 'purple',
};

const getTypes = (types: MigrationType | MigrationType[]) => {
  const typeTags = [];
  if (Array.isArray(types) && types.length > 1) {
    typeTags.push('<>');
    types.forEach((type: MigrationType) =>
      typeTags.push(`  <Tag colorScheme="${typeColorMap[type]}">${type}</Tag>`),
    );
    typeTags.push('</>');
  } else {
    typeTags.push(
      `<Tag colorScheme="${typeColorMap[Array.isArray(types) ? types[0] : types]}">${types}</Tag>`,
    );
  }
  return typeTags.join('');
};

const migrationRecMap: Record<Exclude<MigrationType, 'removed'>, string> = {
  api: 'The API has changed: ',
  renamed: 'has been renamed to',
  replaced: 'has been replaced with',
  path: 'can now be imported from',
  propValue: 'the value of this prop has been changed: ',
};

const getMigrationValue = (migrationMap: Partial<MigrationMap>, key: keyof MigrationMap) => {
  if (key === 'api' || key === 'propValue') {
    const formattedMap: string[] = ['<ul>'];
    const migrationRecord = migrationMap[key];
    if (migrationRecord) {
      objectKeys(migrationRecord).forEach((prevValue) => {
        const newValue = migrationRecord[prevValue];
        if (newValue) {
          formattedMap.push(
            `  <li><code>${prevValue}</code> has been replaced with <code>${newValue}</code></li>`,
          );
        } else {
          formattedMap.push(`  <li><code>${prevValue}</code> has been removed</li>`);
        }
      });
    }
    formattedMap.push('</ul>');
    return formattedMap.join('\n');
  }
  return migrationMap[key];
};

const getMigrationRecommendation = (
  migrationMap: Partial<MigrationMap> | undefined,
  deprecation: string,
) => {
  const migrationRec: string[] = [];

  if (migrationMap) {
    objectKeys(migrationMap).forEach((key) => {
      if (key === 'path') {
        migrationRec.push(
          `<p>${deprecation} ${migrationRecMap[key]} <a href="${githubBaseUrl}/${migrationMap[key]}" target="_blank">${migrationMap[key]}</a></p>`,
        );
      } else {
        migrationRec.push(
          `<p>${key === 'replaced' ? deprecation : ''} ${migrationRecMap[key]} ${getMigrationValue(
            migrationMap,
            key,
          )}</p>`,
        );
      }
    });
  } else {
    migrationRec.push(`<code>${deprecation}</code> has been removed from the CDS library.`);
  }

  return migrationRec.join('\n');
};

const formatDeprecationGuide = ({
  name,
  pkgName,
  type,
  guidance,
}: {
  name: string;
  pkgName: string;
  type: MigrationType | MigrationType[];
  guidance: string;
}) => {
  return `<AccordionItem
    itemKey="${name}.${pkgName}"
    title={<HStack gap={1}>${name} ${getTypes(type)}</HStack>}
    subtitle="@cbhq/cds-${pkgName}"
  >
    <VStack>${guidance}</VStack>
  </AccordionItem>`;
};

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
      groups.props.push('<Accordion>');
      deprecationObj.props?.forEach(
        ({ name, components, package: pkgName, type, migrationMap }) => {
          components.forEach((component) => {
            groups.props.push(
              formatDeprecationGuide({
                name: `${component}.${name}`,
                pkgName,
                type,
                // @ts-expect-error Not sure why this thinks it's a partial
                migrationMap,
                guidance: `${getMigrationRecommendation(migrationMap, name)}`,
              }),
            );
          });
        },
      );
      groups.props.push('</Accordion>');
      return;
    }
    if (key === 'params') {
      groups.params.push('<Accordion>');
      deprecationObj.params?.forEach(
        ({ function: func, params, package: pkgName, path, type, migrationMap }) => {
          params.forEach((param) => {
            groups.params.push(
              formatDeprecationGuide({
                name: `${func}: ${param}`,
                pkgName,
                type,
                // @ts-expect-error Not sure why this thinks it's a partial
                migrationMap,
                guidance: `<p>Original Path: <a href="${githubBaseUrl}/${path}" target="_blank">${path}</a></p>
      <p>${getMigrationRecommendation(migrationMap, param)}</p>`,
              }),
            );
          });
        },
      );
      groups.params.push('</Accordion>');
      return;
    }
    if (key === 'endOfLife') {
      groups.endOfLife.push(`${deprecationObj.endOfLife}`);
      return;
    }
    if (deprecationObj[key]?.length) {
      groups[key].push('<Accordion>');
      deprecationObj[key]?.forEach(({ package: pkgName, name, path, type, migrationMap }) => {
        if (name && pkgName && type) {
          const formattedDeprecationGuide = formatDeprecationGuide({
            name,
            pkgName,
            type,
            guidance: `<p>Original Path: <a href="${githubBaseUrl}/${path}" target="_blank">${path}</a></p>
              <p>${getMigrationRecommendation(migrationMap, name)}</p>`,
          });

          groups[key].push(formattedDeprecationGuide);
        }
      });
      groups[key].push('</Accordion>');
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
  const contents = await fs.promises.readFile(fullPath, 'utf8');
  const formattedDeprecations = deprecations.map((obj) => formatDeprecations(obj));
  let updatedContents: string | null = null;

  const startIndex = contents.indexOf(templateStart);

  // So that we don't need to manually delete contents every time.
  if (startIndex !== -1) {
    updatedContents = `${contents.substring(
      0,
      startIndex,
    )}${templateStart}\n\n${formattedDeprecations.join('\n\n')}`;
  } else {
    throw new Error('Unexpected: TemplateStart not found.');
  }

  if (updatedContents === null) {
    throw new Error('Unexpected: Updated contents is null.');
  }

  try {
    await writePrettyFile(fullPath, updatedContents);
    console.log(chalk.green('Success! The Deprecations page has been updated.'));
  } catch (error) {
    console.error(chalk.red(`FAILED: ${error}`));
  }
}

void updateDeprecations();
