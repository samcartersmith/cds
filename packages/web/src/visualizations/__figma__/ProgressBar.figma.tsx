import React from 'react';
import figma from '@figma/code-connect';

import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=64-746&m=dev',
  {
    imports: [
      "import { ProgressBar } from '@cbhq/cds-web/visualizations/ProgressBar';",
      "import { ProgressBarWithFloatLabel } from '@cbhq/cds-web/visualizations/ProgressBarWithFloatLabel';",
    ],
    props: {
      weight: figma.enum('weight', {
        normal: 'normal',
        heavy: 'heavy',
        thin: 'thin',
      }),
      disabled: figma.boolean('disabled'),
      progress: figma.enum('progress', {
        '100%': 1,
        '75%': 0.75,
        '50%': 0.5,
        '25%': 0.25,
        '0%': 0,
      }),
      floatLabel: figma.enum('progress', {
        '100%': 100,
        '75%': 75,
        '50%': 50,
        '25%': 25,
        '0%': 0,
      }),
      labelPlacement: figma.enum('label', {
        none: undefined,
        above: 'above',
        below: 'below',
      }),
    },
    example: ({ floatLabel, progress, labelPlacement, ...props }) => (
      <ProgressBarWithFloatLabel
        label={floatLabel}
        labelPlacement={labelPlacement}
        progress={progress}
      >
        <ProgressBar progress={progress} {...props} />
      </ProgressBarWithFloatLabel>
    ),
  },
);
