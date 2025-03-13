import React, { memo } from 'react';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { zIndex } from '@cbhq/cds-common2/tokens/zIndex';

import { Collapsible } from '../collapsible/Collapsible';
import { Box, HStack, VStack } from '../layout';

export type NavigationBarProps = {
  /**
   * Node (ie Back button) to display at the start of the nav bar
   * @default undefined
   */
  start?: React.ReactNode;
  /**
   * Node (icons, avatar, etc) to display at the end of the nav bar
   * @default undefined
   */
  end?: React.ReactNode;
  /**
   * The  bottom content. Use to render tabs
   * @default undefined
   */
  bottom?: React.ReactNode;
  /**
   * The middle content. Use the children to render the page title
   * @default undefined
   */
  children: React.ReactNode;
  /**
   * Accessibility label for the nav bar
   */
  accessibilityLabel?: string;
  /**
   * @default 2
   * */
  paddingX?: ThemeVars.Space;
  /**
   * @default 2
   * */
  paddingTop?: ThemeVars.Space;
  /**
   * @default 2
   * */
  paddingBottom?: ThemeVars.Space;
  /**
   * Disable the `overflow: hidden` style from being injected to the child Collapsible component
   * @default undefined
   * */
  dangerouslyDisableOverflowHidden?: boolean;
};

export const NavigationBar = memo(
  ({
    start,
    children,
    end,
    bottom,
    accessibilityLabel = 'main navigation',
    paddingX = 2,
    paddingTop = 2,
    paddingBottom = bottom ? undefined : 2,
    dangerouslyDisableOverflowHidden,
  }: NavigationBarProps) => {
    return (
      <VStack
        borderedBottom
        accessibilityLabel={accessibilityLabel}
        as="nav"
        background="bg"
        gap={2}
        left={0}
        paddingBottom={paddingBottom}
        paddingTop={paddingTop}
        paddingX={paddingX}
        position="sticky"
        right={0}
        top={0}
        width="100%"
        zIndex={zIndex.navigation}
      >
        <HStack alignItems="center" gap={2} justifyContent="space-between">
          <HStack alignItems="center" flexGrow={1} gap={0} justifyContent="flex-start">
            <Collapsible
              collapsed={!start}
              dangerouslyDisableOverflowHidden={dangerouslyDisableOverflowHidden}
              direction="horizontal"
            >
              <Box paddingEnd={2}>{start}</Box>
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
