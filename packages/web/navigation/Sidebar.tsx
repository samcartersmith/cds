import React, { Children, memo, ReactElement, ReactNode, useMemo } from 'react';
import { css } from 'linaria';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common/types';

import { useDimensions } from '../hooks/useDimensions';
import { Box, VStack } from '../layout';
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

type BreakpointProps = { collapsed: number; expanded: number };
const WIDTH: BreakpointProps = { collapsed: 87, expanded: 240 };
const BREAKPOINT_CONFIG = {
  breakpoints: { collapsed: 0, expanded: deviceBreakpoints.tablet },
  updateOnBreakpointChange: true,
};

export type SidebarProps = {
  /**
   * The logo to display
   * @default undefined
   */
  logo?: ReactElement;
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
} & SharedProps &
  SharedAccessibilityProps;

export const Sidebar: React.FC<React.PropsWithChildren<SidebarProps>> = memo(
  ({
    logo,
    children,
    collapsed,
    autoCollapse,
    testID,
    renderEnd,
    accessibilityLabel = 'Sidebar',
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
    const computedWidth = useMemo(
      () => (computedCollapse ? WIDTH.collapsed : WIDTH.expanded),
      [computedCollapse],
    );
    const sidebarContext = useMemo(() => ({ collapsed: computedCollapse }), [computedCollapse]);

    const liWrappedChildren = useMemo(
      () => Children.map(children, (child) => <li className={liClassName}>{child}</li>),
      [children],
    );

    return (
      <ThemeProvider display="contents" scale={DEFAULT_SCALE}>
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
            spacingBottom={2}
            spacingHorizontal={sidebarHorizontalSpacing}
            spacingTop={2}
            testID={testID}
            top="0"
            width={computedWidth}
            zIndex={zIndex.navigation}
            {...rest}
          >
            <VStack>
              {logo && (
                <VStack spacingBottom={4} spacingStart={1} spacingTop={1}>
                  {logo}
                </VStack>
              )}
              <VStack as="ul" className={ulClassName} gap={0.5} offsetStart={0.5}>
                {liWrappedChildren}
              </VStack>
            </VStack>
            {!!renderEnd && <Box spacingTop={4}>{renderEnd(!!computedCollapse)}</Box>}
          </VStack>
          <span ref={ref} className={breakpointObserverClassName} />
        </SidebarProvider>
      </ThemeProvider>
    );
  },
);

Sidebar.displayName = 'Sidebar';
