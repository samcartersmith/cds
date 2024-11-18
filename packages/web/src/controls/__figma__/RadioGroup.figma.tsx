/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import React from 'react';
import figma from '@figma/code-connect';

import { RadioGroup } from '../RadioGroup';

figma.connect(
  RadioGroup,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=355-14414&m=dev',
  {
    imports: ["import { RadioGroup } from '@cbhq/cds-web/controls/RadioGroup';"],
    props: {
      name: figma.enum('type', {
        RadioGroup: 'radiogroup',
      }),
    },
    example: (props) => (
      <RadioGroup
        options={{
          label1: 'Label',
          label2: 'Label',
          label3: 'Label',
          label4: 'Label',
          label5: 'Label',
        }}
        value="label1"
        {...props}
      />
    ),
  },
);
