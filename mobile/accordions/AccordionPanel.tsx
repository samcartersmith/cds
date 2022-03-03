import React, { ForwardedRef, forwardRef, memo } from 'react';
import { View } from 'react-native';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';

import { Collapse } from '../collapse';

export type AccordionProps = AccordionPanelBaseProps & { defaultExpanded: boolean };

export const AccordionPanel = memo(
  forwardRef(({ children, ...props }: AccordionProps, forwardedRef: ForwardedRef<View>) => {
    const maxHeight = useScaleConditional(accordionVisibleMaxHeight);

    return (
      <Collapse {...props} maxHeight={maxHeight} ref={forwardedRef}>
        {children}
      </Collapse>
    );
  }),
);
