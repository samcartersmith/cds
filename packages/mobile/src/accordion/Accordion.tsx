import React, { Children, memo } from 'react';
import { ViewProps } from 'react-native';
import { AccordionBaseProps, join } from '@cbhq/cds-common';
import { AccordionParentProvider } from '@cbhq/cds-common/accordion/AccordionParentContext';
import { useAccordionDividerColor } from '@cbhq/cds-common/hooks/useAccordionDividerColor';

import { Divider, VStack } from '../layout';

export type AccordionProps = AccordionBaseProps & Pick<ViewProps, 'style'>;

export const Accordion = memo(
  ({ children, defaultActiveKey, onChange, testID, style }: AccordionProps) => {
    const dividerColor = useAccordionDividerColor();

    return (
      <AccordionParentProvider defaultActiveKey={defaultActiveKey} onChange={onChange}>
        <VStack style={style} testID={testID} width="100%">
          {join(Children.toArray(children), <Divider color={dividerColor} />)}
        </VStack>
      </AccordionParentProvider>
    );
  },
);
