import React, { Children } from 'react';
import { AccordionProvider } from '@cbhq/cds-common2/accordion/AccordionProvider';
import type { AccordionBaseProps } from '@cbhq/cds-common2/types/AccordionBaseProps';
import { join } from '@cbhq/cds-common2/utils/join';

import { useTheme } from '../hooks/useTheme';
import { Divider, VStack } from '../layout';

export type AccordionProps = AccordionBaseProps & { style?: React.CSSProperties };

export const Accordion = ({
  activeKey,
  children,
  defaultActiveKey,
  onChange,
  setActiveKey,
  testID,
  style,
}: AccordionProps) => {
  const { colorScheme } = useTheme();
  const dividerColor = colorScheme === 'light' ? 'bgLine' : 'bgLineHeavy';

  return (
    <AccordionProvider
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      setActiveKey={setActiveKey}
    >
      <VStack style={style} testID={testID} width="100%">
        {join(Children.toArray(children), <Divider color={dividerColor} />)}
      </VStack>
    </AccordionProvider>
  );
};
