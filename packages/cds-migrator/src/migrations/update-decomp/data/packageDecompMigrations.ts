export const migrations: {
  exports: string[];
  /** shallow directory, will check that import source includes this string */
  oldDir: string;
  /** shallow directory */
  newDir: string;
  /** version of the decomped package */
  version: string;
}[] = [
  {
    exports: ['Dropdown', 'DropdownProps', 'MenuItem'],
    oldDir: '@cbhq/cds-web/dropdown',
    newDir: '@cbhq/cds-web-overlays',
    version: '0.0.3',
  },
  {
    exports: ['Popover', 'PopoverProps', 'usePopper'],
    oldDir: '@cbhq/cds-web/overlays',
    newDir: '@cbhq/cds-web-overlays',
    version: '0.0.3',
  },
  {
    exports: ['Select', 'SelectOption'],
    oldDir: '@cbhq/cds-web/controls',
    newDir: '@cbhq/cds-web-overlays',
    version: '0.0.3',
  },
  {
    exports: ['SidebarMoreMenu'],
    oldDir: '@cbhq/cds-web/navigation',
    newDir: '@cbhq/cds-web-overlays',
    version: '0.0.3',
  },
  {
    exports: ['Tooltip', 'TooltipContent', 'TooltipProps', 'useTooltipState'],
    oldDir: '@cbhq/cds-web/overlays',
    newDir: '@cbhq/cds-web-overlays',
    version: '0.0.3',
  },
  {
    exports: [
      'Sparkline',
      'SparklineArea',
      'SparklineGradient',
      'SparklineInteractiveHeader',
      'SparklineInteractive',
    ],
    oldDir: '@cbhq/cds-web/overlays',
    newDir: '@cbhq/web-visualization',
    version: '0.0.4',
  },
  {
    exports: [
      'Sparkline',
      'SparklineArea',
      'SparklineGradient',
      'SparklineInteractiveHeader',
      'SparklineInteractive',
    ],
    oldDir: '@cbhq/cds-mobile/visualizations',
    newDir: '@cbhq/cds-mobile-visualization',
    version: '0.0.4',
  },
];
