import React, { memo, useMemo, useRef, cloneElement } from 'react';

import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';
import { MotionConfig, useElementScroll, m as motion } from 'framer-motion';

import { useDimensions } from '../hooks/useDimensions';
import { useInterpolate } from '../hooks/useInterpolate';
import { Box, Divider, VStack } from '../layout';
import { bottom as pinBottom } from '../styles/pin';
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
      <MotionConfig>
        <SidebarLayoutProvider variant={sidebarLayout}>
          <NavigationContent {...props} />
        </SidebarLayoutProvider>
      </MotionConfig>
    );
  }
);

const NavigationContent: React.FC<NavigationProps> = memo(
  ({ sidebar, navbar, displayTitle, tabs, children }) => {
    const setSidebarLayout = useSetSidebarLayout();
    const scrollRef = useRef<HTMLElement>(null);
    const { observe: tabsRef, height: tabsHeight } = useDimensions();
    const { observe: displayTitleRef, height: displayTitleHeight } = useDimensions();
    const { ref: navbarRef, height: navbarHeight } = useDimensions();
    const { scrollY } = useElementScroll(scrollRef);

    const navbarTitlesOpacity = useInterpolate(scrollY, {
      inputRange: [navbarHeight, navbarHeight + tabsHeight + displayTitleHeight],
      outputRange: [0, 1],
    });
    const dividerOpacity = useInterpolate(scrollY, {
      inputRange: [0, navbarHeight + tabsHeight],
      outputRange: [0, 1],
    });

    const showTabsAndTitle = Boolean(tabs && displayTitle);
    const shouldAnimatedHeader = displayTitle || showTabsAndTitle;

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

    const animatedDivider = (
      <motion.div className={pinBottom} style={{ opacity: dividerOpacity }}>
        <Divider />
      </motion.div>
    );
    const navbarClone = cloneElement(navbar, {
      animatedOpacity: shouldAnimatedHeader ? navbarTitlesOpacity : undefined,
    });
    const navBarTabs = tabs && !displayTitle && (
      <Box offsetHorizontal={1} spacingTop={2}>
        {tabs}
      </Box>
    );

    const navbarStaticDivider = useMemo(() => {
      if (!displayTitle) {
        return <Divider pin="bottom" />;
      }
    }, [displayTitle]);

    const navbarAnimatedDivider = !tabs && displayTitle && animatedDivider;

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
              {navbarClone}
              {navBarTabs}
              {navbarStaticDivider ?? navbarAnimatedDivider}
            </VStack>
          </ScaleProvider>
          {displayTitle && (
            <Box
              ref={displayTitleRef}
              as="header"
              background
              spacingHorizontal={appContentSpacing}
              spacingTop={shouldAnimatedHeader ? 0 : appContentSpacing}
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
              {animatedDivider}
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
