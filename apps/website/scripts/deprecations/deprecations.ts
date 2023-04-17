type Scope = {
  /** List every exported function that will be deleted
   * @danger If a component is being deprecated, every export in the component's file must be listed
   */
  exportNames?: string[];
  /** List every prop that is being deprecated */
  propNames?: string[];
};

export type MigrationType = 'renamed' | 'replaced' | 'path' | 'api' | 'removed' | 'propValue';
export type MigrationMap = Record<
  Extract<MigrationType, 'api' | 'propValue'>,
  Record<string, string | null>
> &
  Record<Extract<MigrationType, 'replaced' | 'path' | 'rename'>, string>;

type SharedProps = {
  name: string;
  package: 'common' | 'mobile' | 'web';
  path: string;
  type: MigrationType[] | MigrationType;
  migrationMap?: Partial<MigrationMap>;
};

/** Deprecation config for Components only. If you are deprecating a prop and not the parent component, use the prop field */
type Component = {
  scope: Scope;
} & SharedProps;

type Prop = {
  components: string[];
} & Pick<SharedProps, 'package' | 'name' | 'type' | 'migrationMap'>;

type Type = {
  scope: Pick<Scope, 'exportNames'>;
} & SharedProps;

type Param = {
  function: string;
  params: string[];
} & Omit<SharedProps, 'name'>;

export type Deprecation = {
  /** Which quarter all these deprecations will be deleted */
  endOfLife: `Q${number}202${number}`;
  /**
   * This is the branch of the latest major release before the deprecations will be deleted
   * this will be used to populate the github URL's for deprecations prior to deletion
   * @example 'v4.1.3' in https://github.cbhq.net/frontend/cds/blob/v4.1.3
   */
  prevMajorVersion: string;
  components?: Component[];
  types?: Type[];
  props?: Prop[];
  hooks?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  functions?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  tokens?: (SharedProps & Pick<Scope, 'exportNames'>)[];
  params?: Param[];
};

export const deprecations: Deprecation[] = [
  {
    endOfLife: 'Q12023',
    prevMajorVersion: 'v4.1.3',
    components: [
      {
        name: 'Badge',
        package: 'web',
        path: 'packages/web/icons/Badge.tsx',
        scope: {
          exportNames: ['Badge', 'BadgeProps'],
        },
        type: ['replaced'],
        migrationMap: {
          replaced: 'DotCount, DotColor, DotSymbol',
        },
      },
      {
        name: 'Badge',
        package: 'mobile',
        path: 'packages/mobile/icons/Badge.tsx',
        scope: {
          exportNames: ['Badge', 'BadgeProps'],
        },
        type: ['replaced'],
        migrationMap: {
          replaced: 'DotCount, DotColor, DotSymbol',
        },
      },
      {
        name: 'Tooltip V1',
        package: 'web',
        path: 'packages/web/overlays/Deprecated/Tooltip.tsx',
        scope: {
          exportNames: ['Tooltip'],
        },
        type: 'path',
        migrationMap: {
          path: 'packages/web/overlays/Tooltip.tsx',
        },
      },
      {
        name: 'Card',
        package: 'web',
        path: 'packages/web/layout/Card.tsx',
        scope: {
          exportNames: ['Card'],
        },
        type: 'path',
        migrationMap: {
          path: 'packages/web/cards/Card.tsx',
        },
      },
      {
        name: 'Card',
        package: 'mobile',
        path: 'packages/mobile/layout/Card.tsx',
        scope: {
          exportNames: ['Card'],
        },
        type: 'path',
        migrationMap: {
          path: 'packages/mobile/cards/Card.tsx',
        },
      },
      {
        name: 'CollapseArrow',
        package: 'web',
        path: 'packages/web/collapsible/CollapseArrow.tsx',
        scope: {
          exportNames: ['CollapseArrow', 'CollapseArrowProps'],
        },
        type: ['replaced', 'api'],
        migrationMap: {
          replaced: 'AnimatedCaret',
          api: {
            degrees: 'rotate',
            collapsed: null,
          },
          path: 'packages/web/motion/AnimatedCaret.tsx',
        },
      },
      {
        name: 'BetaProvider',
        package: 'common',
        path: 'packages/common/beta/BetaProvider.tsx',
        scope: {
          exportNames: ['BetaProvider', 'BetaProviderProps'],
        },
        type: 'replaced',
        migrationMap: {
          replaced: 'FeatureFlagProvider',
          path: 'packages/web/system/FeatureFlagProvider.tsx',
        },
      },
      {
        name: 'BetaContext',
        package: 'common',
        path: 'packages/common/beta/BetaContext.tsx',
        scope: {
          exportNames: ['BetaContext', 'BetaContextProps', 'DEFAULT_BETA_CONTEXT'],
        },
        type: 'replaced',
        migrationMap: {
          replaced: 'FeatureFlagContext',
          path: 'packages/web/system/FeatureFlagContext.tsx',
        },
      },
      {
        path: 'packages/web/deprecated/navigation/MobileMenu.tsx',
        name: 'MobileMenu',
        package: 'web',
        scope: { exportNames: ['MobileMenu', 'MobileMenuProps'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/MobileMenuChildrenContext.tsx',
        name: 'MobileMenuChildrenContext',
        package: 'web',
        scope: { exportNames: ['MobileMenuChildrenContext', 'useMobileMenuChildrenContext'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/Navigation.tsx',
        name: 'Navigation',
        package: 'web',
        scope: { exportNames: ['Navigation', 'NavigationProps'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBar.tsx',
        name: 'NavigationBar',
        package: 'web',
        scope: { exportNames: ['NavigationBar', 'NavigationBarProps'] },
        type: ['path', 'api'],
        migrationMap: {
          path: 'packages/web/navigation/NavigationBar.tsx',
          api: {
            controls: null,
            titles: null,
            ctas: null,
            actions: null,
            animatedOpacity: null,
          },
        },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBarActions.tsx',
        name: 'NavigationBarActions',
        package: 'web',
        scope: { exportNames: ['NavigationBarActions'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBarControls.tsx',
        name: 'NavigationBarControls',
        package: 'web',
        scope: { exportNames: ['NavigationBarControls', 'NavigationBarControlsProps'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBarCtas.tsx',
        name: 'NavigationBarCtas',
        package: 'web',
        scope: { exportNames: ['NavigationBarCtas', 'NavigationBarCtasProps'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBarTitles.tsx',
        name: 'NavigationBarTitles',
        package: 'web',
        scope: { exportNames: ['NavigationBarTitles', 'NavigationBarTitlesProps'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationDisplayTitle.tsx',
        name: 'NavigationDisplayTitle',
        package: 'web',
        scope: { exportNames: ['NavigationDisplayTitle', 'NavigationDisplayTitleProps'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationIconButton.tsx',
        name: 'NavigationIconButton',
        package: 'web',
        scope: { exportNames: ['NavigationIconButton', 'NavigationIconButtonProps'] },
        type: ['path', 'api'],
        migrationMap: {
          path: 'packages/web/buttons/NavigationIconButton.tsx',
          api: {
            label: null,
          },
        },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationListItem.tsx',
        name: 'NavigationListItem',
        package: 'web',
        scope: {
          exportNames: [
            'NavigationListItem',
            'NavigationListItemProps',
            'NavigationListItemLinkProps',
          ],
        },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/Sidebar.tsx',
        name: 'Sidebar',
        package: 'web',
        scope: { exportNames: ['Sidebar', 'SidebarProps'] },
        type: 'path',
        migrationMap: {
          path: 'packages/web/navigation/Sidebar.tsx',
        },
      },
      {
        path: 'packages/web/deprecated/navigation/SidebarSection.tsx',
        name: 'SidebarSection',
        package: 'web',
        scope: { exportNames: ['SidebarSection', 'SidebarSectionProps'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/TabItem.tsx',
        name: 'TabItem',
        package: 'web',
        scope: { exportNames: ['TabItem', 'TabItemBaseProps', 'TabItemProps'] },
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/Tabs.tsx',
        name: 'Tabs',
        package: 'web',
        scope: { exportNames: ['Tabs', 'TabProps'] },
        type: 'replaced',
        migrationMap: {
          replaced: 'TabNavigation',
          path: 'packages/web/tabs/TabNavigation.tsx',
        },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/MenuItem.tsx',
        name: 'MenuItem',
        package: 'web',
        scope: { exportNames: ['MenuItem'] },
        type: 'path',
        migrationMap: {
          path: 'packages/web/dropdown/MenuItem.tsx',
        },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverContent.tsx',
        name: 'PopoverContent',
        package: 'web',
        scope: { exportNames: ['PopoverContent'] },
        type: 'removed',
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverContext.ts',
        name: 'PopoverContext',
        package: 'web',
        scope: { exportNames: ['PopoverContext', 'PopoverProvider', 'usePopoverContext'] },
        type: 'removed',
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverMenu.tsx',
        name: 'PopoverMenu',
        package: 'web',
        scope: { exportNames: ['PopoverMenu'] },
        type: 'replaced',
        migrationMap: {
          replaced: 'Dropdown',
          path: 'packages/web/dropdown/Dropdown.tsx',
          api: {
            visible: null,
            openMenu: null,
            closeMenu: null,
            searchEnabled: null,
            flush: 'block',
            popoverPositionConfig: 'contentPosition',
          },
        },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverTrigger.tsx',
        name: 'PopoverTrigger',
        package: 'web',
        scope: {
          exportNames: ['PopoverTrigger', 'PopoverTriggerHOCProps', 'ClonedPopoverTriggerRef'],
        },
        type: 'removed',
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverTriggerWrapper.tsx',
        name: 'PopoverTriggerWrapper',
        package: 'web',
        scope: {
          exportNames: ['PopoverTriggerWrapper', 'PopoverTriggerWrapperProps'],
        },
        type: 'removed',
      },
      {
        path: 'packages/web/overlays/PopoverMenu/SectionTitle.tsx',
        name: 'SectionTitle',
        package: 'web',
        scope: { exportNames: ['SectionTitle', 'SectionTitleProps'] },
        type: 'replaced',
        migrationMap: {
          replaced:
            'Compose by wrapping a <code>TextCaption color="foregroundMuted"</code> with an <code>HStack spacingHorizontal="2" spacingVertical="2"</code>',
        },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/usePopoverChildren.ts',
        name: 'usePopoverChildren',
        package: 'web',
        scope: { exportNames: ['usePopoverChildren'] },
        type: 'removed',
      },
      {
        path: 'packages/web/overlays/PopoverMenu/usePopoverMenu.tsx',
        name: 'usePopoverMenu',
        package: 'web',
        scope: { exportNames: ['usePopoverMenu'] },
        type: 'removed',
      },
      {
        path: 'packages/web/overlays/PopoverMenu/usePopoverMenuAnimation.ts',
        name: 'usePopoverMenuAnimation',
        package: 'web',
        scope: { exportNames: ['usePopoverMenuAnimation'] },
        type: 'removed',
      },
      {
        path: 'packages/web/overlays/PopoverMenu/usePopoverPosition.ts',
        name: 'usePopoverPosition',
        package: 'web',
        scope: { exportNames: ['usePopoverPosition'] },
        type: 'removed',
      },
    ],
    types: [
      {
        name: 'BadgeBaseProps',
        package: 'common',
        path: 'packages/common/types/BadgeBaseProps.ts',
        scope: {
          exportNames: ['BadgeBaseProps', 'BadgeVariant', 'BadgeValue'],
        },
        type: 'removed',
      },
      {
        name: 'BadgeDotBaseProps',
        package: 'common',
        path: 'packages/common/types/BadgeDotBaseProps.ts',
        scope: {
          exportNames: ['BadgeDotBaseProps'],
        },
        type: 'removed',
      },
    ],
    props: [
      {
        name: 'badge',
        components: ['Icon', 'NavigationIcon'],
        package: 'mobile',
        type: 'removed',
      },
      {
        name: 'badge',
        components: ['Icon', 'NavigationIcon'],
        package: 'web',
        type: 'removed',
      },
      {
        name: 'deprecatedLineHeight',
        components: ['Typography'],
        package: 'mobile',
        type: 'removed',
      },
      {
        name: 'dangerouslySetHtmlWidth',
        components: ['TableCell'],
        package: 'web',
        type: 'removed',
      },
      {
        name: 'horizontal',
        components: ['Group'],
        package: 'web',
        type: 'api',
        migrationMap: {
          api: {
            horizontal: 'direction',
          },
        },
      },
      {
        name: 'horizontal',
        components: ['Group'],
        package: 'mobile',
        type: 'api',
        migrationMap: {
          api: {
            horizontal: 'direction',
          },
        },
      },
      {
        name: 'horizontal',
        components: [
          'announcementCardBuilder',
          'featureEntryCardBuilder',
          'feedCardBuilder',
          'cardGroupBuilder',
        ],
        package: 'common',
        type: 'api',
        migrationMap: {
          api: {
            horizontal: 'direction',
          },
        },
      },
      {
        name: 'dimension',
        components: ['SpotSquare'],
        package: 'web',
        type: 'propValue',
        migrationMap: {
          propValue: {
            '120x120': '96x96',
          },
        },
      },
      {
        name: 'dimension',
        components: ['Pictogram'],
        package: 'web',
        type: 'propValue',
        migrationMap: {
          propValue: {
            '96x96': '64x64',
          },
        },
      },
      {
        name: 'dimension',
        components: ['SpotSquare'],
        package: 'mobile',
        type: 'propValue',
        migrationMap: {
          propValue: {
            '120x120': '96x96',
          },
        },
      },
      {
        name: 'dimension',
        components: ['Pictogram'],
        package: 'mobile',
        type: 'propValue',
        migrationMap: {
          propValue: {
            '96x96': '64x64',
          },
        },
      },
    ],
    hooks: [
      {
        name: 'useBadge',
        path: 'packages/common/hooks/useBadge.ts',
        package: 'common',
        type: 'removed',
      },
      {
        name: 'useBeta',
        package: 'common',
        path: 'packages/common/beta/useBeta.tsx',
        type: 'removed',
      },
      {
        name: 'useIsMobile',
        package: 'web',
        path: 'packages/web/hooks/useIsMobile.ts',
        type: 'replaced',
        migrationMap: {
          replaced: 'useBreakpoints',
          path: 'packages/web/hooks/useBreakpoints.ts',
        },
      },
      {
        name: 'useRotateAnimation',
        package: 'web',
        path: 'packages/web/hooks/useRotateAnimation.ts',
        type: 'replaced',
        migrationMap: {
          replaced: 'AnimatedCaret',
          path: 'packages/web/motion/AnimationCaret.tsx',
        },
      },
    ],
    tokens: [
      {
        name: 'motion',
        package: 'common',
        path: 'packages/common/tokens/motion.ts',
        exportNames: ['durations', 'curves', 'EasingArray'],
        type: 'path',
        migrationMap: {
          path: 'packages/common/motion/tokens.ts',
        },
      },
      {
        path: 'packages/web/deprecated/navigation/navigationStyles.ts',
        name: 'navigationStyles',
        package: 'web',
        exportNames: [
          'rootStyles',
          'gridForSidebar',
          'scrollContent',
          'disableScroll',
          'sidebarItemStyles',
          'sidebarListReset',
          'hideForCondensed',
          'showForCondensed',
          'hideForMobile',
          'ForMobile',
          'unsetVisuallyHidden',
          'visuallyHidden',
        ],
        type: 'removed',
      },
      {
        path: 'packages/web/deprecated/navigation/navigationTokens.ts',
        name: 'navigationTokens',
        package: 'web',
        exportNames: [
          'navbarSpacing',
          'displayTitleSpacing',
          'sidebarWidth',
          'appContentSpacing',
          'subtitleColor',
          'iconContainerSize',
          'unsetVisuallyHidden',
          'visuallyHidden',
        ],
        type: 'removed',
      },
      {
        path: 'packages/web/styles/borderRadius.ts',
        name: 'borderRadius',
        package: 'web',
        type: 'replaced',
        migrationMap: {
          replaced: 'Use rounded border radius variables instead',
        },
      },
      {
        path: 'packages/web/layout/responsive.ts',
        name: 'responsive',
        package: 'web',
        type: ['path', 'replaced'],
        migrationMap: {
          path: 'packages/web/layout/breakpoints.ts',
          replaced: 'Use deviceBreakpoints, deviceMqs, and deviceMqRanges instead',
        },
      },
      {
        path: 'packages/web/styles/elevation.ts',
        name: 'elevation',
        package: 'web',
        type: 'removed',
      },
      {
        path: 'packages/common/tokens/border.ts',
        name: 'border',
        package: 'common',
        type: 'path',
        migrationMap: {
          path: 'Use tokens/borderWidth and tokens/borderRadius respectively',
        },
      },
      {
        path: 'packages/common/tokens/interactable.ts',
        name: 'interactable',
        package: 'common',
        exportNames: ['defaultHeight', 'compactHeight', 'opacityDisabled'],
        type: 'replaced',
        migrationMap: {
          replaced:
            'Use tokens/interatableHeight variables instead, and opacityDisabled -> accessibleOpacityDisabled',
          path: 'packages/common/tokens/interactableHeight.ts',
        },
      },
    ],
    functions: [
      {
        name: 'buttonBuilderDeprecated',
        path: 'packages/common/internal/buttonBuilderDeprecated.tsx',
        package: 'common',
        type: ['replaced', 'path'],
        migrationMap: {
          path: 'packages/common/internal/buttonBuilder.ts',
        },
      },
      {
        name: 'Animated',
        package: 'web',
        path: 'packages/web/animation/Animated.ts',
        type: 'removed',
        migrationMap: {
          replaced: 'use useMotionProps and Framer Motion instead',
        },
      },
      {
        path: 'packages/common/utils/getButtonSpacing.ts',
        name: 'getButtonSpacing',
        package: 'common',
        type: ['replaced', 'path'],
        migrationMap: {
          path: 'packages/common/utils/getButtonSpacingProps.ts',
          replaced: 'getButtonSpacingProps',
        },
      },
      {
        path: 'packages/common/utils/getIllustrationScaledDimension.ts',
        name: 'getIllustrationScaledDimension',
        package: 'common',
        type: 'removed',
        migrationMap: {
          replaced: 'Please use convertDimensionToSize and convertSizeWithMultiplier instead',
        },
      },
      {
        path: 'packages/common/cards/createAnnouncementCardDeprecated.tsx',
        name: 'createAnnouncementCardDeprecated',
        package: 'common',
        type: ['replaced', 'path'],
        migrationMap: {
          replaced: 'createAnnouncementCard',
          path: 'packages/common/cards/createAnnouncementCard.tsx',
        },
      },
      {
        path: 'packages/common/cards/createFeatureEntryCardDeprecated.tsx',
        name: 'createFeatureEntryCardDeprecated',
        package: 'common',
        type: ['replaced', 'path'],
        migrationMap: {
          replaced: 'createFeatureEntryCard',
          path: 'packages/common/cards/createFeatureEntryCard.tsx',
        },
      },
    ],
    params: [
      {
        function: 'useCellSpacing',
        params: ['reduceHorizontalSpacing', 'offsetHorizontal'],
        path: 'packages/common/hooks/useCellSpacing.ts',
        package: 'common',
        type: 'api',
        migrationMap: {
          api: {
            reduceHorizontalSpacing:
              'Use the innerSpacing property with a key of spacingHorizontal instead',
            offsetHorizontal:
              'Use the outerSpacing property with a key of offsetHorizontal instead',
          },
        },
      },
    ],
  },
];
