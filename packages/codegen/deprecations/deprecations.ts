type Scope = {
  /** List every exported function that will be deleted
   * @danger If a component is being deprecated, every export in the component's file must be listed
   */
  exportNames?: string[];
  /** List every prop that is being deprecated */
  propNames?: string[];
};

type SharedProps = {
  name: string;
  package: 'common' | 'mobile' | 'web';
  path: string;
};

/** Deprecation config for Components only. If you are deprecating a prop and not the parent component, use the prop field */
type Component = {
  scope: Scope;
} & SharedProps;

type Prop = {
  components: string[];
} & Pick<SharedProps, 'package' | 'name'>;

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
    endOfLife: 'Q22023',
    components: [
      {
        name: 'Badge',
        package: 'web',
        path: 'packages/web/icons/Badge.tsx',
        scope: {
          exportNames: ['Badge', 'BadgeProps'],
        },
      },
      {
        name: 'Badge',
        package: 'mobile',
        path: 'packages/mobile/icons/Badge.tsx',
        scope: {
          exportNames: ['Badge', 'BadgeProps'],
        },
      },
      {
        name: 'Tooltip V1',
        package: 'web',
        path: 'packages/web/overlays/Deprecated/Tooltip.tsx',
        scope: {
          exportNames: ['Tooltip'],
        },
      },
      {
        name: 'Card (changed directory)',
        package: 'web',
        path: 'packages/web/layout/Card.tsx',
        scope: {
          exportNames: ['Card'],
        },
      },
      {
        name: 'CollapseArrow',
        package: 'web',
        path: 'packages/web/collapsible/CollapseArrow.tsx',
        scope: {
          exportNames: ['CollapseArrow', 'CollapseArrowProps'],
        },
      },
      {
        name: 'BetaProvider',
        package: 'common',
        path: 'packages/common/beta/BetaProvider.tsx',
        scope: {
          exportNames: ['BetaProvider', 'BetaProviderProps'],
        },
      },
      {
        name: 'BetaContext',
        package: 'common',
        path: 'packages/common/beta/BetaContext.tsx',
        scope: {
          exportNames: ['BetaContext', 'BetaContextProps', 'DEFAULT_BETA_CONTEXT'],
        },
      },
      {
        path: 'packages/web/deprecated/navigation/MobileMenu.tsx',
        name: 'MobileMenu',
        package: 'web',
        scope: { exportNames: ['MobileMenu', 'MobileMenuProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/MobileMenuChildrenContext.tsx',
        name: 'MobileMenuChildrenContext',
        package: 'web',
        scope: { exportNames: ['MobileMenuChildrenContext', 'useMobileMenuChildrenContext'] },
      },
      {
        path: 'packages/web/deprecated/navigation/Navigation.tsx',
        name: 'Navigation',
        package: 'web',
        scope: { exportNames: ['Navigation', 'NavigationProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBar.tsx',
        name: 'NavigationBar',
        package: 'web',
        scope: { exportNames: ['NavigationBar', 'NavigationBarProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBarActions.tsx',
        name: 'NavigationBarActions',
        package: 'web',
        scope: { exportNames: ['NavigationBarActions'] },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBarControls.tsx',
        name: 'NavigationBarControls',
        package: 'web',
        scope: { exportNames: ['NavigationBarControls', 'NavigationBarControlsProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBarCtas.tsx',
        name: 'NavigationBarCtas',
        package: 'web',
        scope: { exportNames: ['NavigationBarCtas', 'NavigationBarCtasProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationBarTitles.tsx',
        name: 'NavigationBarTitles',
        package: 'web',
        scope: { exportNames: ['NavigationBarTitles', 'NavigationBarTitlesProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationDisplayTitle.tsx',
        name: 'NavigationDisplayTitle',
        package: 'web',
        scope: { exportNames: ['NavigationDisplayTitle', 'NavigationDisplayTitleProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/NavigationIconButton.tsx',
        name: 'NavigationIconButton',
        package: 'web',
        scope: { exportNames: ['NavigationIconButton', 'NavigationIconButtonProps'] },
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
      },
      {
        path: 'packages/web/deprecated/navigation/Sidebar.tsx',
        name: 'Sidebar',
        package: 'web',
        scope: { exportNames: ['Sidebar', 'SidebarProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/SidebarSection.tsx',
        name: 'SidebarSection',
        package: 'web',
        scope: { exportNames: ['SidebarSection', 'SidebarSectionProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/TabItem.tsx',
        name: 'TabItem',
        package: 'web',
        scope: { exportNames: ['TabItem', 'TabItemBaseProps', 'TabItemProps'] },
      },
      {
        path: 'packages/web/deprecated/navigation/Tabs.tsx',
        name: 'Tabs',
        package: 'web',
        scope: { exportNames: ['Tabs', 'TabProps'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/MenuItem.tsx',
        name: 'MenuItem',
        package: 'web',
        scope: { exportNames: ['MenuItem'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverContent.tsx',
        name: 'PopoverContent',
        package: 'web',
        scope: { exportNames: ['PopoverContent'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverContext.ts',
        name: 'PopoverContext',
        package: 'web',
        scope: { exportNames: ['PopoverContext', 'PopoverProvider', 'usePopoverContext'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverMenu.tsx',
        name: 'PopoverMenu',
        package: 'web',
        scope: { exportNames: ['PopoverMenu'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverTrigger.tsx',
        name: 'PopoverTrigger',
        package: 'web',
        scope: {
          exportNames: ['PopoverTrigger', 'PopoverTriggerHOCProps', 'ClonedPopoverTriggerRef'],
        },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/PopoverTriggerWrapper.tsx',
        name: 'PopoverTriggerWrapper',
        package: 'web',
        scope: {
          exportNames: ['PopoverTriggerWrapper', 'PopoverTriggerWrapperProps'],
        },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/SectionTitle.tsx',
        name: 'SectionTitle',
        package: 'web',
        scope: { exportNames: ['SectionTitle', 'SectionTitleProps'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/usePopoverChildren.ts',
        name: 'usePopoverChildren',
        package: 'web',
        scope: { exportNames: ['usePopoverChildren'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/usePopoverMenu.tsx',
        name: 'usePopoverMenu',
        package: 'web',
        scope: { exportNames: ['usePopoverMenu'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/usePopoverMenuAnimation.ts',
        name: 'usePopoverMenuAnimation',
        package: 'web',
        scope: { exportNames: ['usePopoverMenuAnimation'] },
      },
      {
        path: 'packages/web/overlays/PopoverMenu/usePopoverPosition.ts',
        name: 'usePopoverPosition',
        package: 'web',
        scope: { exportNames: ['usePopoverPosition'] },
      },
      {
        path: 'packages/web/illustrations/Illustration.tsx',
        name: 'Illustration',
        package: 'web',
        scope: { exportNames: ['Illustration'] },
      },
      {
        path: 'packages/mobile/illustrations/Illustration.tsx',
        name: 'Illustration',
        package: 'web',
        scope: { exportNames: ['Illustration', 'versionMaps'] },
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
      },
      {
        name: 'BadgeDotBaseProps',
        package: 'common',
        path: 'packages/common/types/BadgeDotBaseProps.ts',
        scope: {
          exportNames: ['BadgeDotBaseProps'],
        },
      },
    ],
    props: [
      {
        name: 'badge',
        components: ['IconBase'],
        package: 'mobile',
      },
      {
        name: 'badge',
        components: ['IconBase'],
        package: 'web',
      },
      { name: 'deprecatedLineHeight', components: ['createText'], package: 'mobile' },
      { name: 'dangerouslySetHtmlWidth', components: ['TableCell'], package: 'web' },
      { name: 'horizontal', components: ['Group'], package: 'web' },
      { name: 'horizontal', components: ['Group'], package: 'mobile' },
      {
        name: 'horizontal',
        components: [
          'announcementCardBuilder',
          'featureEntryCardBuilder',
          'feedCardBuilder',
          'cardGroupBuilder',
        ],
        package: 'common',
      },
      {
        name: 'dimension',
        components: ['Illustration', 'HeroSquare', 'SpotSquare', 'Pictogram', 'SpotRectangle'],
        package: 'web',
      },
      {
        name: 'dimension',
        components: ['Illustration', 'HeroSquare', 'SpotSquare', 'Pictogram', 'SpotRectangle'],
        package: 'mobile',
      },
    ],
    hooks: [
      {
        name: 'useBadge',
        path: 'packages/common/hooks/useBadge.ts',
        package: 'common',
      },
      {
        name: 'useBeta',
        package: 'common',
        path: 'packages/common/beta/useBeta.tsx',
      },
      {
        name: 'useIsMobile',
        package: 'common',
        path: 'packages/web/hooks/useIsMobile.ts',
      },
    ],
    tokens: [
      {
        name: 'motion',
        package: 'common',
        path: 'packages/common/tokens/motion.ts',
        exportNames: ['durations', 'curves', 'EasingArray'],
      },
      {
        path: 'packages/web/deprecated/navigation/navigationStyles.ts',
        name: 'navigationStyles',
        package: 'web',
      },
      {
        path: 'packages/web/deprecated/navigation/navigationTokens.ts',
        name: 'navigationTokens',
        package: 'web',
      },
      {
        path: 'packages/web/styles/borderRadius.ts',
        name: 'borderRadius',
        package: 'web',
      },
      {
        path: 'packages/web/layout/responsive.ts',
        name: 'responsive',
        package: 'web',
      },
      {
        path: 'packages/web/styles/elevation.ts',
        name: 'elevation',
        package: 'web',
      },
      {
        path: 'packages/common/tokens/border.ts',
        name: 'border',
        package: 'common',
      },
      {
        path: 'packages/common/tokens/interactable.ts',
        name: 'interactable',
        package: 'common',
        exportNames: ['defaultHeight', 'compactHeight', 'opacityDisabled'],
      },
    ],
    functions: [
      {
        name: 'buttonBuilderDeprecated',
        path: 'packages/common/internal/buttonBuilderDeprecated.tsx',
        package: 'common',
      },
      {
        name: 'Animated',
        package: 'web',
        path: 'packages/web/animation/Animated.ts',
      },
      {
        path: 'packages/common/utils/getButtonSpacing.ts',
        name: 'getButtonSpacing',
        package: 'common',
      },
      {
        path: 'packages/common/utils/getIllustrationScaledDimension.ts',
        name: 'getIllustrationScaledDimension',
        package: 'common',
      },
      {
        path: 'packages/common/cards/createAnnouncementCardDeprecated.tsx',
        name: 'createAnnouncementCardDeprecated',
        package: 'common',
      },
      {
        path: 'packages/common/cards/createFeatureEntryCardDeprecated.tsx',
        name: 'createFeatureEntryCardDeprecated',
        package: 'common',
      },
    ],
    params: [
      {
        function: 'useCellSpacing',
        params: ['reduceHorizontalSpacing', 'offsetHorizontal'],
        path: 'packages/common/hooks/useCellSpacing.ts',
        package: 'common',
      },
    ],
  },
];
