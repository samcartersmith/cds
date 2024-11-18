import React from 'react';
import figma from '@figma/code-connect';

import { Link } from '../Link';

figma.connect(
  Link,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=324-14982&m=dev',
  {
    imports: ["import { Link } from '@cbhq/cds-mobile/typography/Link';"],
    props: {
      children: figma.string('string'),
      color: figma.enum('variant', {
        primary: 'primary',
        foreground: 'foreground',
        negativeForeground: 'negativeForeground',
      }),
      variant: figma.enum('textstyle', {
        title1: 'title1',
        title2: 'title2',
        title3: 'title3',
        headline: 'headline',
        body: 'body',
        label1: 'label1',
        label2: 'label2',
        caption: 'caption',
        legal: 'legal',
      }),
      underline: figma.boolean('underline'),
    },
    example: ({ children, ...props }) => <Link {...props}>{children}</Link>,
  },
);
