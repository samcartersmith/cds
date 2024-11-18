import React from 'react';
import figma from '@figma/code-connect';

import { ThemeProvider } from '../../system';
import { LogoWordmark } from '../LogoWordmark';

figma.connect(
  LogoWordmark,
  'https://www.figma.com/design/46lNmiV1z8I888My5kNq7R/%E2%9C%A8-Logos?node-id=1269-502',
  {
    imports: ["import { LogoWordmark } from '@cbhq/cds-web/icons/LogoWordmark';"],
    props: {
      foreground: figma.enum('color', {
        primary: undefined,
        foreground: true,
        'primary Foreground': undefined,
      }),
    },
    example: (props) => <LogoWordmark {...props} />,
  },
);

figma.connect(
  LogoWordmark,
  'https://www.figma.com/design/46lNmiV1z8I888My5kNq7R/%E2%9C%A8-Logos?node-id=1269-502',
  {
    imports: ["import { LogoWordmark } from '@cbhq/cds-web/icons/LogoWordmark';"],
    variant: { color: 'primary Foreground' },
    props: {},
    example: (props) => (
      <ThemeProvider spectrum="dark">
        <LogoWordmark foreground {...props} />
      </ThemeProvider>
    ),
  },
);
