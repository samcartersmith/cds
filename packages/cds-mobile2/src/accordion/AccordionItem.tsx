import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { useAccordionContext } from '@cbhq/cds-common2/accordion/AccordionProvider';
import { accordionMinWidth } from '@cbhq/cds-common2/tokens/accordion';
import type { AccordionItemBaseProps } from '@cbhq/cds-common2/types';

import { VStack } from '../layout';

import { AccordionHeader } from './AccordionHeader';
import { AccordionPanel } from './AccordionPanel';

export type AccordionItemProps = {
  headerRef?: React.RefObject<View>;
  panelRef?: React.RefObject<View>;
} & AccordionItemBaseProps &
  Pick<ViewProps, 'style'>;

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
