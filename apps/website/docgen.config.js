const path = require('path');
const onProcessDoc = require('./utils/onProcessDocgen');

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
  enabled: true,
  /**
   * Absolute paths to tsconfig.json's for any projects that sourceFiles belong to.
   * When the plugin is run it will loop through each tsconfig and determine
   * which sourceFiles are present in those packages.
   */
  entryPoints: [
    path.join(__dirname, '../../packages/web/tsconfig.json'),
    path.join(__dirname, '../../packages/mobile/tsconfig.json'),
    path.join(__dirname, '../../packages/common/tsconfig.json'),
  ],
  formatPackageName: (name) => {
    return name.replace('cds-', '');
  },
  onProcessDoc,
  /**
   * How frequently (in minutes) should plugin run after it was last run.
   * This is typically triggered via on save of project file.
   * @default 5
   */
  watchInterval: 20,
  /**
   * Any source files relative to entryPoints above that you want docgen to parse.
   */
  sourceFiles: [
    'accordion/Accordion',
    'accordion/AccordionItem',
    'layout/Box',
    'layout/HStack',
    'layout/VStack',
    'layout/Group',
    'buttons/Button',
    'buttons/ButtonGroup',
    'system/Pressable',
    'system/PressableOpacity',
    'cells/Cell',
    'cells/CellAccessory',
    'cells/CellDetail',
    'cells/CellMedia',
    'cells/ListCell',
    'cells/ListCellFallback',
    'cells/ContentCell',
    'cells/ContentCellFallback',
    'controls/Checkbox',
    'collapsible/CollapseArrow',
    'collapsible/Collapsible',
    'layout/Divider',
    'dots/DotCount',
    'dots/DotStatusColor',
    'dots/DotSymbol',
    'overlays/Drawer',
    'dropdown/Dropdown',
    'layout/Fallback',
    'buttons/IconButton',
    'buttons/NavigationIconButton',
    'illustrations/HeroSquare',
    'illustrations/Pictogram',
    'illustrations/SpotSquare',
    'illustrations/SpotRectangle',
    'controls/InputIcon',
    'controls/InputIconButton',
    'controls/InputLabel',
    'controls/InputStack',
    'controls/NativeInput',
    'controls/NativeTextArea',
    'controls/TextInput',
    'controls/HelperText',
    'navigation/NavLink',
    'navigation/NavigationBar',
    'navigation/NavigationTitle',
    'navigation/Sidebar',
    'navigation/SidebarItem',
    'typography/Link',
    'animation/Lottie',
    'animation/LottieStatusAnimation',
    'animation/useLottie',
    'animation/useLottieColorFilters',
    'icons/LogoMark',
    'icons/LogoWordmark',
    'icons/SubBrandLogoMark',
    'icons/SubBrandLogoWordmark',
    'hooks/useSubBrandLogo',
    'hooks/useLogo',
    'overlays/Modal/Modal',
    'overlays/Modal/ModalHeader',
    'overlays/Modal/ModalBody',
    'overlays/Modal/ModalFooter',
    'overlays/Modal/FullscreenModal',
    'overlays/useModal',
    'controls/SearchInput',
    'visualizations/Sparkline',
    'visualizations/SparklineInteractive',
    'visualizations/SparklineInteractiveHeader',
    'visualizations/useSparklinePath',
    'visualizations/useSparklineArea',
    'visualizations/useSparklineCoordinates',
  ],
};
