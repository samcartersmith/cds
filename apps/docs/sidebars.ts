import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'home/home',
      label: `CDS`, // This is hidden, but docusaurus does not allow empty label
      customProps: { hidden: true },
    },
    {
      type: 'category',
      label: 'Get started',
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/api-overview',
        'getting-started/theming',
        'getting-started/styling',
        'getting-started/templates',
      ],
      customProps: {
        icon: 'compass',
        kbar: {
          icon: 'compass',
          description: 'A checklist of everything you need to get up and running',
        },
      },
    },
    {
      type: 'category',
      label: 'Components',
      customProps: {
        icon: 'newsfeed',
        kbar: {
          description: 'Design guidelines, figma resources and code components',
        },
      },
      items: [
        {
          type: 'category',
          label: 'Layout',
          items: [
            {
              type: 'doc',
              id: 'components/layout/accordion',
              label: 'Accordion',
            },
            {
              type: 'doc',
              id: 'components/layout/Box/box',
              label: 'Box',
            },
            {
              type: 'doc',
              id: 'components/layout/buttonGroup',
              label: 'ButtonGroup',
            },
            {
              type: 'doc',
              id: 'components/layout/Collapsible/collapsible',
              label: 'Collapsible',
            },
            { type: 'doc', id: 'components/layout/divider', label: 'Divider' },
            {
              type: 'doc',
              id: 'components/layout/dropdown',
              label: 'Dropdown',
            },
            { type: 'doc', id: 'components/layout/grid', label: 'Grid' },
            { type: 'doc', id: 'components/layout/HStack/hStack', label: 'HStack' },
            {
              type: 'doc',
              id: 'components/layout/multiContentModule',
              label: 'MultiContentModule',
            },
            { type: 'doc', id: 'components/layout/spacer', label: 'Spacer' },
            { type: 'doc', id: 'components/layout/vStack', label: 'VStack' },
          ],
        },
        {
          type: 'category',
          label: 'Typography',
          items: [
            { type: 'doc', id: 'components/typography/link', label: 'Link' },
            { type: 'doc', id: 'components/typography/tag', label: 'Tag' },
            { type: 'doc', id: 'components/typography/text', label: 'Text' },
          ],
        },
        {
          type: 'category',
          label: 'Inputs',
          items: [
            { type: 'doc', id: 'components/inputs/button', label: 'Button' },
            {
              type: 'doc',
              id: 'components/inputs/checkbox',
              label: 'Checkbox',
            },
            {
              type: 'doc',
              id: 'components/inputs/iconButton',
              label: 'IconButton',
            },
            {
              type: 'doc',
              id: 'components/inputs/interactable',
              label: 'Interactable',
            },
            { type: 'doc', id: 'components/inputs/numpad', label: 'Numpad' },
            {
              type: 'doc',
              id: 'components/inputs/pressable',
              label: 'Pressable',
            },
            {
              type: 'doc',
              id: 'components/inputs/pressableOpacity',
              label: 'PressableOpacity',
            },
            { type: 'doc', id: 'components/inputs/radio', label: 'Radio' },
            { type: 'doc', id: 'components/inputs/select', label: 'Select' },
            {
              type: 'doc',
              id: 'components/inputs/selectChip',
              label: 'SelectChip',
            },
            { type: 'doc', id: 'components/inputs/switch', label: 'Switch' },
            {
              type: 'doc',
              id: 'components/inputs/textInput',
              label: 'TextInput',
            },
          ],
        },
        {
          type: 'category',
          label: 'Media',
          items: [
            {
              type: 'doc',
              id: 'components/media/Avatar/avatar',
              label: 'Avatar',
            },
            {
              type: 'doc',
              id: 'components/media/heroSquare',
              label: 'HeroSquare',
            },
            { type: 'doc', id: 'components/media/icon', label: 'Icon' },
            {
              type: 'doc',
              id: 'components/media/pictogram',
              label: 'Pictogram',
            },
            {
              type: 'doc',
              id: 'components/media/remoteImage',
              label: 'RemoteImage',
            },
            { type: 'doc', id: 'components/media/spotIcon', label: 'SpotIcon' },
            {
              type: 'doc',
              id: 'components/media/spotRectangle',
              label: 'SpotRectangle',
            },
            {
              type: 'doc',
              id: 'components/media/spotSquare',
              label: 'SpotSquare',
            },
          ],
        },
        {
          type: 'category',
          label: 'Cards',
          items: [
            {
              type: 'doc',
              id: 'components/cards/ContainedAssetCard/containedAssetCard',
              label: 'ContainedAssetCard',
            },
            {
              type: 'doc',
              id: 'components/cards/contentCard',
              label: 'ContentCard',
            },
            {
              type: 'doc',
              id: 'components/cards/FloatingAssetCard/floatingAssetCard',
              label: 'FloatingAssetCard',
            },
            {
              type: 'doc',
              id: 'components/cards/NudgeCard/nudgeCard',
              label: 'NudgeCard',
            },
            {
              type: 'doc',
              id: 'components/cards/UpsellCard/upsellCard',
              label: 'UpsellCard',
            },
          ],
        },
        {
          type: 'category',
          label: 'Feedback',
          items: [
            { type: 'doc', id: 'components/feedback/banner', label: 'Banner' },
            {
              type: 'doc',
              id: 'components/feedback/fallback',
              label: 'Fallback',
            },
            {
              type: 'doc',
              id: 'components/feedback/overlays',
              label: 'Overlays',
            },
            {
              type: 'doc',
              id: 'components/feedback/Spinner/spinner',
              label: 'Spinner',
            },
          ],
        },
        {
          type: 'category',
          label: 'Overlay',
          items: [
            { type: 'doc', id: 'components/overlay/alert', label: 'Alert' },
            { type: 'doc', id: 'components/overlay/modal', label: 'Modal' },
            {
              type: 'doc',
              id: 'components/overlay/portalContext',
              label: 'PortalContext',
            },
            { type: 'doc', id: 'components/overlay/toast', label: 'Toast' },
            { type: 'doc', id: 'components/overlay/tooltip', label: 'Tooltip' },
          ],
        },
        {
          type: 'category',
          label: 'Navigation',
          items: [
            {
              type: 'doc',
              id: 'components/navigation/pageHeader',
              label: 'PageHeader',
            },
            {
              type: 'doc',
              id: 'components/navigation/segmentedTabs',
              label: 'SegmentedTabs',
            },
            {
              type: 'doc',
              id: 'components/navigation/sidebar',
              label: 'Sidebar',
            },
            {
              type: 'doc',
              id: 'components/navigation/tabNavigation',
              label: 'TabNavigation',
            },
            {
              type: 'doc',
              id: 'components/navigation/tabbedChips',
              label: 'TabbedChips',
            },
            { type: 'doc', id: 'components/navigation/tabs', label: 'Tabs' },
          ],
        },
        {
          type: 'category',
          label: 'Graphs',
          items: [
            {
              type: 'doc',
              id: 'components/graphs/sparkline',
              label: 'Sparkline',
            },
            {
              type: 'doc',
              id: 'components/graphs/sparklineGradient',
              label: 'SparklineGradient',
            },
            {
              type: 'doc',
              id: 'components/graphs/sparklineInteractive',
              label: 'SparklineInteractive',
            },
          ],
        },
        {
          type: 'category',
          label: 'Other',
          items: [
            { type: 'doc', id: 'components/other/DotCount/dot-count', label: 'DotCount' },
            {
              type: 'doc',
              id: 'components/other/DotStatusColor/dot-status-color',
              label: 'DotStatusColor',
            },
            {
              type: 'doc',
              id: 'components/other/DotSymbol/dot-symbol',
              label: 'DotSymbol',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Hooks',
      items: [
        {
          type: 'doc',
          id: 'hooks/introduction',
          label: 'Introduction',
        },
        {
          type: 'doc',
          id: 'hooks/useBreakpoints',
          label: 'useBreakpoints',
        },
        {
          type: 'doc',
          id: 'hooks/useClickOutside',
          label: 'useClickOutside',
        },
        {
          type: 'doc',
          id: 'hooks/useDimensions',
          label: 'useDimensions',
        },
        {
          type: 'doc',
          id: 'hooks/useHasMounted',
          label: 'useHasMounted',
        },
        {
          type: 'doc',
          id: 'hooks/useIsoEffect',
          label: 'useIsoEffect',
        },
        {
          type: 'doc',
          id: 'hooks/useMergeRefs',
          label: 'useMergeRefs',
        },
        {
          type: 'doc',
          id: 'hooks/usePreviousValue',
          label: 'usePreviousValue',
        },
        {
          type: 'doc',
          id: 'hooks/useRefMap',
          label: 'useRefMap',
        },
        {
          type: 'doc',
          id: 'hooks/useSpectrum',
          label: 'useSpectrum',
        },
        {
          type: 'doc',
          id: 'hooks/useScrollBlocker',
          label: 'useScrollBlocker',
        },
        {
          type: 'doc',
          id: 'hooks/useTriggerFocus',
          label: 'useTriggerFocus',
        },
      ],
      customProps: {
        icon: 'participate',
      },
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'doc',
          id: 'guides/introduction',
          label: 'Introduction',
        },
        {
          type: 'doc',
          id: 'guides/polymorphic-components',
          label: 'Polymorphic Components',
        },
        {
          type: 'doc',
          id: 'guides/integrate-with-build-tools',
          label: 'Integrate with Build Tools',
        },
        {
          type: 'doc',
          id: 'guides/build-new-components',
          label: 'Build New Components',
        },
        {
          type: 'doc',
          id: 'guides/contribute-guidelines',
          label: 'Contribute Guidelines',
        },
        {
          type: 'doc',
          id: 'guides/advanced-customization',
          label: 'Advanced Customization',
        },
      ],
      customProps: {
        icon: 'application',
      },
    },
  ],
};

export default sidebars;
