const { adopters } = require('./data/__generated__/adoption/adopters-sidebar');
const { deprecations } = require('./data/__generated__/deprecations/deprecations-sidebar');

/**
 * Please see the [website docs](../../docs/website.md) for more info
 *
 * The syntax below enables type checking and IDEs autocompletion.
 * @type {import('@cbhq/docusaurus-preset').SidebarsConfig}
 *
 */
const sidebars = {
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
      collapsed: false,
      customProps: {
        kbar: {
          pictogram: 'commerceNavigation',
          description: 'Get started with the Coinbase Design System.',
        },
      },
      items: [
        {
          type: 'doc',
          id: 'cds/getting-started/getting-started',
          customProps: {
            kbar: { description: 'A checklist of everything you need to get up and running.' },
          },
        },
        {
          type: 'doc',
          id: 'foundation/a11y',
          customProps: {
            kbar: { description: 'Make experiences that are accessible for everyone.' },
          },
        },
        {
          type: 'doc',
          id: 'foundation/color',
          customProps: { kbar: { description: 'Use tokens and themes to manage color.' } },
        },
        {
          type: 'doc',
          id: 'foundation/content',
          customProps: {
            kbar: {
              description:
                'Use language to build trust, convey information, and increase engagement with our customers.',
            },
          },
        },
        {
          type: 'doc',
          id: 'foundation/elevation',
          customProps: {
            kbar: {
              description: 'The relationship and importance of different components on the screen.',
            },
          },
        },
        {
          type: 'doc',
          id: 'foundation/layout/layout',
          customProps: { kbar: { description: 'Deliver clear, functional layouts.' } },
        },
        {
          type: 'doc',
          id: 'foundation/international',
          customProps: {
            kbar: {
              description:
                'Guidelines for creating equally usable, relevant, and meaningful experiences globally.',
            },
            tag: 'new',
          },
        },
        {
          type: 'category',
          label: 'Motion',
          customProps: {
            kbar: {
              description:
                'Bring the screen to life, guide users through complex experiences, and help move them forward.',
            },
          },
          items: [
            { type: 'doc', id: 'foundation/motion/brand-motion', label: 'Brand' },
            { type: 'doc', id: 'foundation/motion/product-motion-language', label: 'Product' },
            { type: 'doc', id: 'foundation/motion/timing', label: 'Timing' },
            { type: 'doc', id: 'foundation/motion/motion-handoff', label: 'Handoff' },
            'foundation/motion/a11y-motion',
          ],
        },
        {
          type: 'doc',
          id: 'foundation/scale',
          label: 'Scale',
          customProps: { kbar: { description: 'Design for different information densities.' } },
        },
        {
          type: 'doc',
          id: 'foundation/typography',
          label: 'Typography',
          customProps: {
            kbar: { description: 'Create clear hierarchies and organize information.' },
          },
        },
      ],
    },
    {
      type: 'category',
      label: 'Assets',
      customProps: {
        kbar: {
          pictogram: 'connectNavigation',
          description: 'Illustration, icons, and logos for building immersive experiences.',
        },
      },
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
              customProps: {
                kbar: {
                  description: 'Guide for non-illustrators to create and contribute back.',
                },
              },
            },
            {
              type: 'doc',
              id: 'foundation/iconography',
              label: 'Guidelines',
              customProps: {
                kbar: {
                  description: 'Symbols that are recognized immediately.',
                },
              },
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
              customProps: {
                kbar: {
                  description: 'Design guidance for using illustrations in product.',
                },
              },
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
            'components/icons/LogoMark/logo-mark',
            'components/icons/LogoWordmark/logo-wordmark',
            'components/icons/SubBrandLogoMark/sub-brand-logo-mark',
            'components/icons/SubBrandLogoWordmark/sub-brand-logo-wordmark',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Components',
      customProps: {
        kbar: {
          pictogram: 'rosettaNavigation',
          description: 'Design guidelines, figma resources and code components',
        },
      },
      items: [
        {
          type: 'category',
          label: 'Alert',
          items: [
            'components/overlays/Alert/alert',
            {
              type: 'doc',
              id: 'components/overlays/FullscreenAlert/fullscreen-alert',
            },
            'hooks/useAlert',
          ],
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
          type: 'doc',
          id: 'components/banner/banner',
          label: 'Banner',
        },
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
        },
        { type: 'doc', id: 'components/layout/Fallback/fallback', label: 'Fallback' },
        {
          type: 'category',
          label: 'Grid',
          items: [
            { type: 'doc', id: 'components/layout/Grid/grid', label: 'Grid' },
            {
              type: 'doc',
              id: 'components/layout/GridColumn/grid-column',
              label: 'GridColumn',
            },
          ],
        },
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
        { type: 'doc', id: 'components/dropdown/MenuItem/menu-item', label: 'MenuItem' },
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
          label: 'Motion',
          items: [
            'components/motion/ColorSurge/color-surge',
            'components/motion/Pulse/pulse',
            'components/motion/Shake/shake',
            'components/motion/AnimatedCaret/animated-caret',
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
              type: 'doc',
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
        {
          type: 'category',
          label: 'Remote Image',
          items: [
            { type: 'doc', id: 'components/media/RemoteImage/remote-image', label: 'Remote Image' },
            {
              type: 'doc',
              id: 'components/media/RemoteImageGroup/remote-image-group',
              label: 'Remote Image Group',
            },
          ],
        },
        { type: 'doc', id: 'components/controls/SearchInput/search-input', label: 'Search Input' },
        {
          type: 'doc',
          id: 'components/controls/SegmentedControl/segmented-control',
          label: 'Segmented Control',
          customProps: {
            tag: 'new',
          },
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
          customProps: {
            tag: 'new',
          },
          items: [
            'components/tables/Table/table',
            { type: 'doc', id: 'components/tables/TableBody/table-body', label: 'Table Body' },
            {
              type: 'doc',
              id: 'components/tables/TableCaption/table-caption',
              label: 'Table Caption',
              customProps: {
                tag: 'new',
              },
            },
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
        {
          type: 'doc',
          id: 'components/tag/tag',
          label: 'Tag',
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
      items: [
        {
          type: 'doc',
          id: 'patterns/overview',
          label: 'Overview',
          customProps: {
            tag: 'new',
          },
        },
        {
          type: 'category',
          label: 'Messaging',
          customProps: {
            tag: 'new',
          },
          items: [
            'patterns/messaging/overview',
            {
              type: 'doc',
              id: 'patterns/messaging/error',
              label: 'Error',
              customProps: {
                tag: 'new',
              },
            },
            'patterns/messaging/informational',
            {
              type: 'doc',
              id: 'patterns/messaging/success',
              label: 'Success',
              customProps: {
                tag: 'new',
              },
            },
            {
              type: 'doc',
              id: 'patterns/messaging/warning',
              label: 'Warning',
              customProps: {
                tag: 'new',
              },
            },
          ],
        },
        {
          type: 'doc',
          id: 'patterns/empty-states',
          label: 'Empty States',
          customProps: {
            tag: 'new',
          },
        },
        {
          type: 'doc',
          id: 'patterns/forms',
          label: 'Forms',
          customProps: {
            tag: 'new',
          },
        },
        'patterns/loading-states',
        {
          type: 'doc',
          id: 'patterns/disclosures',
          label: 'Disclosures',
          customProps: {
            tag: 'new',
          },
        },
      ],
      customProps: {
        kbar: {
          pictogram: 'participateNavigation',
          description: 'How pieces work together in your experiences.',
        },
      },
    },
    {
      type: 'category',
      label: 'Recipes',
      customProps: {
        kbar: {
          pictogram: 'earnNavigation',
          description: 'Examples of complex CDS compositions to build off of.',
        },
      },
      items: [
        { type: 'doc', id: 'recipes/sparkline-interactive', label: 'Asset Chart' },
        { type: 'doc', id: 'partnerships/AppSwitcher/app-switcher', label: 'App Switcher' },
        { type: 'doc', id: 'partnerships/UserSwitcher/user-switcher', label: 'User Switcher' },
        {
          type: 'doc',
          id: 'recipes/navigation',
          label: 'Navigation',
          customProps: {
            kbar: {
              description: 'Compose a system of Navigation components.',
            },
          },
        },
      ],
    },
    {
      type: 'category',
      label: 'Abstract Components',
      customProps: {
        kbar: {
          pictogram: 'walletNavigation',
          description: 'Abstractions that are UI agnostic.',
        },
      },
      items: [
        {
          type: 'category',
          label: 'BreakpointsProvider',
          items: [
            {
              type: 'doc',
              label: 'BreakpointsProvider',
              id: 'components/system/BreakpointsProvider/breakpoints-provider',
            },
            'hooks/useBreakpoints',
          ],
        },
        {
          type: 'category',
          label: 'BrowserOnly',
          items: [
            {
              type: 'doc',
              label: 'BrowserOnly',
              id: 'components/system/BrowserOnly/browser-only',
            },
            'hooks/useIsBrowser',
            'hooks/useHasMounted',
          ],
        },
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
          type: 'doc',
          id: 'components/system/PatternTag/pattern-tag',
          label: 'PatternTag',
          customProps: {
            tag: 'new',
          },
        },
        {
          type: 'category',
          label: 'PortalProvider',
          items: [
            {
              type: 'doc',
              label: 'Provider',
              id: 'components/overlays/PortalProvider/portal-provider',
            },
            'hooks/useOverlay',
          ],
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
            'hooks/useThemeProviderStyles/useThemeProviderStyles',
            'hooks/useAccessibleForeground',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Hooks',
      customProps: {
        kbar: {
          description: 'Useful hooks for building experiences with CDS.',
        },
      },
      items: [
        'hooks/useAccessibleForeground',
        'hooks/useAlert',
        'hooks/useBreakpoints',
        'hooks/useDeviceSpectrum',
        'hooks/useEventHandler',
        'hooks/useHasMounted',
        'hooks/useIsBrowser',
        'hooks/useModal',
        'hooks/useOverlay',
        'hooks/usePalette',
        'hooks/usePaletteConfig',
        'hooks/usePaletteValueToRgbaString',
        'hooks/usePreviousValue',
        'hooks/useScaleConditional',
        'hooks/useSort',
        'hooks/useSparklinePath',
        'hooks/useSpectrum',
        'hooks/useSpectrumConditional',
        'hooks/useToast',
        'hooks/useToggler',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      customProps: {
        kbar: {
          pictogram: 'pluginBrowser',
          description: 'Everything you need to work with CDS.',
        },
      },
      items: [
        {
          type: 'category',
          label: 'Adoption',
          items: [
            { type: 'doc', id: 'adoption-tracker-overview', label: 'Overview' },
            { type: 'doc', id: 'historical-adoption', label: 'Historical Tracker Data' },
            ...adopters,
          ],
        },
        { type: 'doc', id: 'a11y-report', label: 'Accessibility Tracker' },
        {
          type: 'category',

          label: 'Changelog',
          items: [
            { type: 'doc', id: 'changelog/cds-migrator', label: '@cbhq/cds-migrator' },
            { type: 'doc', id: 'changelog/common', label: '@cbhq/cds-common' },
            { type: 'doc', id: 'changelog/d3', label: '@cbhq/d3' },
            {
              type: 'doc',
              id: 'changelog/docusaurus-plugin-kbar',
              label: '@cbhq/docusaurus-plugin-kbar',
            },
            { type: 'doc', id: 'changelog/docusaurus-theme', label: '@cbhq/docusaurus-theme' },
            { type: 'doc', id: 'changelog/fonts', label: '@cbhq/cds-fonts' },
            { type: 'doc', id: 'changelog/icons', label: '@cbhq/cds-icons' },
            { type: 'doc', id: 'changelog/illustrations', label: '@cbhq/cds-illustrations' },
            { type: 'doc', id: 'changelog/lottie-files', label: '@cbhq/cds-lottie-files' },
            { type: 'doc', id: 'changelog/mobile', label: '@cbhq/cds-mobile' },
            { type: 'doc', id: 'changelog/utils', label: '@cbhq/cds-utils' },
            { type: 'doc', id: 'changelog/web', label: '@cbhq/cds-web' },
            { type: 'doc', id: 'changelog/web-overlays', label: '@cbhq/cds-web-overlays' },
            {
              type: 'doc',
              id: 'changelog/mobile-visualization',
              label: '@cbhq/mobile-visualization',
            },
            { type: 'doc', id: 'changelog/web-visualization', label: '@cbhq/web-visualization' },
            {
              type: 'doc',
              id: 'changelog/ui-mobile-playground',
              label: '@cbhq/ui-mobile-playground',
            },
            {
              type: 'doc',
              id: 'changelog/ui-scorecard',
              label: '@cbhq/ui-scorecard',
            },
          ],
        },
        'resources/contribution',
        'resources/release',
        {
          type: 'category',
          label: 'Migration Guides',
          items: [
            { type: 'doc', id: 'guides/migration/overview', label: 'Overview' },
            {
              type: 'category',
              label: 'Web and Mobile',
              items: [
                { type: 'doc', id: 'guides/migration/web-and-mobile/5-0-0', label: '5.0.0' },
                { type: 'doc', id: 'guides/migration/web-and-mobile/4-0-0', label: '4.0.0' },
                { type: 'doc', id: 'guides/migration/web-and-mobile/3-0-0', label: '3.0.0' },
                { type: 'doc', id: 'guides/migration/web-and-mobile/0-41-0', label: '0.41.0' },
              ],
            },
            {
              type: 'category',
              label: 'Icons',
              items: [{ type: 'doc', id: 'guides/migration/icons/2-0-0', label: '2.0.0' }],
            },
            {
              type: 'category',
              label: 'Illustrations',
              items: [{ type: 'doc', id: 'guides/migration/illustrations/2-0-0', label: '2.0.0' }],
            },
          ],
        },
        'cds/support',
        {
          type: 'category',
          label: 'Deprecations',
          items: [
            { type: 'doc', id: 'resources/deprecations/overview', label: 'Overview' },
            ...deprecations,
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
