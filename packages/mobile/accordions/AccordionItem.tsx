import React, { memo, RefObject } from 'react';
import { View } from 'react-native';
import { useAccordionParent } from '@cbhq/cds-common/accordions/AccordionParentContext';
import type { AccordionItemBaseProps } from '@cbhq/cds-common/types';

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
    const { activeKey } = useAccordionParent();
    const collapsed = activeKey !== itemKey;

    return (
      <VStack>
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
