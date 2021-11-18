import React, { memo, ReactNode } from 'react';
import { HStack, VStack } from '../layout';

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
   * The middle content. Use the children to render the page title
   * @default undefined
   */
  children: NonNullable<ReactNode>;
};

export const NavigationBar = memo(({ start, children, end }: NavigationBarProps) => {
  return (
    <HStack
      background
      borderedBottom
      spacing={2}
      width="100%"
      minHeight={80} // TODO move this to some sizing tokens
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <HStack gap={2} alignItems="flex-start" justifyContent="flex-start">
        {start}
        <VStack>{children}</VStack>
      </HStack>
      {end}
    </HStack>
  );
});

NavigationBar.displayName = 'NavigationBar';
