import React, { ForwardedRef, forwardRef, memo } from 'react';
import { View } from 'react-native';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { useAccordionSpacing } from '@cbhq/cds-common/hooks/useAccordionSpacing';

import { Collapse } from '../collapse';

export type AccordionPanelProps = AccordionPanelBaseProps;

export const AccordionPanel = memo(
  forwardRef(
    ({ children, expanded, testID }: AccordionPanelProps, forwardedRef: ForwardedRef<View>) => {
      const maxHeight = useScaleConditional(accordionVisibleMaxHeight);
      const spacing = useAccordionSpacing();

      return (
        <Collapse
          expanded={expanded}
          maxHeight={maxHeight}
          testID={testID}
          ref={forwardedRef}
          {...spacing}
        >
          {children}
        </Collapse>
      );
    },
  ),
);
