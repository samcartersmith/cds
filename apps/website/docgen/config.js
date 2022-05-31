const path = require('path');
const onProcessDoc = require('./utils/onProcessDoc');
const sourceFiles = require('./sourceFiles');

/**
 * Pull in docgen data to any component via `import from '@docgen/{key from sourceFiles}'`;
 * You can inspect available imports in .docusaurus/docusaurus-plugin-docgen/default directory.
 * The alias defined below, i.e. @docgen, will give you access to anything in that directory.
 */
module.exports = {
  // docsDir: path.join(__dirname, '../docs/components'),
  /**
   * Determines if plugin should run. If plugin is too slow in development,
   * you can either increase watchInterval or set this to false.
   * @default true
   */
  enabled: process.env.THEME === 'refresh',
  /**
   * Absolute paths to tsconfig.json's for any projects that sourceFiles belong to.
   * When the plugin is run it will loop through each tsconfig and determine
   * which sourceFiles are present in those packages.
   */
  entryPoints: [
    path.join(__dirname, '../../../packages/web/tsconfig.json'),
    path.join(__dirname, '../../../packages/mobile/tsconfig.json'),
    path.join(__dirname, '../../../packages/common/tsconfig.json'),
  ],
  formatPackageName: (name) => {
    return name.replace('cds-', '');
  },
  onProcessDoc,
  /**
   * A key:value pair, where the key is the sidebar item and the value is an array
   * of source files you want docgen to parse. This is useful when components are
   * cross-platform or have related sub-components/hooks which you want to consolidate
   * to a single page.
   */
  sourceFiles,
  /**
   * How frequently (in minutes) should plugin run after it was last run.
   * This is typically triggered via on save of project file.
   * @default 5
   */
  watchInterval: 20,
};
