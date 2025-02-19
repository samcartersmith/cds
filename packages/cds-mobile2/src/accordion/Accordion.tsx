import React, { Children, memo } from 'react';
import { ViewProps } from 'react-native';
import { AccordionProvider } from '@cbhq/cds-common2/accordion/AccordionProvider';
import type { AccordionBaseProps } from '@cbhq/cds-common2/types/AccordionBaseProps';
import { join } from '@cbhq/cds-common2/utils/join';

import { Divider, VStack } from '../layout';

export type AccordionProps = AccordionBaseProps & Pick<ViewProps, 'style'>;

export const Accordion = memo(
  ({
    activeKey,
    children,
    defaultActiveKey,
    onChange,
    setActiveKey,
    testID,
    style,
  }: AccordionProps) => {
    return (
      <AccordionProvider
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        onChange={onChange}
        setActiveKey={setActiveKey}
      >
        <VStack style={style} testID={testID} width="100%">
          {join(Children.toArray(children), <Divider color="bgLineHeavy" />)}
        </VStack>
      </AccordionProvider>
    );
  },
);
