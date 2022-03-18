import React, { memo, RefObject } from 'react';
import { useAccordionParent } from '@cbhq/cds-common/accordion/AccordionParentContext';
import { accordionMinWidth } from '@cbhq/cds-common/tokens/accordion';
import type { AccordionItemBaseProps } from '@cbhq/cds-common/types';

import { VStack } from '../layout';

import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';

export type AccordionItemProps = {
  headerRef?: RefObject<HTMLButtonElement>;
  panelRef?: RefObject<HTMLDivElement>;
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
      <VStack minWidth={accordionMinWidth} testID={testID}>
        <AccordionHeader
          itemKey={itemKey}
          media={media}
          title={title}
          subtitle={subtitle}
          onPress={onPress}
          collapsed={collapsed}
          testID={testID && `${testID}-header`}
          ref={headerRef}
        />
        <AccordionPanel
          collapsed={collapsed}
          itemKey={itemKey}
          testID={testID && `${testID}-panel`}
          ref={panelRef}
        >
          {children}
        </AccordionPanel>
      </VStack>
    );
  },
);
