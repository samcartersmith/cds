import { DecompedMigration } from '../../../helpers';

export const migrations: DecompedMigration[] = [
  {
    exports: ['Dropdown', 'DropdownProps', 'MenuItem'],
    oldDir: '@cbhq/cds-web/dropdown',
    newDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['Popover', 'PopoverProps', 'usePopper'],
    oldDir: '@cbhq/cds-web/overlays',
    newDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['Select', 'SelectOption'],
    oldDir: '@cbhq/cds-web/controls',
    newDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['SidebarMoreMenu'],
    oldDir: '@cbhq/cds-web/navigation',
    newDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['Tooltip', 'TooltipContent', 'TooltipProps', 'useTooltipState'],
    oldDir: '@cbhq/cds-web/overlays',
    newDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: [
      'Sparkline',
      'SparklineArea',
      'SparklineGradient',
      'SparklineInteractiveHeader',
      'SparklineInteractive',
      'SparklineInteractiveHeaderRef',
    ],
    oldDir: '@cbhq/cds-web/overlays',
    newDir: '@cbhq/web-visualization',
  },
  {
    exports: [
      'Sparkline',
      'SparklineArea',
      'SparklineGradient',
      'SparklineInteractiveHeader',
      'SparklineInteractive',
      'SparklineInteractiveHeaderRef',
    ],
    oldDir: '@cbhq/cds-mobile/visualizations',
    newDir: '@cbhq/cds-mobile-visualization',
  },
];
