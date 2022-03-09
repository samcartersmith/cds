import React, { memo, forwardRef, ForwardedRef } from 'react';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { useAccordionSpacing } from '@cbhq/cds-common/hooks/useAccordionSpacing';

import { getAccordionHeaderId, getAccordionPanelId } from './utils';
import { Collapsible } from '../collapsible';

export type AccordionPanelProps = AccordionPanelBaseProps;

export const AccordionPanel = memo(
  forwardRef(
    (
      { children, collapsed = true, itemKey, testID }: AccordionPanelProps,
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const maxHeight = useScaleConditional(accordionVisibleMaxHeight);
      const spacing = useAccordionSpacing();

      return (
        <Collapsible
          collapsed={collapsed}
          testID={testID}
          maxHeight={maxHeight}
          ref={forwardedRef}
          {...spacing}
          // a11y guideline: https://www.w3.org/TR/wai-aria-practices/#accordion
          role="region"
          accessibilityLabelledBy={getAccordionHeaderId(itemKey)}
          id={getAccordionPanelId(itemKey)}
        >
          {children}
        </Collapsible>
      );
    },
  ),
);
