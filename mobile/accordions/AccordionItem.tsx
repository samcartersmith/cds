import React, { memo, RefObject } from 'react';
import type { AccordionItemBaseProps } from '@cbhq/cds-common/types';
import { useAccordionParent } from '@cbhq/cds-common/accordions/AccordionParentContext';
import { View } from 'react-native';

import { VStack } from '../layout';
import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';

export type AccordionItemProps = {
  headerRef?: RefObject<View>;
  panelRef?: RefObject<View>;
} & AccordionItemBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
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
    const { activeKey, defaultActiveKey } = useAccordionParent();
    const expanded = activeKey === itemKey;
    const defaultExpanded = defaultActiveKey === itemKey;

    return (
      <VStack>
        <AccordionHeader
          itemKey={itemKey}
          media={media}
          title={title}
          subtitle={subtitle}
          onPress={onPress}
          expanded={expanded}
          testID={testID && `${testID}-header`}
          ref={headerRef}
        />
        <AccordionPanel
          defaultExpanded={defaultExpanded}
          expanded={expanded}
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
