import React, { memo } from 'react';
import type { AccordionItemBaseProps } from '@cbhq/cds-common/types';
import { useAccordionParent } from '@cbhq/cds-common/accordions/AccordionParentContext';

import { VStack } from '../layout';
import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';

export type AccordionItemProps = AccordionItemBaseProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const AccordionItem = memo(
  ({ itemKey, title, subtitle, children, onPress, media, testID }: AccordionItemProps) => {
    const { activeKey } = useAccordionParent();
    const expanded = activeKey === itemKey;

    return (
      <VStack testID={testID}>
        <AccordionHeader
          itemKey={itemKey}
          media={media}
          title={title}
          subtitle={subtitle}
          onPress={onPress}
          expanded={expanded}
          testID={testID && `${testID}-header`}
        />
        <AccordionPanel expanded={expanded} itemKey={itemKey} testID={testID && `${testID}-panel`}>
          {children}
        </AccordionPanel>
      </VStack>
    );
  },
);
