import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common2/animation/accordion';
import { useAccordionSpacing } from '@cbhq/cds-common2/hooks/useAccordionSpacing';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common2/types';

import { Collapsible } from '../collapsible/Collapsible';

export type AccordionPanelProps = AccordionPanelBaseProps;

export const AccordionPanel = memo(
  forwardRef(
    (
      { children, collapsed = true, testID }: AccordionPanelProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const spacing = useAccordionSpacing();

      return (
        <Collapsible
          ref={forwardedRef}
          collapsed={collapsed}
          maxHeight={accordionVisibleMaxHeight}
          testID={testID}
          {...spacing}
        >
          {children}
        </Collapsible>
      );
    },
  ),
);
