import React, { memo, RefObject } from 'react';
import { View } from 'react-native';
import { useAccordionParent } from '@cbhq/cds-common/accordion/AccordionParentContext';
import { accordionMinWidth } from '@cbhq/cds-common/tokens/accordion';
import type { AccordionItemBaseProps } from '@cbhq/cds-common/types';

import { VStack } from '../layout';

import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';

export type AccordionItemProps = {
  headerRef?: RefObject<View>;
  panelRef?: RefObject<View>;
} & AccordionItemBaseProps;

export const AccordionItem = memo(
  ({
    itemKey,
    title,
    subtitle,
    children,
    onPress,
    media,
    testID,
    headerRef,
    panelRef,
  }: AccordionItemProps) => {
    const { activeKey } = useAccordionParent();
    const collapsed = activeKey !== itemKey;

    return (
      <VStack minWidth={accordionMinWidth}>
        <AccordionHeader
          ref={headerRef}
          collapsed={collapsed}
          itemKey={itemKey}
          media={media}
          onPress={onPress}
          subtitle={subtitle}
          testID={testID && `${testID}-header`}
          title={title}
        />
        <AccordionPanel
          ref={panelRef}
          collapsed={collapsed}
          itemKey={itemKey}
          testID={testID && `${testID}-panel`}
        >
          {children}
        </AccordionPanel>
      </VStack>
    );
  },
);
