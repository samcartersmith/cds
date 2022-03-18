import React, { Children } from 'react';
import { AccordionBaseProps, join } from '@cbhq/cds-common';
import { AccordionParentProvider } from '@cbhq/cds-common/accordion/AccordionParentContext';
import { useAccordionDividerColor } from '@cbhq/cds-common/hooks/useAccordionDividerColor';

import { Divider, VStack } from '../layout';

export type AccordionProps = AccordionBaseProps;

export const Accordion = ({ children, defaultActiveKey, onItemPress, testID }: AccordionProps) => {
  const dividerColor = useAccordionDividerColor();

  return (
    <AccordionParentProvider defaultActiveKey={defaultActiveKey} onItemPress={onItemPress}>
      <VStack testID={testID} width="100%">
        {join(Children.toArray(children), <Divider color={dividerColor} />)}
      </VStack>
    </AccordionParentProvider>
  );
};
