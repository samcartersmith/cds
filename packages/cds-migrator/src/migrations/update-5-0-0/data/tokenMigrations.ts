export const removedPaths = [
  'web/deprecated/navigation/navigationStyles',
  'web/deprecated/navigation/navigationTokens',
  'web/styles/elevation',
];

type TokenMigration = {
  path: string;
  warning?: string;
};

export const tokenMigrations: TokenMigration[] = [
  {
    path: 'web/styles/borderRadius',
    warning: 'Use rounded border radius variables instead',
  },
  {
    path: 'web/layout/responsive',
    warning:
      'Use deviceBreakpoints, deviceMqs, and deviceMqRanges instead from web/layout/breakpoints',
  },
  {
    path: 'common/tokens/border',
    warning: 'Use tokens/borderWidth and tokens/borderRadius respectively',
  },
  {
    path: 'common/tokens/interactable',
    warning:
      'Use tokens/interatableHeight variables instead, and opacityDisabled -> accessibleOpacityDisabled from common/tokens/interactableHeight',
  },
];
