import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common2/animation/accordion';
import { accordionSpacing } from '@cbhq/cds-common2/tokens/accordion';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common2/types';

import { Collapsible } from '../collapsible/Collapsible';

export type AccordionPanelProps = AccordionPanelBaseProps;

export const AccordionPanel = memo(
  forwardRef(
    (
      { children, collapsed = true, testID }: AccordionPanelProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      return (
        <Collapsible
          ref={forwardedRef}
          collapsed={collapsed}
          maxHeight={accordionVisibleMaxHeight}
          testID={testID}
          {...accordionSpacing}
        >
          {children}
        </Collapsible>
      );
    },
  ),
);
