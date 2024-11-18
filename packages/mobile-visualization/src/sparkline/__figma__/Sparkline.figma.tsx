/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import figma from '@figma/code-connect';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';

import { Sparkline } from '../Sparkline';

figma.connect(
  Sparkline,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=320%3A15040',
  {
    imports: [
      "import { Sparkline } from '@cbhq/cds-mobile-visualization';",
      "import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';",
    ],
    example: () => {
      const data = [20, 30, 5, 45, 0];
      const path = useSparklinePath({ height: 200, width: 200, data });
      return <Sparkline color="auto" height={200} path={path} width={400} />;
    },
  },
);
