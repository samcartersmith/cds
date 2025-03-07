import React, { memo } from 'react';
import { useAccordionContext } from '@cbhq/cds-common2/accordion/AccordionProvider';
import { accordionMinWidth } from '@cbhq/cds-common2/tokens/accordion';
import type { AccordionItemBaseProps } from '@cbhq/cds-common2/types/AccordionBaseProps';

import { VStack } from '../layout/VStack';

import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel, AccordionPanelProps } from './AccordionPanel';

export type AccordionItemProps = {
  headerRef?: React.RefObject<HTMLButtonElement>;
  panelRef?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  /**
   * Callback function fired when the accordion item is pressed
   */
  onClick?: (key: string) => void;
} & Omit<AccordionItemBaseProps, 'onPress'> &
  Pick<AccordionPanelProps, 'maxHeight'>;

export const AccordionItem = memo(
  ({
    itemKey,
    title,
    subtitle,
    children,
    onClick,
    media,
    testID,
    headerRef,
    panelRef,
    maxHeight,
    style,
  }: AccordionItemProps) => {
    const { activeKey } = useAccordionContext();
    const collapsed = activeKey !== itemKey;

    return (
      <VStack minWidth={accordionMinWidth} style={style} testID={testID}>
        <AccordionHeader
          ref={headerRef}
          collapsed={collapsed}
          itemKey={itemKey}
          media={media}
          onClick={onClick}
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
