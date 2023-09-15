import React, { memo, ReactNode, useMemo } from 'react';
import { usePreviousValue } from '@cbhq/cds-common/hooks/usePreviousValue';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { navigationBarMinHeight } from '@cbhq/cds-common/tokens/navigation';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { HStack } from '../alpha/HStack';
import { VStack } from '../alpha/VStack';
import { Collapsible } from '../collapsible/Collapsible';
import { Box } from '../layout';
import { ThemeProvider } from '../system/ThemeProvider';

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
      <ThemeProvider scale={DEFAULT_SCALE} display="contents">
        <VStack
          as="nav"
          position="sticky"
          top={0}
          left={0}
          right={0}
          background
          borderedBottom
          spacingHorizontal={2}
          minHeight={navigationBarMinHeight}
          spacingTop={2}
          gap={2}
          spacingBottom={bottom ? undefined : 2}
          zIndex={zIndex.navigation}
          width="100%"
          accessibilityLabel={accessibilityLabel}
        >
          <HStack alignItems="center" justifyContent="space-between" gap={2}>
            <HStack alignItems="center" justifyContent="flex-start" flexGrow={1} gap={0}>
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
      </ThemeProvider>
    );
  },
);

NavigationBar.displayName = 'NavigationBar';
