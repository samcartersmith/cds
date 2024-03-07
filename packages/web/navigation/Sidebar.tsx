import React, { Children, memo, ReactElement, ReactNode, useMemo } from 'react';
import { css } from 'linaria';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common/types';

import { useDimensions } from '../hooks/useDimensions';
import { Box, BoxProps, VStack } from '../layout';
import { deviceBreakpoints } from '../layout/breakpoints';
import { ThemeProvider } from '../system/ThemeProvider';

import { SidebarProvider } from './SidebarContext';

// STYLES
const breakpointObserverClassName = css`
  width: 100%;
  position: fixed;
  visibility: hidden;
  pointer-events: none;
  height: 0;
`;
const liClassName = css`
  list-style: none;
`;
const ulClassName = css`
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
`;

type BreakpointProps = {
  default: { collapsed: number; expanded: number };
  condensed: number;
};
const WIDTH: BreakpointProps = {
  default: { collapsed: 87, expanded: 240 },
  condensed: 88,
};
const BREAKPOINT_CONFIG = {
  breakpoints: { collapsed: 0, expanded: deviceBreakpoints.tablet },
  updateOnBreakpointChange: true,
};

export type SidebarProps = {
  /**
   * The logo to display
   * @default undefined
   */
  logo?: ReactElement | ((isCollapsed: boolean) => ReactNode);
  /**
   * Children are expected to be an array of SidebarItems
   * @default undefined
   */
  children: ReactNode[];
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
  renderEnd?: (isCollapsed: boolean) => ReactNode;
  variant?: 'default' | 'condensed';
} & SharedProps &
  SharedAccessibilityProps &
  Pick<BoxProps, 'width'>;

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
    const { ref, currentBreakpoint } = useDimensions(BREAKPOINT_CONFIG);
    /**
     * Calculates collapsed state which will be passed to the Sidebar Context Provider
     * Priority is as follows: First, respect what is set explicitly on SidebarItem,
     * Next, do what is set explicitly on Sidebar. And finally if autoCollapse is
     * set and we're within or outside the defined breakpoint, collapse or expand
     * */
    const computedCollapse = useMemo(
      () => collapsed || (autoCollapse && currentBreakpoint === 'collapsed'),
      [autoCollapse, collapsed, currentBreakpoint],
    );
    const computedWidth = useMemo(() => {
      if (variant === 'default')
        return computedCollapse ? WIDTH.default.collapsed : WIDTH.default.expanded;
      return WIDTH.condensed;
    }, [computedCollapse, variant]);
    const sidebarContext = useMemo(
      () => ({ collapsed: computedCollapse, variant }),
      [computedCollapse, variant],
    );

    const liWrappedChildren = useMemo(
      () => Children.map(children, (child) => <li className={liClassName}>{child}</li>),
      [children],
    );

    // only center logo and end content on condensed sidebar
    const logoStyles = useMemo(
      () =>
        (variant === 'default'
          ? { spacingStart: 1, spacingBottom: 4 }
          : { alignItems: 'center', spacingStart: 0, spacingBottom: 7 }) as BoxProps,
      [variant],
    );

    const renderEndStyles = useMemo(
      () => (variant === 'default' ? {} : { justifyContent: 'center' }) as BoxProps,
      [variant],
    );

    const listStyles = useMemo(
      () => (variant === 'default' ? { offsetStart: 0.5 } : {}) as BoxProps,
      [variant],
    );

    return (
      <ThemeProvider display="contents" scale={variant === 'default' ? DEFAULT_SCALE : 'xSmall'}>
        <SidebarProvider value={sidebarContext}>
          <VStack
            background
            borderedEnd
            accessibilityLabel={accessibilityLabel}
            as="nav"
            bottom="0"
            height="100%"
            justifyContent="space-between"
            left="0"
            minWidth={computedWidth}
            position="sticky"
            spacingBottom={variant === 'default' ? 2 : 3}
            spacingHorizontal={sidebarHorizontalSpacing}
            spacingTop={variant === 'default' ? 2 : 3}
            testID={testID}
            top="0"
            width={width ?? computedWidth}
            zIndex={zIndex.navigation}
            {...rest}
          >
            <VStack>
              {logo && (
                <VStack spacingTop={1} testID="sidebar-logo" {...logoStyles}>
                  {typeof logo === 'function' ? logo(!!computedCollapse) : logo}
                </VStack>
              )}
              <VStack as="ul" className={ulClassName} gap={0.5} {...listStyles}>
                {liWrappedChildren}
              </VStack>
            </VStack>
            {!!renderEnd && (
              <Box spacingTop={4} testID="sidebar-end" {...renderEndStyles}>
                {renderEnd(!!computedCollapse)}
              </Box>
            )}
          </VStack>
          <span ref={ref} className={breakpointObserverClassName} />
        </SidebarProvider>
      </ThemeProvider>
    );
  },
);

Sidebar.displayName = 'Sidebar';
