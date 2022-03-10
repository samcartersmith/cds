import React, { Children, memo } from 'react';
import { AccordionBaseProps, join } from '@cbhq/cds-common';
import { AccordionParentProvider } from '@cbhq/cds-common/accordions/AccordionParentContext';
import { useAccordionDividerColor } from '@cbhq/cds-common/hooks/useAccordionDividerColor';

import { VStack, Divider } from '../layout';

export type AccordionProps = AccordionBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Accordion = memo(
  ({ children, defaultActiveKey, onItemPress, testID }: AccordionProps) => {
    const dividerColor = useAccordionDividerColor();

    return (
      <AccordionParentProvider defaultActiveKey={defaultActiveKey} onItemPress={onItemPress}>
        <VStack testID={testID} width="100%">
          {join(Children.toArray(children), <Divider color={dividerColor} />)}
        </VStack>
      </AccordionParentProvider>
    );
  },
);
