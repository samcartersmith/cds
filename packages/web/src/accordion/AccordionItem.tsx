import React, { memo } from 'react';
import { useAccordionParent } from '@cbhq/cds-common/accordion/AccordionParentContext';
import { accordionMinWidth } from '@cbhq/cds-common/tokens/accordion';
import type { AccordionItemBaseProps } from '@cbhq/cds-common/types';

import { VStack } from '../layout';

import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel, AccordionPanelProps } from './AccordionPanel';

export type AccordionItemProps = {
  headerRef?: React.RefObject<HTMLButtonElement>;
  panelRef?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
} & AccordionItemBaseProps &
  Pick<AccordionPanelProps, 'maxHeight'>;

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
    maxHeight,
    style,
  }: AccordionItemProps) => {
    const { activeKey } = useAccordionParent();
    const collapsed = activeKey !== itemKey;

    return (
      <VStack minWidth={accordionMinWidth} style={style} testID={testID}>
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
          maxHeight={maxHeight}
          testID={testID && `${testID}-panel`}
        >
          {children}
        </AccordionPanel>
      </VStack>
    );
  },
);
