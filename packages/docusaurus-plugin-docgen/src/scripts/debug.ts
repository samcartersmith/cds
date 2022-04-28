import path from 'path';

import { docgenRunner } from './docgenRunner';
import { docgenWriter } from './docgenWriter';

const webDir = path.join(__dirname, '../../../web');
const webTsconfig = path.join(webDir, 'tsconfig.json');

const mobileDir = path.join(__dirname, '../../../mobile');
const mobileTsconfig = path.join(mobileDir, 'tsconfig.json');

function getCoreFiles(nameOrNames: string | string[]) {
  function buildConfig(name: string) {
    return [
      { tsconfigPath: webTsconfig, sourceFile: path.join(webDir, name), packageName: 'web' },
      {
        tsconfigPath: mobileTsconfig,
        sourceFile: path.join(mobileDir, name),
        packageName: 'mobile',
      },
    ];
  }

  if (Array.isArray(nameOrNames)) {
    return nameOrNames.reduce(
      (prev, next) => [...prev, ...buildConfig(next)],
      [] as ReturnType<typeof buildConfig>,
    );
  }
  return buildConfig(nameOrNames);
}

async function test() {
  const data = await docgenRunner({
    alias: '@docgen',
    components: {
      accordion: getCoreFiles(['accordion/Accordion.tsx', 'accordion/AccordionItem.tsx']),
      cardBody: getCoreFiles('alpha/CardBody.tsx'),
      button: getCoreFiles('buttons/Button.tsx'),
    },
    parserConfig: {
      /**
       * Add any types which are noisy to include on individual component pages.
       * These will be linked to separate standalone pages instead of showing full API info.
       */
      parentTypes: [
        'AriaAttributes',
        'ButtonHTMLAttributes',
        'ComponentEventDelegationProps',
        'DOMAttributes',
        'HTMLAttributes',
        'SpacingProps',
      ],
      /**
       * Add any props which might live in parentTypes but that are used frequently in day-to-day work.
       * We don't want to bury these in parent types section.
       */
      propsToForceIncludeIfPresent: ['autoFocus', 'onBlur', 'onChange', 'role', 'type', 'value'],
      aliasesToExtractValuesFor: [
        'IconName',
        'SpacingScale',
        'EventCustomConfig',
        'PaletteForeground',
        'PaletteBackground',
      ],
    },
    outputDir: path.join(__dirname, '../../dist/temp'),
  });
  await docgenWriter(data);
}
void test();
