module.exports = {
  actions: [
    {
      id: 'figma',
      name: 'Figma Libraries',
      image: '/img/logos/figma.png',
      section: 'Resources',
    },
    {
      id: 'figma/primitives',
      name: 'Primitives',
      parent: 'figma',
      url: 'https://www.figma.com/file/ycnTtR0KoApUvyCUaDOJmH/TEST-DNU-CDS-Primitives-Library',
    },
    {
      id: 'figma/component-library',
      name: 'Components',
      parent: 'figma',
      url: 'https://www.figma.com/file/o4zRZPYzukVXYsWoiw0Vgh/TEST-DNU-CDS-Component-Library',
    },
    {
      id: 'figma/layouts',
      name: 'Layouts & Templates',
      parent: 'figma',
      url: 'https://www.figma.com/file/ycnTtR0KoApUvyCUaDOJmH/TEST-DNU-CDS-Primitives-Library',
    },
    {
      id: 'figma/sticker-sheet',
      name: 'Stickersheet',
      parent: 'figma',
      url: 'https://www.figma.com/file/ZMcheoKOLR0xInDQL3vPYs/TEST-DNU-CDS-Stickersheet',
    },
    {
      id: 'figma/design-intent',
      name: 'Design Intent',
      parent: 'figma',
      url: 'https://www.figma.com/file/VSZ5NrOoQA1LeFo5GFhL7L/TEST-DNU-CDS-Design-Intent-Library',
    },
    {
      id: 'github',
      name: 'Github',
      image: '/img/logos/github.png',
      section: 'Resources',
      url: 'https://github.cbhq.net/frontend/cds',
    },
    {
      id: 'office-hours',
      name: 'Office Hours Sign Up',
      subtitle: 'Tues & Thurs. (11am - 12pm PST)',
      image: '/img/logos/gcal.png',
      section: 'Resources',
      url: 'http://go/cds-help',
    },
  ],
};
