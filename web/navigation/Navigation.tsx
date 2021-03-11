import React, { memo, useRef } from 'react';

import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { useDimensions } from '../hooks/useDimensions';
import { SidebarLayout, defaultLayout } from './context';
import { NavigationBarProps } from './NavigationBar';
import { NavigationDisplayTitleProps } from './NavigationDisplayTitle';
import {
  rootStyles,
  navbarAndTitleSectionStyles,
  navbarStyles,
  displayTitleStyles,
  appContentStyles,
} from './navigationStyles';
import { sidebarWidth } from './navigationTokens';
import { SidebarProps } from './Sidebar';
import { SidebarLayoutProvider, useSetSidebarLayout } from './SidebarLayoutProvider';

export type NavigationProps = {
  displayTitle?: React.ReactElement<NavigationDisplayTitleProps>;
  tabs?: React.ReactElement;
  sidebar?: React.ReactElement<SidebarProps>;
  navbar: React.ReactElement<NavigationBarProps>;
  sidebarLayout?: SidebarLayout;
};

export const Navigation: React.FC<NavigationProps> = memo(
  ({ sidebarLayout = defaultLayout, ...props }) => {
    return (
      <SidebarLayoutProvider variant={sidebarLayout}>
        <NavigationContent {...props} />
      </SidebarLayoutProvider>
    );
  }
);

const NavigationContent: React.FC<NavigationProps> = memo(
  ({ sidebar, navbar, displayTitle, tabs, children }) => {
    const setSidebarLayout = useSetSidebarLayout();
    const scrollRef = useRef<HTMLElement>(null);
    const { observe: headerRef, height: headerHeight } = useDimensions();

    const { ref: sidebarRef } = useDimensions({
      breakpoints: { mobile: 0, desktop: sidebarWidth.expanded },
      // Will only update the state on breakpoint changed, default is false
      updateOnBreakpointChange: true,
      onResize: ({ currentBreakpoint }) => {
        // Triggered when breakpoint is changed
        switch (currentBreakpoint) {
          case 'desktop':
            setSidebarLayout('expanded');
            break;
          case 'mobile':
            setSidebarLayout('condensed');
            break;
        }
      },
    });

    return (
      <div className={rootStyles}>
        <aside ref={sidebarRef}>{sidebar}</aside>
        <section className={navbarAndTitleSectionStyles} ref={scrollRef}>
          <nav className={navbarStyles}>
            {scrollRef.current && React.cloneElement(navbar, { headerHeight, scrollRef })}
          </nav>
          {displayTitle && (
            <header className={displayTitleStyles} ref={headerRef}>
              {React.cloneElement(displayTitle, { spacingBottom: tabs ? 0 : gutter })}
            </header>
          )}
          <main className={appContentStyles}>{children}</main>
        </section>
      </div>
    );
  }
);

Navigation.displayName = 'Navigation';
NavigationContent.displayName = 'NavigationContent';
