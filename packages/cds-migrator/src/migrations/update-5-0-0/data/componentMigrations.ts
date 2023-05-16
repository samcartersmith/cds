type ComponentMigration = {
  name: string;
  path: Record<string, string>;
  replacement?: string;
  warning?: string;
};

const warningText =
  'This component has been replaced by a component with a different API. Please migrate props manually. Refer to go/cds-deprecations for API migration guidance.';

/** Component was replaced with another, API could potentially be different and requires manual migration */
export const oneToOneMigrations: ComponentMigration[] = [
  {
    name: 'CollapseArrow',
    path: {
      '@cbhq/cds-web/collapsible': '@cbhq/cds-web/motion/AnimatedCaret',
    },
    replacement: 'AnimatedCaret',
    warning: warningText,
  },
  {
    name: 'BetaProvider',
    path: {
      '@cbhq/cds-common/beta': '@cbhq/cds-web/system',
    },
    replacement: 'FeatureFlagProvider',
  },
  {
    name: 'BetaContext',
    path: {
      '@cbhq/cds-common/beta': '@cbhq/cds-web/system',
    },
    replacement: 'FeatureFlagContext',
  },
  {
    name: 'NavigationBar',
    path: {
      '@cbhq/cds-web/deprecated/navigation': '@cbhq/cds-web/navigation',
    },
    warning: warningText,
  },
  {
    name: 'NavigationIconButton',
    path: {
      '@cbhq/cds-web/deprecated/navigation': '@cbhq/cds-web/buttons',
    },
    warning: warningText,
  },
  {
    name: 'Tabs',
    path: {
      '@cbhq/cds-web/deprecated/navigation': '@cbhq/cds-web/tabs',
    },
    warning: warningText,
    replacement: 'TabNavigation',
  },
  {
    name: 'PopoverMenu',
    path: {
      '@cbhq/cds-web/overlays': '@cbhq/cds-web/dropdown',
    },
    warning: warningText,
    replacement: 'Dropdown',
  },
  {
    name: 'Tooltip',
    path: {
      '@cbhq/cds-web/overlays/Deprecated/Tooltip': '@cbhq/cds-web/overlays/Tooltip',
    },
    warning: warningText,
    replacement: 'Tooltip',
  },
];

type RemovedComponent = {
  name: string;
  path: string;
  replacement?: string;
};

export const removedComponents: RemovedComponent[] = [
  {
    name: 'Badge',
    path: '@cbhq/cds-web/icons',
    replacement: 'use DotCount, DotColor, DotSymbol instead',
  },
  {
    name: 'Badge',
    path: '@cbhq/cds-mobile/icons',
    replacement: 'use DotCount, DotColor, DotSymbol instead',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'MobileMenu',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'MobileMenuChildrenContext',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'Navigation',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'NavigationBarActions',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'NavigationBarControls',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'NavigationBarCtas',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'NavigationBarTitles',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'NavigationDisplayTitle',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'NavigationListItem',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'SidebarSection',
  },
  {
    path: '@cbhq/cds-web/deprecated/navigation',
    name: 'TabItem',
    replacement: 'use TabNavigation instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'PopoverContent',
    replacement: 'use Dropdown instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'PopoverContext',
    replacement: 'use Dropdown instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'PopoverTrigger',
    replacement: 'use Dropdown instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'PopoverTriggerWrapper',
    replacement: 'use Dropdown instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'usePopoverChildren',
    replacement: 'use Dropdown instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'usePopoverMenu',
    replacement: 'use Dropdown instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'usePopoverMenuAnimation',
    replacement: 'use Dropdown instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'usePopoverPosition',
    replacement: 'use Dropdown instead',
  },
  {
    path: '@cbhq/cds-web/overlays',
    name: 'SectionTitle',
    replacement:
      'Compose by wrapping a <code>TextCaption color="foregroundMuted"</code> with an <code>HStack spacingHorizontal="2" spacingVertical="2"</code>',
  },
];
