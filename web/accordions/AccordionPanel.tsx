import React, { memo, forwardRef, ForwardedRef } from 'react';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';

import { getAccordionHeaderId, getAccordionPanelId } from './utils';
import { Collapse } from '../collapse';

export const AccordionPanel = memo(
  forwardRef(
    (
      { children, expanded, itemKey, testID }: AccordionPanelBaseProps,
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const maxHeight = useScaleConditional(accordionVisibleMaxHeight);

      return (
        <Collapse
          expanded={expanded}
          testID={testID}
          maxHeight={maxHeight}
          ref={forwardedRef}
          // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
          role="region"
          accessibilityLabelledBy={getAccordionHeaderId(itemKey)}
          id={getAccordionPanelId(itemKey)}
        >
          {children}
        </Collapse>
      );
    },
  ),
);
