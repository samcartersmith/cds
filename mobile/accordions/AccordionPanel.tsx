import React, { ForwardedRef, forwardRef, memo } from 'react';
import { View } from 'react-native';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';

import { Collapse } from '../collapse';

export type AccordionProps = AccordionPanelBaseProps & { defaultExpanded: boolean };

export const AccordionPanel = memo(
  forwardRef(({ children, ...props }: AccordionProps, forwardedRef: ForwardedRef<View>) => {
    return (
      <Collapse {...props} maxHeight={accordionVisibleMaxHeight} ref={forwardedRef}>
        {children}
      </Collapse>
    );
  }),
);
