import React, { Children, memo } from 'react';
import { ViewProps } from 'react-native';
import { AccordionBaseProps, join } from '@cbhq/cds-common2';
import { AccordionParentProvider } from '@cbhq/cds-common2/accordion/AccordionParentContext';

import { Divider, VStack } from '../layout';

export type AccordionProps = AccordionBaseProps & Pick<ViewProps, 'style'>;

export const Accordion = memo(
  ({ children, defaultActiveKey, onChange, testID, style }: AccordionProps) => {
    return (
      <AccordionParentProvider defaultActiveKey={defaultActiveKey} onChange={onChange}>
        <VStack style={style} testID={testID} width="100%">
          {join(Children.toArray(children), <Divider color="bgLineHeavy" />)}
        </VStack>
      </AccordionParentProvider>
    );
  },
);
