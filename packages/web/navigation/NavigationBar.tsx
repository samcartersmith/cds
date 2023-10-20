import React, { memo, ReactNode, useMemo } from 'react';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import { navigationBarMinHeight } from '@cbhq/cds-common/tokens/navigation';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { HStack } from '../alpha/HStack';
import { VStack } from '../alpha/VStack';
import { Collapsible } from '../collapsible/Collapsible';
import { Box } from '../layout';

export type NavigationBarProps = {
  /**
   * Node (ie Back button) to display at the start of the nav bar
   * @default undefined
   */
  start?: ReactNode;
  /**
   * Node (icons, avatar, etc) to display at the end of the nav bar
   * @default undefined
   */
  end?: ReactNode;
  /**
   * The  bottom content. Use to render tabs
   * @default undefined
   */
  bottom?: ReactNode;
  /**
   * The middle content. Use the children to render the page title
   * @default undefined
   */
  children: NonNullable<ReactNode>;
  /**
   * Accessibility label for the nav bar
   */
  accessibilityLabel?: string;
};

export const NavigationBar = memo(
  ({
    start,
    children,
    end,
    bottom,
    accessibilityLabel = 'main navigation',
  }: NavigationBarProps) => {
    const prevStart = usePreviousValue<NavigationBarProps['start']>(start);
    const startNode = useMemo(() => (!start ? prevStart : start), [start, prevStart]);

    return (
      <VStack
        background
        borderedBottom
        accessibilityLabel={accessibilityLabel}
        as="nav"
        gap={2}
        left={0}
        minHeight={navigationBarMinHeight}
        position="sticky"
        right={0}
        spacingBottom={bottom ? undefined : 2}
        spacingHorizontal={2}
        spacingTop={2}
        top={0}
        width="100%"
        zIndex={zIndex.navigation}
      >
        <HStack alignItems="center" gap={2} justifyContent="space-between">
          <HStack alignItems="center" flexGrow={1} gap={0} justifyContent="flex-start">
            <Collapsible collapsed={!start} direction="horizontal">
              <Box spacingEnd={2}>{startNode}</Box>
            </Collapsible>
            <HStack alignItems="center" flexGrow={1} gap={1}>
              {children}
            </HStack>
          </HStack>
          {end}
        </HStack>
        {bottom}
      </VStack>
    );
  },
);

NavigationBar.displayName = 'NavigationBar';
