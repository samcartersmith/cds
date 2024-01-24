import { DecompedMigration } from '../../../helpers';

export const revertedMigrations: DecompedMigration[] = [
  {
    exports: ['Dropdown', 'DropdownProps', 'MenuItem'],
    newDir: '@cbhq/cds-web/dropdown',
    oldDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['Popover', 'PopoverProps', 'usePopper', 'PopoverContentPositionConfig'],
    newDir: '@cbhq/cds-web/overlays',
    oldDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['Select', 'SelectOption', 'SelectProps'],
    newDir: '@cbhq/cds-web/controls',
    oldDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['SelectChip', 'SelectChipProps'],
    newDir: '@cbhq/cds-web/controls',
    oldDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['SidebarMoreMenu'],
    newDir: '@cbhq/cds-web/navigation',
    oldDir: '@cbhq/cds-web-overlays',
  },
  {
    exports: ['Tooltip', 'TooltipContent', 'TooltipProps', 'useTooltipState'],
    newDir: '@cbhq/cds-web/overlays',
    oldDir: '@cbhq/cds-web-overlays',
  },
];
