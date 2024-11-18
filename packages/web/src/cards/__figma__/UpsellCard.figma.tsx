/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import figma from '@figma/code-connect';

import { usePaletteValueToRgbaString } from '../../color/usePaletteValueToRgbaString';
import { UpsellCard } from '../UpsellCard';

figma.connect(
  UpsellCard,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=10085%3A6279',
  {
    imports: [
      "import { usePaletteValueToRgbaString } from '@cbhq/cds-web/color/usePaletteValueToRgbaString';",
      "import { UpsellCard } from '@cbhq/cds-web/cards/UpsellCard';",
    ],
    props: {
      media: figma.instance('media'),
      // onDismissPress: figma.boolean('show dismiss', {
      //   true: () => {},
      //   false: undefined,
      // }),
      title: figma.nestedProps('string.upsell', {
        string: figma.enum('Ready-made', {
          Custom: figma.boolean('show title', { true: figma.string('↳ title'), false: undefined }),
          Quests: figma.boolean('show title', {
            true: figma.textContent('title'),
            false: undefined,
          }),
        }),
      }),
      description: figma.nestedProps('string.upsell', {
        string: figma.enum('Ready-made', {
          Custom: figma.string('description'),
          Quests: figma.textContent('description'),
        }),
      }),
      action: figma.children('Button'),
    },
    example: ({ title, description, ...props }) => {
      return (
        <UpsellCard
          {...props}
          dangerouslySetBackground={usePaletteValueToRgbaString('green60')}
          description={description.string}
          title={title.string}
        />
      );
    },
  },
);
