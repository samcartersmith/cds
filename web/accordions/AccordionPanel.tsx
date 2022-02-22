import React, { memo } from 'react';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';

import { getAccordionHeaderId, getAccordionPanelId } from './utils';
import { Collapse } from '../collapse';

export const AccordionPanel = memo(
  ({ children, expanded, itemKey, testID }: AccordionPanelBaseProps) => {
    return (
      <Collapse
        expanded={expanded}
        testID={testID}
        maxHeight={accordionVisibleMaxHeight}
        // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
        role="region"
        accessibilityLabelledBy={getAccordionHeaderId(itemKey)}
        id={getAccordionPanelId(itemKey)}
      >
        {children}
      </Collapse>
    );
  },
);
