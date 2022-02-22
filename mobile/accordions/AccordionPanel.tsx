import React, { memo } from 'react';
import type { AccordionPanelBaseProps } from '@cbhq/cds-common/types';
import { accordionVisibleMaxHeight } from '@cbhq/cds-common/animation/accordion';

import { Collapse } from '../collapse';

export type AccordionProps = AccordionPanelBaseProps & { defaultExpanded: boolean };

export const AccordionPanel = memo(({ children, ...props }: AccordionProps) => {
  return (
    <Collapse {...props} maxHeight={accordionVisibleMaxHeight}>
      {children}
    </Collapse>
  );
});
