import React, { memo, Children, cloneElement, ReactElement, useMemo } from 'react';

import { SidebarItemProps } from './SidebarItem';
import { VStack } from '../layout';

export const WIDTH = { default: 240, compact: 87 };

export type SidebarProps = {
  /**
   * The logo to display
   * @default undefined
   */
  logo: ReactElement;
  /**
   * Children are expected to be an array of SidebarItems
   * @default undefined
   */
  children: ReactElement<SidebarItemProps>[];
  /**
   * Use compact to show only the logo
   * @default false
   */
  compact?: boolean;
};

export const Sidebar: React.FC<SidebarProps> = memo(({ logo, children, compact }) => {
  const decoratedChildren = useMemo(
    () =>
      Children.map(children, (child) => {
        return child
          ? cloneElement(child, {
              compact: child.props?.compact ?? compact,
            })
          : null;
      }),
    [children, compact],
  );

  return (
    <VStack
      background
      borderedEnd
      height="100%"
      width={compact ? WIDTH.compact : WIDTH.default}
      minWidth={compact ? WIDTH.compact : WIDTH.default}
      spacingHorizontal={2}
      spacingBottom={2}
      spacingTop={2}
    >
      <VStack spacingTop={0.5} spacingStart={1} spacingBottom={4}>
        {logo}
      </VStack>
      <VStack gap={0.5} offsetStart={0.5}>
        {decoratedChildren}
      </VStack>
    </VStack>
  );
});

Sidebar.displayName = 'Sidebar';
