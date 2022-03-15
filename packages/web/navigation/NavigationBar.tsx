import React, { memo, ReactNode } from 'react';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { HStack, VStack } from '../layout';
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
};

export const NavigationBar = memo(({ start, children, end, bottom }: NavigationBarProps) => {
  return (
    <ThemeProvider scale={DEFAULT_SCALE} display="contents">
      <HStack
        as="nav"
        position="sticky"
        top={0}
        left={0}
        right={0}
        background
        borderedBottom
        spacingHorizontal={2}
        spacingTop={2}
        spacingBottom={bottom ? undefined : 2}
        width="100%"
        minHeight={80} // TODO move this to some sizing tokens
        alignItems="flex-start"
        justifyContent="space-between"
        zIndex={zIndex.navigation}
      >
        <VStack>
          <HStack gap={2} alignItems="flex-start" justifyContent="flex-start">
            {start}
            <VStack gap={2}>{children}</VStack>
          </HStack>
          {bottom}
        </VStack>
        {end}
      </HStack>
    </ThemeProvider>
  );
});

NavigationBar.displayName = 'NavigationBar';
