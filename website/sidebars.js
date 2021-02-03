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
        'components/icon',
        'components/button',
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
        {
          type: 'link',
          label: 'Office hours',
          href:
            'https://docs.google.com/forms/d/e/1FAIpQLSeH1aUTyegkrycxq3PaufQzD8I6OOarlJfeni2z-MOLFxY4-A/viewform',
        },
        'resources/roadmap',
        'resources/contributing',
        'resources/release',
      ],
    },
  ],
};
