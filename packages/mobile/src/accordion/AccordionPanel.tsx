import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';
import { useAccordionSpacing } from '@cbhq/cds-common/hooks/useAccordionSpacing';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';

import { Collapsible } from '../collapsible/Collapsible';

export type AccordionPanelProps = AccordionPanelBaseProps;

export const AccordionPanel = memo(
  forwardRef(
    (
      { children, collapsed = true, testID }: AccordionPanelProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const maxHeight = useScaleConditional(accordionVisibleMaxHeight);
      const spacing = useAccordionSpacing();

      return (
        <Collapsible
          ref={forwardedRef}
          collapsed={collapsed}
          maxHeight={maxHeight}
          testID={testID}
          {...spacing}
        >
          {children}
        </Collapsible>
      );
    },
  ),
);
