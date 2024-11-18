import React from 'react';
import figma from '@figma/code-connect';

import { Link } from '../../../typography/Link';
import { Banner } from '../Banner';

figma.connect(
  Banner,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=17671-3736&m=dev',
  {
    imports: ["import { Banner } from '@cbhq/cds-web/alpha/banner/Banner';"],
    props: {
      startIcon: figma.enum('type', {
        info: 'info',
        promo: 'info',
        warning: 'warning',
        error: 'info',
      }),
      variant: figma.enum('type', {
        info: 'informational',
        promo: 'promotional',
        warning: 'warning',
        error: 'error',
      }),
      styleVariant: figma.enum('placement', {
        global: 'global',
        'in-line': 'inline',
        contextual: 'contextual',
      }),
      showDismiss: figma.boolean('show close'),
      primaryAction: figma.boolean('show actions', {
        true: figma.boolean('↳ show primary action', {
          true: <Link to="https://www.coinbase.com">Primary</Link>,
          false: undefined,
        }),
        false: undefined,
      }),
      secondaryAction: figma.boolean('show actions', {
        true: figma.boolean('↳ show secondary action', {
          true: <Link to="https://www.coinbase.com">Secondary</Link>,
          false: undefined,
        }),
        false: undefined,
      }),
      label: figma.boolean('show timestamp', {
        true: figma.textContent('timestamp'),
        false: undefined,
      }),
      text: figma.nestedProps('string.banner(alpha)', {
        title: figma.boolean('show title', {
          true: figma.textContent('title'),
          false: undefined,
        }),
        description: figma.boolean('show description', {
          true: figma.textContent('description'),
          false: undefined,
        }),
      }),
    },
    example: ({ text, ...props }) => (
      <Banner title={text.title} {...props}>
        {text.description}
      </Banner>
    ),
  },
);
