const { components } = require('./data/sidebar/components');
const { adopters } = require('./data/sidebar/adopters');

// Removes unfinished categories from side bar
const sectionsToExcludeByLabel = new Set([]);

// Removes unfinished components from section in side bar
const componentsToExcludeByLabel = new Set([
  'components/controls/SelectInput/select-input',
  'components/cells/SelectOptionCell/select-option-cell',
  'components/overlays/Toast/toast',
  'components/visualizations/SparklineContainer/sparkline-container',
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
      label: 'Introduction',
      collapsed: false,
      items: [
        'introduction/overview',
        'introduction/principles',
        'introduction/getting-started',
        'introduction/support',
        {
          type: 'category',
          label: 'Designers guide',
          collapsed: true,
          items: [
            'introduction/designers-guide/intro',
            'introduction/designers-guide/usage',
            'introduction/designers-guide/customization',
            'introduction/designers-guide/handoff',
            'introduction/designers-guide/going-beyond-cds',
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
      label: 'Components',
      collapsed: true,
      items: filteredComponents,
    },
    {
      type: 'category',
      label: 'Frontier (CDS Update)',
      collapsed: true,
      items: [
        'frontier/overview',
        'frontier/typography',
        'frontier/button',
        'frontier/color',
        'frontier/faq',
      ],
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
      ],
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
        'resources/contributing',
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
