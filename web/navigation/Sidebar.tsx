import React, { memo, Children, cloneElement, ReactElement, useMemo } from 'react';

import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { SidebarItemProps } from './SidebarItem';
import { LogoMarkProps } from '../icons/LogoMark';
import { VStack, Box } from '../layout';

export type SidebarProps = {
  /**
   * The logo to display
   * @default undefined
   */
  logo: ReactElement<LogoMarkProps>;
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
      width={compact ? 87 : 240}
      spacingHorizontal={2}
      spacingBottom={2}
      spacingTop={gutter}
    >
      <Box spacingTop={0.5} spacingStart={1} spacingBottom={4}>
        {logo}
      </Box>
      <VStack gap={0.5} offsetStart={0.5}>
        {decoratedChildren}
      </VStack>
    </VStack>
  );
});

Sidebar.displayName = 'Sidebar';
