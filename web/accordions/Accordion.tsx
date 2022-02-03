import React, { Children } from 'react';
import { AccordionBaseProps, join } from '@cbhq/cds-common';
import { AccordionParentProvider } from '@cbhq/cds-common/accordions/AccordionParentContext';

import { VStack, Divider } from '../layout';

export type AccordionProps = AccordionBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Accordion = ({ children, defaultActiveKey, onItemPress, testID }: AccordionProps) => {
  return (
    <AccordionParentProvider defaultActiveKey={defaultActiveKey} onItemPress={onItemPress}>
      <VStack testID={testID}>{join(Children.toArray(children), <Divider />)}</VStack>
    </AccordionParentProvider>
  );
};
