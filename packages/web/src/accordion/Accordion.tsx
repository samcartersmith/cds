import React, { Children } from 'react';
import { AccordionBaseProps, join } from '@cbhq/cds-common';
import { AccordionParentProvider } from '@cbhq/cds-common/accordion/AccordionParentContext';
import { useAccordionDividerColor } from '@cbhq/cds-common/hooks/useAccordionDividerColor';

import { Divider, VStack } from '../layout';

export type AccordionProps = AccordionBaseProps & { style?: React.CSSProperties };

export const Accordion = ({
  children,
  defaultActiveKey,
  onChange,
  testID,
  style,
}: AccordionProps) => {
  const dividerColor = useAccordionDividerColor();

  return (
    <AccordionParentProvider defaultActiveKey={defaultActiveKey} onChange={onChange}>
      <VStack style={style} testID={testID} width="100%">
        {join(Children.toArray(children), <Divider color={dividerColor} />)}
      </VStack>
    </AccordionParentProvider>
  );
};
