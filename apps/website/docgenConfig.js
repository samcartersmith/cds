const path = require('path');

const webDir = path.join(__dirname, '../../packages/web');
const webTsconfig = path.join(webDir, 'tsconfig.json');

const mobileDir = path.join(__dirname, '../../packages/mobile');
const mobileTsconfig = path.join(mobileDir, 'tsconfig.json');

function getCoreFiles(nameOrNames) {
  function buildConfig(name) {
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
    return nameOrNames.reduce((prev, next) => [...prev, ...buildConfig(next)], []);
  }
  return buildConfig(nameOrNames);
}

/**
 * Pull in docgen data to any component via
 * import from '{config.alias}/{component key from config.components}';
 * This follows the same structure as your config
 * i.e. import docs from from '@docgen/accordion';
 */
module.exports = {
  alias: '@docgen',
  enable: process.env.THEME === 'refresh',
  components: {
    accordion: getCoreFiles(['accordion/Accordion.tsx', 'accordion/AccordionItem.tsx']),
    cardBody: getCoreFiles('alpha/CardBody.tsx'),
    button: getCoreFiles('buttons/Button.tsx'),
    illustration: getCoreFiles([
      'illustrations/HeroSquare.tsx',
      'illustrations/Pictogram.tsx',
      'illustrations/SpotSquare.tsx',
      'illustrations/SpotRectangle.tsx',
    ]),
  },
  parserConfig: {
    /**
     * Add any types which are noisy to include on individual component pages.
     * These will be linked to separate standalone pages instead of showing full API info.
     */
    parentTypes: [
      'AriaAttributes',
      'ButtonHTMLAttributes',
      'ComponentEventHandlerProps',
      'DOMAttributes',
      'HTMLAttributes',
      'SpacingProps',
    ],
    /**
     * Add any props which might live in parentTypes but that are used frequently in day-to-day work.
     * We don't want to bury these in parent types section.
     */
    propsToForceIncludeIfPresent: ['autoFocus', 'onBlur', 'onChange', 'type', 'value'],
    aliasesToExtractValuesFor: [
      'EventCustomConfig',
      'IconName',
      'IllustrationNames',
      'IllustrationHeroSquareNames',
      'IllustrationPictogramNames',
      'IllustrationSpotSquareNames',
      'IllustrationSpotRectangleNames',
      'IllustrationVariant',
      'NavigationIconName',
      'PaletteForeground',
      'PaletteBackground',
      'SpacingScale',
    ],
  },
};
