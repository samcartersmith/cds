import React, { cloneElement, memo, useMemo, useRef, useState } from 'react';
import { m as motion, MotionConfig, useElementScroll } from 'framer-motion';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { useDimensions } from '../../hooks/useDimensions';
import { useInterpolate } from '../../hooks/useInterpolate';
import { Box, Divider, VStack } from '../../layout';
import { bottom as pinBottom } from '../../styles/pin';
import { cx } from '../../utils/linaria';

import { defaultLayout, NavigationProvider, SidebarLayout, useNavigation } from './context';
import { MobileMenu } from './MobileMenu';
import { NavigationBarProps } from './NavigationBar';
import { NavigationDisplayTitleProps } from './NavigationDisplayTitle';
import { gridForSidebar, rootStyles, scrollContent } from './navigationStyles';
import { appContentSpacing, sidebarWidth } from './navigationTokens';
import { SidebarProps } from './Sidebar';
import { TabsProps } from './Tabs';

export type NavigationProps = {
  displayTitle?: React.ReactElement<NavigationDisplayTitleProps> | false | null;
  tabs?: React.ReactElement<TabsProps> | false | null;
  sidebar?: React.ReactElement<SidebarProps>;
  navbar: React.ReactElement<NavigationBarProps>;
  sidebarLayout?: SidebarLayout;
};

const NavigationContent: React.FC<NavigationProps> = memo(
  ({ sidebar, navbar, displayTitle, tabs, children }) => {
    const { isMobileMenuVisible, toggleMobileMenuHidden, setSidebarLayout } = useNavigation();
    const [showDisplayTitle, setShowDisplayTitle] = useState(!!displayTitle);

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
    const shouldAnimatedHeader = displayTitle ?? showTabsAndTitle;

    const { ref: sidebarRef } = useDimensions({
      breakpoints: { mobile: 0, desktop: sidebarWidth.expanded },
      // Will only update the state on breakpoint changed, default is false
      updateOnBreakpointChange: true,
      onResize: ({ currentBreakpoint }) => {
        // Triggered when breakpoint is changed
        switch (currentBreakpoint) {
          case 'tablet':
            setSidebarLayout('condensed');
            toggleMobileMenuHidden();
            setShowDisplayTitle(true);
            break;
          case 'mobile':
            setSidebarLayout('hidden');
            // Hide Big displayTitle in mobile
            setShowDisplayTitle(false);
            break;
          case 'desktop':
          default:
            setSidebarLayout('expanded');
            toggleMobileMenuHidden();
            setShowDisplayTitle(true);
            break;
        }
      },
    });

    const animatedDivider = (
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
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
      return undefined;
    }, [displayTitle]);

    const navbarAnimatedDivider = !tabs && displayTitle && animatedDivider;

    return (
      // Remove grid if there is no sidebar to prevent an awkward blank column
      <div className={cx(rootStyles, !!sidebar && gridForSidebar)}>
        {/* Hide the sidebar if there is none */}
        {sidebar && <aside ref={sidebarRef}>{sidebar}</aside>}
        <section className={cx(scrollContent)} ref={scrollRef}>
          {/* Ensure NavigationBar content is not scale aware */}
          <ScaleProvider value={DEFAULT_SCALE}>
            <VStack
              as="nav"
              ref={navbarRef}
              position="sticky"
              top={0}
              left={0}
              right={0}
              zIndex={zIndex.navigation}
              spacing={gutter}
              background
            >
              {navbarClone}
              {navBarTabs}
              {navbarStaticDivider ?? navbarAnimatedDivider}
            </VStack>
          </ScaleProvider>
          {displayTitle && showDisplayTitle && (
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
            spacingHorizontal={isMobileMenuVisible ? 0 : appContentSpacing}
            alignItems="center"
            minHeight="100vh"
          >
            {isMobileMenuVisible ? (
              <MobileMenu sidebar={sidebar?.props.children} navbar={navbar} />
            ) : (
              children
            )}
          </VStack>
        </section>
      </div>
    );
  },
);

export const Navigation: React.FC<NavigationProps> = memo(
  ({ sidebarLayout = defaultLayout, ...props }) => {
    return (
      <MotionConfig>
        <NavigationProvider variant={sidebarLayout}>
          <NavigationContent {...props} />
        </NavigationProvider>
      </MotionConfig>
    );
  },
);

Navigation.displayName = 'Navigation';
NavigationContent.displayName = 'NavigationContent';
