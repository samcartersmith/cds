import React, { memo, Children, cloneElement, ReactElement, useMemo } from 'react';

import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { css } from 'linaria';
import { SidebarItemProps } from './SidebarItem';
import { VStack } from '../layout';
import { ThemeProvider } from '../system/ThemeProvider';
import { useDimensions } from '../hooks/useDimensions';
import { breakpoints } from '../layout/responsive';

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
  breakpoints: { collapsed: 0, expanded: breakpoints.tablet },
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
  children: ReactElement<SidebarItemProps>[];
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
};

export const Sidebar: React.FC<SidebarProps> = memo(
  ({ logo, children, collapsed, autoCollapse }) => {
    const { ref, currentBreakpoint } = useDimensions(BREAKPOINT_CONFIG);
    const computedCollapse = collapsed || (autoCollapse && currentBreakpoint === 'collapsed');
    const computedWidth = computedCollapse ? WIDTH.collapsed : WIDTH.expanded;

    /**
     * We'll decorate the SidebarItems (children) with the collapsed state.
     * Priority is as follows: First, respect what is set explicitly on SidebarItem,
     * Next, do what is set explicitly on Sidebar. And finally if autoCollapse is
     * set and we're within or outside the defined breakpoint, collapse or expand
     * */
    const decoratedChildren = useMemo(
      () =>
        Children.map(children, (child) => {
          const collapseChild = child.props?.collapsed ?? computedCollapse;

          return child
            ? cloneElement(child, {
                collapsed: collapseChild,
              })
            : null;
        }),
      [children, computedCollapse],
    );

    return (
      <ThemeProvider scale={DEFAULT_SCALE}>
        <VStack
          as="nav"
          background
          borderedEnd
          height="100%"
          width={computedWidth}
          minWidth={computedWidth}
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
        <span className={breakpointObserverClassName} ref={ref} />
      </ThemeProvider>
    );
  },
);

Sidebar.displayName = 'Sidebar';
