import React, { memo, ReactElement, ReactNode, useMemo } from 'react';
import { css } from 'linaria';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { SharedProps } from '@cbhq/cds-common/types';

import { useDimensions } from '../hooks/useDimensions';
import { VStack } from '../layout';
import { deviceBreakpoints } from '../layout/responsive';
import { ThemeProvider } from '../system/ThemeProvider';

import { SidebarProvider } from './SidebarContext';

const breakpointObserverClassName = css`
  width: 100%;
  position: fixed;
  visibility: hidden;
  pointer-events: none;
  height: 0;
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
  logo: ReactElement;
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
} & SharedProps;

export const Sidebar: React.FC<SidebarProps> = memo(
  ({ logo, children, collapsed, autoCollapse, testID }) => {
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

    return (
      <ThemeProvider scale={DEFAULT_SCALE} display="contents">
        <SidebarProvider value={sidebarContext}>
          <VStack
            as="nav"
            background
            borderedEnd
            height="100%"
            position="sticky"
            top="0"
            left="0"
            width={computedWidth}
            minWidth={computedWidth}
            spacingHorizontal={sidebarHorizontalSpacing}
            spacingBottom={2}
            spacingTop={2}
            zIndex={zIndex.navigation}
            testID={testID}
          >
            <VStack spacingTop={1} spacingStart={1} spacingBottom={4}>
              {logo}
            </VStack>
            <VStack gap={0.5} offsetStart={0.5} role="group">
              {children}
            </VStack>
          </VStack>
          <span className={breakpointObserverClassName} ref={ref} />
        </SidebarProvider>
      </ThemeProvider>
    );
  },
);

Sidebar.displayName = 'Sidebar';
