import React, { Children, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { zIndex } from '@cbhq/cds-common2/tokens/zIndex';
import type { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common2/types';

import { useDimensions } from '../hooks/useDimensions';
import { Box, type BoxBaseProps, VStack } from '../layout';
import { breakpoints } from '../styles/media';

import { SidebarProvider } from './SidebarContext';

// STYLES
const breakpointObserverStyle = css`
  width: 100%;
  position: fixed;
  visibility: hidden;
  pointer-events: none;
  height: 0;
`;
const liStyle = css`
  list-style: none;
`;
const ulStyle = css`
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
`;

type BreakpointProps = {
  default: { collapsed: number; expanded: number };
  condensed: number;
};
const sidebarWidth: BreakpointProps = {
  default: { collapsed: 87, expanded: 240 },
  condensed: 88,
};
const breakpointConfig = {
  breakpoints: { collapsed: 0, expanded: breakpoints.tablet },
  updateOnBreakpointChange: true,
};

export type SidebarProps = {
  /**
   * The logo to display
   * @default undefined
   */
  logo?: React.ReactElement | ((isCollapsed: boolean) => React.ReactNode);
  /**
   * Children are expected to be an array of SidebarItems
   * @default undefined
   */
  children: React.ReactNode[];
  /**
   * Use collapsed to show only the logo
   * @default false
   */
  collapsed?: boolean;
  /**
   * When set, the sidebar will auto collapse at or below the tablet breakpoint (currently 768px)
   * @default false
   */
  autoCollapse?: boolean;
  /**
   * This node will be fixed to the bottom of the sidebar
   * This is a render prop, and will provide the collapsed state
   * @default undefined
   */
  renderEnd?: (isCollapsed: boolean) => React.ReactNode;
  variant?: 'default' | 'condensed';
} & SharedProps &
  SharedAccessibilityProps &
  Pick<BoxBaseProps, 'width'>;

export const Sidebar: React.FC<React.PropsWithChildren<SidebarProps>> = memo(
  ({
    logo,
    children,
    collapsed,
    autoCollapse,
    testID,
    renderEnd,
    accessibilityLabel = 'Sidebar',
    width,
    variant = 'default',
    ...rest
  }) => {
    const { ref, currentBreakpoint } = useDimensions(breakpointConfig);
    /**
     * Calculates collapsed state which will be passed to the Sidebar Context Provider
     * Priority is as follows: First, respect what is set explicitly on SidebarItem,
     * Next, do what is set explicitly on Sidebar. And finally if autoCollapse is
     * set and we're within or outside the defined breakpoint, collapse or expand
     * */
    const computedCollapse =
      collapsed ?? (autoCollapse ? currentBreakpoint === 'collapsed' : false);
    const defaultWidth = computedCollapse
      ? sidebarWidth.default.collapsed
      : sidebarWidth.default.expanded;
    const computedWidth = variant === 'default' ? defaultWidth : sidebarWidth.condensed;

    const sidebarContext = useMemo(
      () => ({ collapsed: computedCollapse, variant }),
      [computedCollapse, variant],
    );

    const liWrappedChildren = useMemo(
      () => Children.map(children, (child) => <li className={liStyle}>{child}</li>),
      [children],
    );

    // only center logo and end content on condensed sidebar
    const logoContainerProps = useMemo(
      () =>
        ({
          paddingTop: 1,
          paddingStart: variant === 'default' ? 0 : 1,
          paddingBottom: 4,
          alignSelf: variant === 'default' ? undefined : 'center',
          alignItems: variant === 'default' ? undefined : 'center',
        } satisfies BoxBaseProps),
      [variant],
    );

    return (
      <SidebarProvider value={sidebarContext}>
        <VStack
          borderedEnd
          accessibilityLabel={accessibilityLabel}
          as="nav"
          background="bg"
          bottom="0"
          height="100%"
          justifyContent="space-between"
          left="0"
          minWidth={computedWidth}
          padding={2}
          position="sticky"
          testID={testID}
          top="0"
          width={width ?? computedWidth}
          zIndex={zIndex.navigation}
          {...rest}
        >
          <VStack>
            {logo && (
              <VStack {...logoContainerProps} testID="sidebar-logo">
                {typeof logo === 'function' ? logo(!!computedCollapse) : logo}
              </VStack>
            )}
            <VStack
              as="ul"
              className={ulStyle}
              gap={0.5}
              marginStart={variant === 'default' ? -0.5 : undefined}
            >
              {liWrappedChildren}
            </VStack>
          </VStack>
          {!!renderEnd && (
            <Box
              alignSelf={variant === 'default' ? 'flex-start' : 'center'}
              paddingTop={4}
              testID="sidebar-end"
            >
              {renderEnd(!!computedCollapse)}
            </Box>
          )}
        </VStack>
        <span ref={ref} className={breakpointObserverStyle} />
      </SidebarProvider>
    );
  },
);

Sidebar.displayName = 'Sidebar';
