module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: ['introduction/overview', 'introduction/principles', 'introduction/getting-started'],
    },
    {
      type: 'category',
      label: 'Foundation',
      collapsed: true,
      items: [
        'foundation/color',
        'foundation/scale',
        'foundation/typography',
        'foundation/icons',
        'foundation/illustration',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: true,
      items: [
        'components/theme-provider',
        'components/text',
        'components/box',
        'components/flex',
        'components/grid',
        'components/icon',
        'components/button',
        'components/input',
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
          href: 'http://go/repo/blob/master/eng/shared/design-system',
        },
        'resources/roadmap',
        'resources/contributing',
      ],
    },
  ],
};
