const { components } = require('./data/sidebar/components');
const { adopters } = require('./data/sidebar/adopters');

// Removes unfinished categories from side bar
const sectionsToExcludeByLabel = new Set([]);

// Removes unfinished components from section in side bar
// Please alphabetize to avoid merge conflicts
const componentsToExcludeByLabel = new Set([
  'components/navigation/SidebarMoreMenu/sidebar-more-menu',
  'components/navigation/Switcher/switcher',
  'components/buttons/TileButton/tile-button',
  'components/buttons/NavigationIconButton/navigation-icon-button',
]);

// Filter sidebar components
const filteredComponents = components
  .filter((component) => !sectionsToExcludeByLabel.has(component.label))
  .map((componentJSON) => {
    const items = componentJSON.items.filter((path) => !componentsToExcludeByLabel.has(path));

    return {
      ...componentJSON,
      items,
    };
  });

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'CDS',
      collapsed: false,
      items: [
        'cds/overview',
        'cds/whats-happening',
        'cds/getting-started',
        'cds/support',
        {
          type: 'category',
          label: 'Designers guide',
          collapsed: true,
          items: [
            'cds/designers-guide/intro',
            'cds/designers-guide/usage',
            'cds/designers-guide/customization',
            'cds/designers-guide/handoff',
            'cds/designers-guide/going-beyond-cds',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Foundation',
      collapsed: true,
      items: [
        'foundation/overview',
        'foundation/a11y',
        'foundation/color',
        'foundation/content',
        'foundation/elevation',
        'foundation/iconography',
        'foundation/creating-and-maintaining-iconography',
        'foundation/product-illustration',
        'foundation/layout',
        {
          type: 'category',
          label: 'Motion',
          collapsed: false,
          items: [
            'foundation/motion/product-motion-language',
            'foundation/motion/timing',
            'foundation/motion/motion-handoff',
            'foundation/motion/brand-motion',
          ],
        },
        'foundation/scale',
        'foundation/typography',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Messaging',
          collapsed: false,
          items: ['concepts/messaging/errors'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: true,
      items: filteredComponents,
    },
    {
      type: 'category',
      label: 'Hooks',
      collapsed: true,
      items: [
        'hooks/useAccessibleForeground',
        'hooks/usePalette',
        'hooks/usePaletteConfig',
        'hooks/usePaletteValueToRgbaString',
        'hooks/useScaleConditional',
        'hooks/useSparklinePath',
        'hooks/useDeviceSpectrum',
        'hooks/useSpectrum',
        'hooks/useSpectrumConditional',
        'hooks/useOverlay',
        'hooks/useModal',
        'hooks/useAlert',
        'hooks/useToast',
      ],
    },
    {
      type: 'category',
      label: 'Recipes',
      collapsed: true,
      items: [{ type: 'doc', id: 'recipes/navigation', label: 'Navigation' }],
    },
    {
      type: 'category',
      label: 'Partnerships',
      collapsed: true,
      items: ['partnerships/AppSwitcher/app-switcher', 'partnerships/UserSwitcher/user-switcher'],
    },
    {
      type: 'category',
      label: 'Adoption Guides',
      collapsed: true,
      items: [{ type: 'doc', id: 'guides/adoption', label: 'Overview' }],
    },
    {
      type: 'category',
      label: 'Adoption Tracker',
      collapsed: true,
      items: [{ type: 'doc', id: 'adoption-tracker-overview', label: 'Overview' }, ...adopters],
    },
    'a11y-report',
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      items: [
        {
          type: 'link',
          label: 'Figma',
          href: 'https://www.figma.com/files/657352101224507447/team/832671005685976359/Coinbase-Design-System',
        },
        {
          type: 'link',
          label: 'Github',
          href: 'https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system',
        },

        'resources/roadmap',
        {
          type: 'category',
          label: 'Contributing',
          collapsed: true,
          items: [
            { type: 'doc', id: 'contributing/engineering', label: 'Engineering Guide' },
            { type: 'doc', id: 'contributing/design', label: 'Design Guide' },
          ],
        },
        {
          type: 'category',
          label: 'Changelog',
          collapsed: true,
          items: [
            { type: 'doc', id: 'changelog/common', label: '@cbhq/cds-common' },
            { type: 'doc', id: 'changelog/fonts', label: '@cbhq/cds-fonts' },
            { type: 'doc', id: 'changelog/lottie-files', label: '@cbhq/cds-lottie-files' },
            { type: 'doc', id: 'changelog/mobile', label: '@cbhq/cds-mobile' },
            { type: 'doc', id: 'changelog/utils', label: '@cbhq/cds-utils' },
            { type: 'doc', id: 'changelog/web', label: '@cbhq/cds-web' },
          ],
        },
        'resources/release',
        /* Uncomment to enable CDS Code conventions in the side bar
        {
          type: 'category',
          label: 'Conventions',
          collapsed: true,
          items: [
            { type: 'doc', id: 'conventions/overview', label: 'Overview' },
            { type: 'doc', id: 'conventions/api-design', label: 'API Design' },
            { type: 'doc', id: 'conventions/composition', label: 'Composition' },
          ],
        },
         */
      ],
    },
  ],
};
