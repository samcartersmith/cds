import React, { memo, useRef } from 'react';

import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { useDimensions } from '../hooks/useDimensions';
import { Box, Divider, VStack } from '../layout';
import { SidebarLayout, defaultLayout } from './context';
import { NavigationBarProps } from './NavigationBar';
import { NavigationDisplayTitleProps } from './NavigationDisplayTitle';
import { rootStyles, scrollContent } from './navigationStyles';
import { sidebarWidth, appContentSpacing } from './navigationTokens';
import { SidebarProps } from './Sidebar';
import { SidebarLayoutProvider, useSetSidebarLayout } from './SidebarLayoutProvider';
import { TabsProps } from './Tabs';

export type NavigationProps = {
  displayTitle?: React.ReactElement<NavigationDisplayTitleProps> | false | null;
  tabs?: React.ReactElement<TabsProps> | false | null;
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
    const { observe: tabsRef, height: tabsHeight } = useDimensions();
    const { ref: navbarRef, height: navbarHeight } = useDimensions();
    const showTabsAndTitle = Boolean(tabs && displayTitle);

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

    const navBarTabs = tabs && <Box spacingTop={2}>{tabs}</Box>;

    return (
      <div className={rootStyles}>
        <aside ref={sidebarRef}>{sidebar}</aside>
        <section className={scrollContent} ref={scrollRef}>
          {/* Ensure NavigationBar content is not scale aware */}
          <ScaleProvider value={DEFAULT_SCALE}>
            <VStack
              as="nav"
              ref={navbarRef}
              position="sticky"
              top={0}
              zIndex={zIndex.navigation}
              spacing={gutter}
              background
            >
              {React.cloneElement(navbar, { hideTitles: showTabsAndTitle })}
              {/* Tabs - if NavigationDisplayTitle is not present */}
              {!showTabsAndTitle && navBarTabs}
              {/* Divider - if NavigationDisplayTitle + Tabs is not present */}
              {!showTabsAndTitle && <Divider pin="bottom" />}
            </VStack>
          </ScaleProvider>
          {/* NavigationDisplayTitle */}
          {displayTitle && (
            <Box
              as="header"
              background
              spacingHorizontal={appContentSpacing}
              spacingTop={appContentSpacing}
            >
              {displayTitle}
            </Box>
          )}
          {/* Tabs - if NavigationDisplayTitle is present  */}
          {showTabsAndTitle && (
            <VStack
              as="section"
              ref={tabsRef}
              position="sticky"
              top={navbarHeight + tabsHeight / 1.5}
              spacingVertical={2}
              spacingHorizontal={gutter}
              zIndex={zIndex.navigation}
              background
            >
              {tabs}
            </VStack>
          )}
          <VStack
            background
            spacingTop={gutter}
            spacingHorizontal={appContentSpacing}
            minHeight="100vh"
          >
            {children}
          </VStack>
        </section>
      </div>
    );
  }
);

Navigation.displayName = 'Navigation';
NavigationContent.displayName = 'NavigationContent';
