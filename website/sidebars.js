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
        'foundation/color',
        'foundation/iconography',
        'foundation/illustration',
        'foundation/scale',
        'foundation/typography',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: true,
      items: [
        'components/box',
        'components/button',
        'components/hstack',
        'components/icon-button',
        'components/icon',
        'components/lottie',
        'components/spacer',
        'components/text',
        'components/theme-provider',
        'components/vstack',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      items: [
        {
          type: 'link',
          label: 'Figma',
          href:
            'https://www.figma.com/files/657352101224507447/team/832671005685976359/Coinbase-Design-System',
        },
        {
          type: 'link',
          label: 'Github',
          href: 'https://github.cbhq.net/mono/repo/tree/master/eng/shared/design-system',
        },

        'resources/roadmap',
        'resources/contributing',
        'resources/release',
      ],
    },
  ],
};
