import { Component, Deprecation } from '../types';

const baseDeprecation: Partial<Component> = {
  package: 'web',
  type: ['path'],
};

export const Q22023: Deprecation = {
  endOfLife: 'Q22023',
  components: [
    { ...baseDeprecation, name: 'Dropdown', path: 'packages/web/dropdown/Dropdown.tsx' },
    {
      ...baseDeprecation,
      name: 'DropdownContent',
      path: 'packages/web/dropdown/DropdownContent.tsx',
    },
    {
      ...baseDeprecation,
      name: 'DropdownProps',
      path: 'packages/web/dropdown/DropdownProps.ts',
    },
    { ...baseDeprecation, name: 'MenuItem', path: 'packages/web/dropdown/MenuItem.tsx' },
    { ...baseDeprecation, name: 'index', path: 'packages/web/dropdown/index.ts' },
    { ...baseDeprecation, name: 'index', path: 'packages/web/index.ts' },
    {
      ...baseDeprecation,
      name: 'Popover',
      path: 'packages/web/overlays/popover/Popover.tsx',
    },
    {
      ...baseDeprecation,
      name: 'PopoverProps',
      path: 'packages/web/overlays/popover/PopoverProps.ts',
    },
    {
      ...baseDeprecation,
      name: 'usePopper',
      path: 'packages/web/overlays/popover/usePopper.ts',
    },
    { ...baseDeprecation, name: 'Select', path: 'packages/web/controls/Select.tsx' },
    {
      ...baseDeprecation,
      name: 'SelectOption',
      path: 'packages/web/controls/SelectOption.tsx',
    },
    {
      ...baseDeprecation,
      name: 'SidebarItem',
      path: 'packages/web/navigation/SidebarItem.tsx',
    },
    {
      ...baseDeprecation,
      name: 'SidebarMoreMenu',
      path: 'packages/web/navigation/SidebarMoreMenu.tsx',
    },
    {
      ...baseDeprecation,
      name: 'Tooltip',
      path: 'packages/web/overlays/Tooltip/Tooltip.tsx',
    },
    {
      ...baseDeprecation,
      name: 'TooltipContent',
      path: 'packages/web/overlays/Tooltip/TooltipContent.tsx',
    },
    {
      ...baseDeprecation,
      name: 'TooltipProps',
      path: 'packages/web/overlays/Tooltip/TooltipProps.ts',
    },
    {
      ...baseDeprecation,
      name: 'useTooltipState',
      path: 'packages/web/overlays/Tooltip/useTooltipState.ts',
    },
  ],
};
