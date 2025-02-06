import React, { Children } from 'react';
import { AccordionParentProvider } from '@cbhq/cds-common2/accordion/AccordionParentContext';
import type { AccordionBaseProps } from '@cbhq/cds-common2/types/AccordionBaseProps';
import { join } from '@cbhq/cds-common2/utils/join';

import { useTheme } from '../hooks/useTheme';
import { Divider, VStack } from '../layout';

export type AccordionProps = AccordionBaseProps & { style?: React.CSSProperties };

export const Accordion = ({
  children,
  defaultActiveKey,
  onChange,
  testID,
  style,
}: AccordionProps) => {
  const { colorScheme } = useTheme();
  const dividerColor = colorScheme === 'light' ? 'bgLine' : 'bgLineHeavy';

  return (
    <AccordionParentProvider defaultActiveKey={defaultActiveKey} onChange={onChange}>
      <VStack style={style} testID={testID} width="100%">
        {join(Children.toArray(children), <Divider color={dividerColor} />)}
      </VStack>
    </AccordionParentProvider>
  );
};
