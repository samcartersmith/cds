import chalk from 'chalk';
import { ColorScheme } from '@cbhq/cds-common';
import { objectKeys, writePrettyFile } from '@cbhq/script-utils';

import { deprecations } from './deprecations';
import { Deprecation, DeprecationGroups, MigrationMap, MigrationType } from './types';

const DEPRECATION_DIR = 'apps/website/docs/resources/deprecations';
const MDX_PATHNAME = 'resources/deprecations';
const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const GENERATED_DATA_DIR = 'apps/website/data/__generated__/deprecations';

// const deprecationsPagePath = 'apps/website/docs/resources/deprecations.mdx';
const fullDeprecationPath = `${MONOREPO_ROOT}/${DEPRECATION_DIR}`;

type SidebarData = {
  type: string;
  id: string;
  label: string;
};

/**
 * Generates dynamic sidebar data for sidebar.config.js
 * @param deprecationsSidebar : SidebarData[]
 * @returns string;
 */
async function generateDeprecationsSidebarData(deprecationsSidebar: SidebarData[]) {
  return writePrettyFile(
    `${MONOREPO_ROOT}/${GENERATED_DATA_DIR}/deprecations-sidebar.js`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run website:deprecations
 */
module.exports.deprecations = ${JSON.stringify(deprecationsSidebar)};
`.trimStart(),
  );
}

/**
 * Generates deprecation file content with correct imports
 * @param content: Deprecation Content
 * @returns string;
 */
async function generateDeprecationMDXFile(filePathName: string, content: string) {
  return writePrettyFile(
    filePathName,
    `
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { AccordionItem } from '@cbhq/cds-web/accordion/AccordionItem';
import { Accordion } from '@cbhq/cds-web/accordion/Accordion';
import { VStack, HStack } from '@cbhq/cds-web/layout';

${content}
`.trimStart(),
  );
}

/**
 * Generates TOCUpdater using the active group names from config
 * @param groupsUsed : string[]
 * @returns string
 */
function generateTOCUpdater(groupsUsed: string[]) {
  const tocObjects = groupsUsed.map((group) => {
    const capitalizedGroup = group.charAt(0).toUpperCase() + group.slice(1);
    return {
      value: capitalizedGroup,
      id: group.toLowerCase(),
      level: 2,
    };
  });

  return `<TOCUpdater toc={${JSON.stringify(tocObjects)}} />`;
}

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
          const text = Array.isArray(newValue) ? newValue.concat(', ') : newValue;
          formattedMap.push(
            `  <li><code>${prevValue}</code> has been replaced with <code>${text}</code></li>`,
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
        migrationRec.push(`<p>${deprecation} ${migrationRecMap[key]} ${migrationMap[key]}</p>`);
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
    migrationRec.push(`<p><code>${deprecation}</code> has been removed from the CDS library.</p>`);
  }

  return migrationRec.join('\n');
};

const formatDeprecationGuide = ({
  name,
  pkgName,
  type,
  guidance,
  components,
  exportNames,
}: {
  name: string;
  pkgName: string;
  type: MigrationType | MigrationType[];
  guidance: string;
  components?: string[];
  exportNames?: string[];
}) => {
  return `<AccordionItem
    itemKey="${name}.${pkgName}"
    title={<HStack gap={1}>${name} ${getTypes(type)}</HStack>}
    subtitle="@cbhq/cds-${pkgName}"
  >
    <VStack>
      ${guidance}
      ${
        // eslint-disable-next-line no-nested-ternary
        components
          ? `<TextHeadline spacingTop="2" as="h4">Impacted Components: </TextHeadline><ul>${components
              .map((comp) => `<li>${comp}</li>`)
              .join('\n')}</ul>`
          : exportNames
          ? `<TextHeadline spacingTop="2" as="h4">The following exports have been removed: </TextHeadline><ul>${exportNames
              .map((comp) => `<li>${comp}</li>`)
              .join('\n')}</ul>`
          : ''
      }
    </VStack>
  </AccordionItem>`;
};

function formatDeprecations(deprecationObj: Deprecation): string {
  const groups: Record<DeprecationGroups, string[]> = {
    components: ['### 🧱 Components {#components}', ''],
    types: ['### 🔐 Types {#types}', ''],
    props: ['### 🎭 Props {#props}', ''],
    hooks: ['### 🪝 Hooks {#hooks}', ''],
    tokens: ['### 🪙 Tokens {#tokens}', ''],
    functions: ['### 👨‍💻 Functions {#functions}', ''],
    params: ['### 🏗️ Params {#params}', ''],
  };

  const { breakingRelease, ...groupsInUse } = deprecationObj;

  objectKeys(deprecationObj).forEach((key) => {
    if (key === 'props') {
      groups.props.push('<Accordion>');
      deprecationObj.props?.forEach(
        ({ name, components, package: pkgName, type, migrationMap }) => {
          groups.props.push(
            formatDeprecationGuide({
              name,
              pkgName,
              type,
              // @ts-expect-error Not sure why this thinks it's a partial
              migrationMap,
              guidance: `${getMigrationRecommendation(migrationMap, name)}`,
              components,
            }),
          );
        },
      );
      groups.props.push('</Accordion>');
      return;
    }
    if (key === 'params') {
      groups.params.push('<Accordion>');
      deprecationObj.params?.forEach(
        ({ function: func, param, package: pkgName, path, type, migrationMap }) => {
          param.forEach((p) => {
            groups.params.push(
              formatDeprecationGuide({
                name: `${func}: ${param}`,
                pkgName,
                type,
                guidance: `<p>Original Path: ${path}</p>
      <p>${getMigrationRecommendation(migrationMap, p)}</p>`,
              }),
            );
          });
        },
      );
      groups.params.push('</Accordion>');
      return;
    }
    if (
      deprecationObj[key]?.length &&
      (key === 'components' || key === 'types' || key === 'hooks' || key === 'functions')
    ) {
      const groupForKey = groups[key];

      groupForKey.push('<Accordion>');
      deprecationObj[key]?.forEach(({ package: pkgName, name, path, type, migrationMap }) => {
        if (name && pkgName && type) {
          groups[key].push(
            formatDeprecationGuide({
              name,
              pkgName,
              type,
              guidance: `<p>Original Path: ${path}</p>
                <p>${getMigrationRecommendation(migrationMap, name)}</p>`,
            }),
          );
        }
      });
      groupForKey.push('</Accordion>');
    }
    if (deprecationObj[key]?.length && key === 'tokens') {
      const groupForKey = groups[key];

      groupForKey.push('<Accordion>');
      deprecationObj[key]?.forEach(
        ({ package: pkgName, name, path, type, migrationMap, exportNames }) => {
          if (name && pkgName && type) {
            groups[key].push(
              formatDeprecationGuide({
                name,
                pkgName,
                type,
                exportNames,
                guidance: `<p>Original Path: ${path}</p>
                <p>${getMigrationRecommendation(migrationMap, name)}</p>`,
              }),
            );
          }
        },
      );
      groupForKey.push('</Accordion>');
    }
  });

  const block: string[] = [
    `The following items will be deleted in ${breakingRelease}. Please use the <code>cds-migrator</code> package and respective [migration guide](../../../guides/migration) to update your codebase.`,
  ];

  Object.values(groups).forEach((group) => {
    if (group.length > 2) {
      block.push('', ...group);
    }
  });

  const deprecationContent = block.join('\n');

  return `${deprecationContent}\n\n${generateTOCUpdater(Object.keys(groupsInUse))}`;
}

// Updates the Deprecations section on the go/cds website
async function updateDeprecations() {
  const deprecationsSidebar: SidebarData[] = [];

  await Promise.all(
    deprecations.map(async (obj) => {
      const content = formatDeprecations(obj);

      deprecationsSidebar.push({
        type: 'doc',
        id: `${MDX_PATHNAME}/${obj.breakingRelease}`,
        label: obj.breakingRelease,
      });

      const filePathName = `${fullDeprecationPath}/${obj.breakingRelease}.mdx`;

      if (content === null) {
        throw new Error(`Unexpected: Updated content for ${obj.breakingRelease} is null.`);
      }
      try {
        // For each deprecation, create a new file in the deprecations folder with formatted content
        await generateDeprecationMDXFile(filePathName, content);
        console.log(
          chalk.green(
            `Success! The Deprecations page for ${obj.breakingRelease} has been updated.`,
          ),
        );
      } catch (error) {
        console.error(chalk.red(`FAILED: ${error}`));
      }
    }),
  );

  // Add file data to deprecations_sidebar.js, which is used in sidebar.config.js
  await generateDeprecationsSidebarData(deprecationsSidebar);
}

void updateDeprecations();
