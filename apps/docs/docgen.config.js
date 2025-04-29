const path = require('path');
const onProcessDoc = require('./src/utils/onProcessDocgen');

/**
 * Pull in docgen data to any component via `import from ':docgen/{key from sourceFiles}'`;
 * You can inspect available imports in .docusaurus/docusaurus-plugin-docgen/default directory.
 * The alias defined below, i.e. :docgen, will give you access to anything in that directory.
 */
module.exports = {
  docsDir: path.join(__dirname, './docs/components'),
  /**
   * Determines if plugin should run. If plugin is too slow in development,
   * you can either increase watchInterval or set this to false.
   * @default true
   */
  enabled: true,
  // forceDocs: true,
  /**
   * Absolute paths to tsconfig.json's for any projects that sourceFiles belong to.
   * When the plugin is run it will loop through each tsconfig and determine
   * which sourceFiles are present in those packages.
   */
  entryPoints: [
    path.join(__dirname, '../../packages/cds-web2/tsconfig.json'),
    path.join(__dirname, '../../packages/web-visualization2/tsconfig.json'),
    path.join(__dirname, '../../packages/cds-mobile2/tsconfig.json'),
    path.join(__dirname, '../../packages/mobile-visualization2/tsconfig.json'),
    path.join(__dirname, '../../packages/cds-common2/tsconfig.json'),
    path.join(__dirname, '../../packages/icons/tsconfig.json'),
    path.join(__dirname, '../../packages/illustrations/tsconfig.json'),
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
   * Plese add sourceFiles in alphabetical order.
   */
  sourceFiles: [
    'accordion/Accordion',
    'accordion/AccordionItem',
    'banner/Banner',
    'buttons/AvatarButton',
    'buttons/Button',
    'buttons/ButtonGroup',
    'buttons/IconButton',
    'cards/ContainedAssetCard',
    'cards/ContentCard/ContentCard',
    'cards/ContentCard/ContentCardHeader',
    'cards/ContentCard/ContentCardBody',
    'cards/ContentCard/ContentCardFooter',
    'cards/FloatingAssetCard',
    'cards/NudgeCard',
    'cards/UpsellCard',
    'cells/Cell',
    'cells/CellMedia',
    'cells/ContentCell',
    'cells/ListCell',
    'chips/Chip',
    'chips/InputChip',
    'chips/SelectChip',
    'chips/TabbedChips',
    'collapsible/Collapsible',
    'controls/Checkbox',
    'controls/RadioGroup',
    'controls/Select',
    'controls/SelectOption',
    'controls/SearchInput',
    'controls/Switch',
    'controls/TextInput',
    'dates/DatePicker',
    'dots/DotCount',
    'dots/DotStatusColor',
    'dots/DotSymbol',
    'dropdown/Dropdown',
    'icons/Icon',
    'illustrations/HeroSquare',
    'illustrations/Pictogram',
    'illustrations/SpotIcon',
    'illustrations/SpotRectangle',
    'illustrations/SpotSquare',
    'layout/Box',
    'layout/Divider',
    'layout/Grid',
    'layout/GridColumn',
    'layout/Fallback',
    'layout/HStack',
    'layout/Spacer',
    'layout/VStack',
    'loaders/Spinner',
    'multi-content-module/MultiContentModule',
    'page/PageHeader',
    'page/PageFooter',
    'media/Avatar',
    'media/RemoteImage',
    'navigation/NavigationBar',
    'navigation/NavigationTitle',
    'navigation/Sidebar',
    'navigation/SidebarItem',
    'navigation/SidebarMoreMenu',
    'numpad/Numpad',
    'overlays/Alert',
    'overlays/FullscreenAlert',
    'overlays/modal/Modal',
    'overlays/modal/ModalHeader',
    'overlays/modal/ModalBody',
    'overlays/modal/ModalFooter',
    'overlays/modal/FullscreenModal',
    'overlays/overlay/Overlay',
    'overlays/PortalProvider',
    'overlays/Toast',
    'overlays/tray/Tray',
    'overlays/tooltip/Tooltip',
    'section-header/SectionHeader',
    'sparkline/Sparkline',
    'sparkline/SparklineGradient',
    'sparkline/sparkline-interactive/SparklineInteractive',
    'sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
    'system/Interactable',
    'system/Pressable',
    'tabs/SegmentedTabs',
    'tabs/TabIndicator',
    'tabs/TabLabel',
    'tabs/TabNavigation',
    'tag/Tag',
    'tour/Tour',
    'typography/Link',
    'typography/Text',
    'tables/Table',
    'tables/TableBody',
    'tables/TableCaption',
    'tables/TableCell',
    'tables/TableCellFallback',
    'tables/TableFooter',
    'tables/TableHeader',
    'tables/TableRow',
  ],
};
