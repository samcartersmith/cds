import React, { ForwardedRef, forwardRef, memo } from 'react';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';
import { useAccordionSpacing } from '@cbhq/cds-common/hooks/useAccordionSpacing';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import type { AccordionPanelBaseProps, DimensionValue } from '@cbhq/cds-common/types';

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
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const maxHeight = useScaleConditional(accordionVisibleMaxHeight);
      const spacing = useAccordionSpacing();

      return (
        <Collapsible
          ref={forwardedRef}
          collapsed={collapsed}
          maxHeight={maxHeightParam ?? maxHeight}
          testID={testID}
          {...spacing}
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
