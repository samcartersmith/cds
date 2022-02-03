import React, { memo } from 'react';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import {
  accordionSpacing,
  accordionPanelMaxHeight,
} from '@cbhq/cds-common/accordions/accordionStyles';

import { Box } from '../layout';
import { getAccordionHeaderId, getAccordionPanelId } from './utils';
import { display } from '../styles/display';

export const AccordionPanel = memo(
  ({ children, expanded, itemKey, testID }: AccordionPanelBaseProps) => {
    return (
      <Box
        {...accordionSpacing.panel}
        role="region"
        dangerouslySetClassName={expanded ? undefined : display.none}
        testID={testID}
        maxHeight={accordionPanelMaxHeight}
        overflow="auto"
        // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
        accessibilityLabelledBy={getAccordionHeaderId(itemKey)}
        id={getAccordionPanelId(itemKey)}
      >
        {children}
      </Box>
    );
  },
);
