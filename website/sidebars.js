const { components } = require('./data/sidebar/components');
const { adopters } = require('./data/sidebar/adopters');

// useful mechanism to hide a component in the side bar while still uploading its docs.
// Unhide when the component is ready to go live
const componentsToExcludeByLabel = new Set(['Avatar']);

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
        'foundation/illustration',
        'foundation/layout',
        'foundation/motion',
        'foundation/scale',
        'foundation/typography',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: true,
      items: components.filter((component) => !componentsToExcludeByLabel.has(component.label)),
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
      label: 'Recipes',
      collapsed: true,
      items: ['recipes/cards', 'recipes/tables'],
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
