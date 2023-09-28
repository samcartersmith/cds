import React, { ForwardedRef, forwardRef, memo } from 'react';
import { View } from 'react-native';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';
import { useAccordionSpacing } from '@cbhq/cds-common/hooks/useAccordionSpacing';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';

import { Collapsible } from '../alpha/Collapsible';

export type AccordionPanelProps = AccordionPanelBaseProps;

export const AccordionPanel = memo(
  forwardRef(
    (
      { children, collapsed = true, testID }: AccordionPanelProps,
      forwardedRef: ForwardedRef<View>,
    ) => {
      const maxHeight = useScaleConditional(accordionVisibleMaxHeight);
      const spacing = useAccordionSpacing();

      return (
        <Collapsible
          collapsed={collapsed}
          maxHeight={maxHeight}
          testID={testID}
          ref={forwardedRef}
          {...spacing}
        >
          {children}
        </Collapsible>
      );
    },
  ),
);
