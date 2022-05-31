const { adopters } = require('../data/sidebar/adopters');

module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'home/home',
      label: `CDS`, // This is hidden, but docusaurus does not allow empty label
      customProps: { hidden: true },
    },
    {
      type: 'category',
      label: 'Foundations',
      items: [
        'cds/getting-started',
        'foundation/a11y',
        'foundation/color',
        'foundation/content',
        'foundation/elevation',
        'foundation/layout',
        {
          type: 'category',
          label: 'Motion',
          items: [
            { type: 'doc', id: 'foundation/motion/brand-motion', label: 'Brand' },
            { type: 'doc', id: 'foundation/motion/product-motion-language', label: 'Product' },
            { type: 'doc', id: 'foundation/motion/timing', label: 'Timing' },
            { type: 'doc', id: 'foundation/motion/motion-handoff', label: 'Handoff' },
          ],
        },
        { type: 'doc', id: 'foundation/scale', label: 'Scale' },
        { type: 'doc', id: 'foundation/typography', label: 'Typography' },
      ],
    },
    {
      type: 'category',
      label: 'Assets',
      items: [
        {
          type: 'category',
          label: 'Icons',
          items: [
            { type: 'doc', id: 'components/icons/Icon/icon', label: 'Icon' },
            {
              type: 'doc',
              id: 'components/icons/NavigationIcon/navigation-icon',
              label: 'Navigation Icon',
            },
            {
              type: 'doc',
              id: 'foundation/creating-and-maintaining-iconography',
              label: 'Contributing',
            },
            {
              type: 'doc',
              id: 'foundation/iconography',
              label: 'Guidelines',
            },
          ],
        },
        {
          type: 'category',
          label: 'Illustrations',
          items: [
            {
              type: 'doc',
              id: 'foundation/product-illustration',
              label: 'Guidelines',
            },
            {
              type: 'doc',
              id: 'components/illustrations/HeroSquare/hero-square',
              label: 'Hero Square',
            },
            {
              type: 'doc',
              id: 'components/illustrations/Pictogram/pictogram',
              label: 'Pictogram',
            },
            {
              type: 'doc',
              id: 'components/illustrations/SpotRectangle/spot-rectangle',
              label: 'Spot Rectangle',
            },
            {
              type: 'doc',
              id: 'components/illustrations/SpotSquare/spot-square',
              label: 'Spot Square',
            },
          ],
        },
        {
          type: 'category',
          label: 'Logos',
          items: [
            { type: 'doc', id: 'components/icons/logo', label: 'Logo' },
            {
              type: 'doc',
              id: 'components/icons/SubBrandLogoMark/sub-brand-logo-mark',
              label: 'Sub Brand Mark',
            },
            {
              type: 'doc',
              id: 'components/icons/SubBrandLogoWordmark/sub-brand-logo-wordmark',
              label: 'Sub Brand Wordmark',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        {
          type: 'category',
          label: 'Alert',
          items: ['components/overlays/Alert/alert', 'hooks/useAlert'],
        },
        {
          type: 'category',
          label: 'Avatar',
          items: [
            { type: 'doc', id: 'components/media/Avatar/avatar', label: 'Avatar' },
            {
              type: 'doc',
              id: 'components/buttons/AvatarButton/avatar-button',
              label: 'Avatar Button',
            },
          ],
        },
        {
          type: 'category',
          label: 'Accordion',
          items: [
            'components/accordion/Accordion/accordion',
            {
              type: 'doc',
              id: 'components/accordion/AccordionItem/accordion-item',
              label: 'Accordion Item',
            },
          ],
        },
        { type: 'doc', id: 'components/layout/Box/box', label: 'Box' },
        {
          type: 'category',
          label: 'Button',
          items: [
            { type: 'doc', id: 'components/buttons/Button/button', label: 'Button' },
            {
              type: 'doc',
              id: 'components/buttons/ButtonGroup/button-group',
              label: 'Button Group',
            },
            { type: 'doc', id: 'components/buttons/TileButton/tile-button', label: 'Tile Button' },
          ],
        },
        {
          type: 'category',
          label: 'Card',
          customProps: {
            tag: 'deprecated',
          },
          items: [
            'components/cards/Card/card',
            { type: 'doc', id: 'components/cards/CardBody/card-body', label: 'Card Body' },
            { type: 'doc', id: 'components/cards/CardFooter/card-footer', label: 'Card Footer' },
            { type: 'doc', id: 'components/cards/CardGroup/card-group', label: 'Card Group' },
            { type: 'doc', id: 'components/cards/CardHeader/card-header', label: 'Card Header' },
            {
              type: 'doc',
              id: 'components/cards/AnnouncementCard/announcement-card',
              label: 'Announcement Card',
            },
            {
              type: 'doc',
              id: 'components/cards/FeatureEntryCard/feature-entry-card',
              label: 'Feature Entry Card',
            },
            { type: 'doc', id: 'components/cards/FeedCard/feed-card', label: 'Feed Card' },
          ],
        },
        {
          type: 'category',
          label: 'Cell',
          items: [
            { type: 'doc', id: 'components/cells/ListCell/list-cell', label: 'List Cell' },
            {
              type: 'doc',
              id: 'components/cells/ListCellFallback/list-cell-fallback',
              label: 'List Cell Fallback',
            },
            { type: 'doc', id: 'components/cells/ContentCell/content-cell', label: 'Content Cell' },
            {
              type: 'doc',
              id: 'components/cells/ContentCellFallback/content-cell-fallback',
              label: 'Content Cell Fallback',
            },
            { type: 'doc', id: 'components/cells/CellMedia/cell-media', label: 'Cell Media' },
          ],
        },
        { type: 'doc', id: 'components/controls/Checkbox/checkbox', label: 'Checkbox' },
        { type: 'doc', id: 'components/collapsible/Collapsible/collapsible', label: 'Collapsible' },
        { type: 'doc', id: 'components/layout/Divider/divider', label: 'Divider' },
        {
          type: 'category',
          label: 'Dot',
          items: [
            { type: 'doc', id: 'components/dots/DotCount/dot-count', label: 'Count' },
            {
              type: 'doc',
              id: 'components/dots/DotStatusColor/dot-status-color',
              label: 'Status Color',
            },
            { type: 'doc', id: 'components/dots/DotSymbol/dot-symbol', label: 'Symbol' },
          ],
        },
        { type: 'doc', id: 'components/overlays/Drawer/drawer', label: 'Drawer' },
        {
          type: 'doc',
          id: 'components/dropdown/Dropdown/dropdown',
          label: 'Dropdown',
          customProps: {
            tag: 'new',
          },
        },
        { type: 'doc', id: 'components/layout/Fallback/fallback', label: 'Fallback' },
        { type: 'doc', id: 'components/layout/Group/group', label: 'Group' },
        { type: 'doc', id: 'components/layout/HStack/h-stack', label: 'HStack' },
        { type: 'ref', id: 'components/icons/Icon/icon', label: 'Icon' },
        { type: 'doc', id: 'components/buttons/IconButton/icon-button', label: 'Icon Button' },
        { type: 'doc', id: 'components/typography/Link/link', label: 'Link' },
        {
          type: 'category',
          label: 'Lottie',
          items: [
            { type: 'doc', id: 'components/animation/Lottie/lottie', label: 'Lottie' },
            {
              type: 'doc',
              id: 'components/animation/LottieStatusAnimation/lottie-status-animation',
              label: 'Lottie Status Animation',
            },
          ],
        },
        {
          type: 'category',
          label: 'Modal',
          items: [
            'components/overlays/Modal/modal',
            { type: 'doc', id: 'components/overlays/ModalBody/modal-body', label: 'Modal Body' },
            {
              type: 'doc',
              id: 'components/overlays/ModalFooter/modal-footer',
              label: 'Modal Footer',
            },
            {
              type: 'doc',
              id: 'components/overlays/ModalHeader/modal-header',
              label: 'Modal Header',
            },
            { type: 'doc', id: 'hooks/useModal', label: 'useModal' },
            {
              type: 'doc',
              id: 'components/overlays/FullscreenModal/fullscreen-modal',
              label: 'Fullscreen Modal',
            },
          ],
        },
        {
          type: 'category',
          label: 'Navigation Bar',
          items: [
            {
              type: 'doc',
              id: 'components/navigation/NavigationBar/navigation-bar',
              label: 'Navigation Bar',
            },
            {
              type: 'ref',
              id: 'components/icons/NavigationIcon/navigation-icon',
              label: 'Navigation Icon',
            },
            {
              type: 'ref',
              id: 'components/buttons/NavigationIconButton/navigation-icon-button',
              label: 'Navigation Icon Button',
            },
            { type: 'doc', id: 'components/navigation/NavLink/nav-link', label: 'Nav Link' },
            {
              type: 'doc',
              id: 'components/navigation/NavigationTitle/navigation-title',
              label: 'Navigation Title',
            },
          ],
        },
        {
          type: 'category',
          label: 'Popover Menu',
          customProps: { tag: 'deprecated' },
          items: [
            {
              type: 'doc',
              id: 'components/overlays/PopoverMenu/popover-menu',
              label: 'Popover Menu',
            },
            {
              type: 'doc',
              id: 'components/overlays/PopoverTrigger/popover-trigger',
              label: 'Popover Trigger',
            },
            {
              type: 'doc',
              id: 'components/overlays/PopoverTriggerWrapper/popover-trigger-wrapper',
              label: 'Popover Trigger Wrapper',
            },
          ],
        },
        {
          type: 'category',
          label: 'Pressable',
          items: [
            { type: 'doc', id: 'components/system/Pressable/pressable', label: 'Pressable' },
            {
              type: 'doc',
              id: 'components/system/PressableOpacity/pressable-opacity',
              label: 'Pressable Opacity',
            },
          ],
        },
        { type: 'doc', id: 'components/controls/RadioGroup/radio-group', label: 'Radio Group' },
        { type: 'doc', id: 'components/media/RemoteImage/remote-image', label: 'Remote Image' },
        {
          type: 'doc',
          id: 'components/media/RemoteImageGroup/remote-image-group',
          label: 'Remote Image Group',
        },
        { type: 'doc', id: 'components/controls/SearchInput/search-input', label: 'Search  Input' },
        {
          type: 'doc',
          id: 'components/overlays/SectionTitle/section-title',
          label: 'Section Title',
        },
        {
          type: 'category',
          label: 'Select',
          items: [
            { type: 'doc', id: 'components/controls/Select/select', label: 'Select' },
            {
              type: 'doc',
              id: 'components/controls/SelectOption/select-option',
              label: 'Select Option',
            },
          ],
        },
        {
          type: 'category',
          label: 'Sidebar',
          items: [
            { type: 'doc', id: 'components/navigation/Sidebar/sidebar', label: 'Sidebar' },
            {
              type: 'doc',
              id: 'components/navigation/SidebarItem/sidebar-item',
              label: 'Sidebar Item',
            },
            {
              type: 'doc',
              id: 'components/navigation/SidebarMoreMenu/sidebar-more-menu',
              label: 'Sidebar More Menu',
            },
          ],
        },
        { type: 'doc', id: 'components/layout/Spacer/spacer', label: 'Spacer' },
        {
          type: 'category',
          label: 'Sparkline',
          items: [
            'components/visualizations/Sparkline/sparkline',
            {
              type: 'doc',
              id: 'components/visualizations/SparklineGradient/sparkline-gradient',
              label: 'Sparkline Gradient',
            },
            {
              type: 'doc',
              id: 'components/visualizations/SparklineInteractive/sparkline-interactive',
              label: 'Sparkline Interactive',
            },
            {
              type: 'doc',
              id: 'components/visualizations/SparklineInteractiveHeader/sparkline-interactive-header',
              label: 'Sparkline Interactive Header',
            },
            { type: 'doc', id: 'hooks/useSparklinePath', label: 'useSparklinePath' },
          ],
        },
        { type: 'doc', id: 'components/loaders/Spinner/spinner', label: 'Spinner' },
        { type: 'doc', id: 'components/controls/Switch/switch', label: 'Switch' },
        {
          type: 'category',
          label: 'Tab Navigation',
          items: [
            {
              type: 'doc',
              id: 'components/tabs/TabNavigation/tab-navigation',
              label: 'Tab Navigation',
            },
            { type: 'doc', id: 'components/tabs/TabLabel/tab-label', label: 'Tab Label' },
            {
              type: 'doc',
              id: 'components/tabs/TabIndicator/tab-indicator',
              label: 'Tab Indicator',
            },
          ],
        },
        {
          type: 'category',
          label: 'Table',
          items: [
            'components/tables/Table/table',
            { type: 'doc', id: 'components/tables/TableBody/table-body', label: 'Table Body' },
            { type: 'doc', id: 'components/tables/TableCell/table-cell', label: 'Table Cell' },
            {
              type: 'doc',
              id: 'components/tables/TableCellFallback/table-cell-fallback',
              label: 'Table Cell Fallback',
            },
            {
              type: 'doc',
              id: 'components/tables/TableFooter/table-footer',
              label: 'Table Footer',
            },
            {
              type: 'doc',
              id: 'components/tables/TableHeader/table-header',
              label: 'Table Header',
            },
            { type: 'doc', id: 'components/tables/TableRow/table-row', label: 'Table Row' },
          ],
        },
        { type: 'doc', id: 'components/typography/Text/text', label: 'Text' },
        { type: 'doc', id: 'components/controls/TextInput/text-input', label: 'Text Input' },
        {
          type: 'doc',
          id: 'components/controls/NativeTextArea/native-text-area',
          label: 'Native Text Area',
        },
        {
          type: 'category',
          label: 'Toast',
          items: ['components/overlays/Toast/toast', 'hooks/useToast'],
        },
        { type: 'doc', id: 'components/overlays/Tooltip/tooltip', label: 'Tooltip' },
        { type: 'doc', id: 'components/overlays/Tray/tray', label: 'Tray' },
        {
          type: 'category',
          label: 'ProgressBar',
          items: [
            'components/visualizations/ProgressBar/progress-bar',
            {
              type: 'doc',
              id: 'components/visualizations/ProgressBarWithFixedLabels/progress-bar-with-fixed-labels',
              label: 'Progress Bar w/ Fixed Labels',
            },
            {
              type: 'doc',
              id: 'components/visualizations/ProgressBarWithFloatLabel/progress-bar-with-float-label',
              label: 'Progress Bar w/ Float Labels',
            },
          ],
        },
        {
          type: 'doc',
          id: 'components/visualizations/ProgressCircle/progress-circle',
          label: 'Progress Circle',
        },
        { type: 'doc', id: 'components/layout/VStack/v-stack', label: 'VStack' },
      ],
    },
    {
      type: 'category',
      label: 'Patterns',
      items: ['concepts/messaging/errors'],
    },
    {
      type: 'category',
      label: 'Recipes',
      items: [
        { type: 'doc', id: 'recipes/sparkline-interactive', label: 'Asset Chart' },
        { type: 'doc', id: 'partnerships/AppSwitcher/app-switcher', label: 'App Switcher' },
        { type: 'doc', id: 'partnerships/UserSwitcher/user-switcher', label: 'User Switcher' },
        { type: 'doc', id: 'recipes/navigation', label: 'Navigation' },
      ],
    },
    {
      type: 'category',
      label: 'Abstract Components',
      items: [
        {
          type: 'category',
          label: 'DevicePreferencesProvider',
          items: [
            {
              type: 'doc',
              id: 'components/system/DevicePreferencesProvider/device-preferences-provider',
              label: 'Provider',
            },
            'hooks/useDeviceSpectrum',
          ],
        },
        {
          type: 'category',
          label: 'EventHandlerProvider',
          items: [
            {
              type: 'doc',
              id: 'components/system/EventHandlerProvider/event-handler-provider',
              label: 'Provider',
            },
            'hooks/useEventHandler',
          ],
        },
        {
          type: 'doc',
          id: 'components/system/FeatureFlagProvider/feature-flag-provider',
          label: 'FeatureFlagProvider',
        },
        { type: 'doc', id: 'components/system/Interactable/interactable', label: 'Interactable' },
        {
          type: 'category',
          label: 'PortalProvider',
          items: ['hooks/useOverlay'],
        },
        {
          type: 'category',
          label: 'ThemeProvider',
          items: [
            {
              type: 'doc',
              id: 'components/system/ThemeProvider/theme-provider',
              label: 'Provider',
            },
            'hooks/usePalette',
            'hooks/usePaletteConfig',
            'hooks/usePaletteValueToRgbaString',
            'hooks/useSpectrum',
            'hooks/useSpectrumConditional',
            // TODO: 'hooks/useScale',
            'hooks/useScaleConditional',
            'hooks/useAccessibleForeground',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        {
          type: 'category',
          label: 'Adoption',
          items: [{ type: 'doc', id: 'adoption-tracker-overview', label: 'Overview' }, ...adopters],
        },
        { type: 'doc', id: 'a11y-report', label: 'Accessibility Tracker' },
        {
          type: 'category',

          label: 'Changelog',
          items: [
            { type: 'doc', id: 'changelog/common', label: '@cbhq/cds-common' },
            { type: 'doc', id: 'changelog/fonts', label: '@cbhq/cds-fonts' },
            { type: 'doc', id: 'changelog/lottie-files', label: '@cbhq/cds-lottie-files' },
            { type: 'doc', id: 'changelog/mobile', label: '@cbhq/cds-mobile' },
            { type: 'doc', id: 'changelog/utils', label: '@cbhq/cds-utils' },
            { type: 'doc', id: 'changelog/web', label: '@cbhq/cds-web' },
          ],
        },
        {
          type: 'category',
          label: 'Contributing',
          items: [
            {
              type: 'link',
              href: 'https://github.cbhq.net/frontend/cds/tree/master/docs',
              label: 'Engineering',
            },
            { type: 'doc', id: 'contributing/design', label: 'Design' },
          ],
        },
        'resources/release',
        { type: 'doc', id: 'guides/migration/overview', label: 'Migration Guides' },
        'cds/support',
      ],
    },
  ],
};
