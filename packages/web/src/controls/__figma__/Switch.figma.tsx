import React from 'react';
import figma from '@figma/code-connect';

import { Switch } from '../Switch';

figma.connect(
  Switch,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=155%3A9924',
  {
    imports: ["import { Switch } from '@cbhq/cds-web/controls/Switch';"],
    variant: { 'show label': true },
    props: {
      children: figma.string('label'),
      checked: figma.boolean('checked'),
      disabled: figma.boolean('disabled'),
    },
    example: ({ children, ...props }) => <Switch {...props}>{children}</Switch>,
  },
);

figma.connect(
  Switch,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=155%3A9924',
  {
    imports: ["import { Switch } from '@cbhq/cds-web/controls/Switch';"],
    variant: { 'show label': false },
    props: {
      checked: figma.boolean('checked'),
      disabled: figma.boolean('disabled'),
    },
    example: (props) => <Switch {...props} />,
  },
);
