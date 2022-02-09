import React, { memo } from 'react';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionSpacing } from '@cbhq/cds-common/accordions/accordionStyles';

import { Box } from '../layout';

export const AccordionPanel = memo(({ children, expanded, testID }: AccordionPanelBaseProps) => {
  if (!expanded) return null;

  return (
    <Box testID={testID} {...accordionSpacing.panel}>
      {children}
    </Box>
  );
});
