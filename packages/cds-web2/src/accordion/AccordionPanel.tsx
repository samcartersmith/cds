import React, { forwardRef, memo } from 'react';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common2/animation/accordion';
import { accordionSpacing } from '@cbhq/cds-common2/tokens/accordion';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common2/types/AccordionBaseProps';
import type { DimensionValue } from '@cbhq/cds-common2/types/DimensionStyles';

import { Collapsible } from '../collapsible';

import { getAccordionHeaderId, getAccordionPanelId } from './utils';

export type AccordionPanelProps = AccordionPanelBaseProps & { maxHeight?: DimensionValue };

export const AccordionPanel = memo(
  forwardRef(
    (
      {
        children,
        collapsed = true,
        itemKey,
        testID,
        maxHeight: maxHeightParam,
      }: AccordionPanelProps,
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
      return (
        <Collapsible
          ref={forwardedRef}
          collapsed={collapsed}
          maxHeight={maxHeightParam ?? accordionVisibleMaxHeight}
          testID={testID}
          {...accordionSpacing}
          // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
          accessibilityLabelledBy={getAccordionHeaderId(itemKey)}
          id={getAccordionPanelId(itemKey)}
          role="region"
        >
          {children}
        </Collapsible>
      );
    },
  ),
);
